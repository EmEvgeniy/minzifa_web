import { useEffect, useCallback, useRef } from 'react';
import { useChatsStore } from '@/store/chatsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { IChat } from '@/types';
import { initCentrifugo } from '@/app/CentrifugeClient';
import { authAxiosInstance, axiosInstance } from '@/utils/axios';
import { AUTH_COOKIE_NAME, BASE_API_PATH } from '@/constants';
import { getCookie } from 'cookies-next';
import { useQueryClient } from '@tanstack/react-query';

export const useChats = () => {
  const queryClient = useQueryClient();
  const isInitializingRef = useRef(false);
  const isInitializedRef = useRef(false);

  const {
    selectedChat,
    messageInput,
    currentChatMessages,
    isLoading,
    error,
    centrifuge,
    setSelectedChat,
    setMessageInput,
    setIsLoading,
    setError,
    setCurrentChatMessages,
    addMessage,
    setCentrifuge,
    setSubscription,
    socketId,
    setSocketId,
    replaceMessage,
  } = useChatsStore();

  const fetchChat = useCallback(
    async (chatId: number) => {
      try {
        setIsLoading(true);
        setError(null);

        const token = getCookie(AUTH_COOKIE_NAME);

        if (!token) {
          throw new Error('No auth token found');
        }

        const response = await authAxiosInstance.get(`/auth/chats/${chatId}`);

        const chat = response.data;

        setSelectedChat(chat);
        setCurrentChatMessages({ data: chat.messages });
      } catch (error) {
        console.error('Failed to fetch chat:', error);
        setError('Failed to load chat');
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError, setSelectedChat, setCurrentChatMessages],
  );

  const sendMessage = useCallback(
    async (chatId: number, message: string) => {
      try {
        const token = getCookie(AUTH_COOKIE_NAME);

        if (!token) {
          throw new Error('No auth token found');
        }

        setMessageInput('');

        const response = await authAxiosInstance.post(
          `/auth/chats/${chatId}/messages`,
          {
            message,
            message_type: 'text',
          },
          {
            headers: {
              'X-Socket-Id': socketId,
            },
          },
        );

        addMessage(response.data);
      } catch (error) {
        console.error('Failed to send message:', error);
        setError('Failed to send message');
      }
    },
    [addMessage, setMessageInput, socketId, replaceMessage],
  );

  const initializeWebSocket = useCallback(async () => {
    if (isInitializingRef.current || isInitializedRef.current) {
      return;
    }

    const currentCentrifuge = useChatsStore.getState().centrifuge;
    if (currentCentrifuge) {
      isInitializedRef.current = true;
      return;
    }

    try {
      isInitializingRef.current = true;

      const centrifugeInstance = await initCentrifugo();
      setCentrifuge(centrifugeInstance);

      centrifugeInstance.on('connected', (ctx) => {
        setSocketId(ctx.client);
      });

      centrifugeInstance.connect();
      isInitializedRef.current = true;
    } catch (error) {
      console.error('Failed to initialize WebSocket:', error);
      setError('Failed to initialize WebSocket');
      isInitializingRef.current = false;
    }
  }, [setCentrifuge, setError, setSocketId]);

  useEffect(() => {
    if (!selectedChat || !centrifuge) return;

    let isCancelled = false;
    let sub: any = null;

    const setupSubscription = async () => {
      try {
        const channel = `chat#${selectedChat.id}`;

        // 1. Cleanup existing subscription if any
        const existingSub = centrifuge.getSubscription(channel);
        if (existingSub) {
          await existingSub.unsubscribe();
          centrifuge.removeSubscription(existingSub);
        }

        if (isCancelled) return;

        // 2. Get token
        const { data } = await authAxiosInstance.post(`/auth/centrifugo/subscribe`, {
          channel,
        });

        if (isCancelled) return;

        if (!data.token) {
          throw new Error('Не удалось получить токен подписки для канала');
        }

        // 3. Double check existing subscription before creating new one
        // (in case another effect created one while we were fetching token)
        const currentSub = centrifuge.getSubscription(channel);
        if (currentSub) {
          await currentSub.unsubscribe();
          centrifuge.removeSubscription(currentSub);
        }

        // 4. Create subscription
        sub = centrifuge.newSubscription(channel, {
          token: data.token,
        });

        // 5. Setup listeners
        sub.on('publication', (ctx: any) => {
          const message = ctx.data || ctx;
          addMessage(message);
        });

        sub.on('error', (ctx: any) => {
          console.error(`Subscription error for channel ${channel}:`, ctx);
        });

        // 6. Subscribe
        if (!isCancelled) {
          await sub.subscribe();
          setSubscription(sub);
        } else {
          // If cancelled during setup, ensure we clean up
          centrifuge.removeSubscription(sub);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('Failed to subscribe to chat:', error);
          setError('Failed to subscribe to chat');
        }
      }
    };

    setupSubscription();

    return () => {
      isCancelled = true;
      if (sub) {
        sub.unsubscribe();
        if (centrifuge) {
          centrifuge.removeSubscription(sub);
        }
      } else {
        // If sub is not yet assigned (still setting up), we try to find it by channel and remove
        // This covers the case where we created it but haven't assigned to 'sub' var yet
        // although our isCancelled checks should prevent this, it's a safety net
        if (selectedChat && centrifuge) {
          const channel = `chat#${selectedChat.id}`;
          const existing = centrifuge.getSubscription(channel);
          if (existing) {
            existing.unsubscribe();
            centrifuge.removeSubscription(existing);
          }
        }
      }
      setSubscription(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat?.id, centrifuge, setSubscription, setError, addMessage]);

  // Personal channel subscription for global updates
  useEffect(() => {
    const user = useAuthStore.getState().user;
    if (!user || !centrifuge) return;

    let isCancelled = false;
    let sub: any = null;

    const setupPersonalSubscription = async () => {
      try {
        const channel = `personal#${user.id}`;

        // 1. Cleanup existing subscription if any
        const existingSub = centrifuge.getSubscription(channel);
        if (existingSub) {
          await existingSub.unsubscribe();
          centrifuge.removeSubscription(existingSub);
        }

        if (isCancelled) return;

        // 2. Get token
        const { data } = await authAxiosInstance.post(`/auth/centrifugo/subscribe`, {
          channel,
        });

        if (isCancelled) return;

        if (!data.token) {
          throw new Error('Не удалось получить токен подписки для личного канала');
        }

        // 3. Double check existing subscription
        const currentSub = centrifuge.getSubscription(channel);
        if (currentSub) {
          await currentSub.unsubscribe();
          centrifuge.removeSubscription(currentSub);
        }

        // 4. Create subscription
        sub = centrifuge.newSubscription(channel, {
          token: data.token,
        });

        // 5. Setup listeners
        sub.on('publication', (ctx: any) => {
          const message = ctx.data || ctx;

          // Update React Query cache to move chat to top and update last message
          queryClient.setQueryData(['chats'], (oldData: any) => {
            if (!oldData?.pages) return oldData;

            const newPages = oldData.pages.map((page: any) => ({
              ...page,
              data: page.data.map((chat: IChat) => {
                if (chat.id === message.chat_id) {
                  return {
                    ...chat,
                    last_message: message,
                    updated_at: message.created_at, // Update timestamp to sort by it
                  };
                }
                return chat;
              }),
            }));

            // Sort chats: the one with new message goes first
            // Note: This is a simplified sort, ideally we should re-sort the whole list
            // But since we have pagination, we might just want to update the specific chat
            // For now, let's just update the content. Re-sorting might be complex with infinite scroll.

            return { ...oldData, pages: newPages };
          });

          // If this message is for the currently selected chat, we don't need to do anything
          // because the chat subscription handles it.
          // But if we wanted to be safe, we could deduplicate in addMessage.
        });

        sub.on('error', (ctx: any) => {
          console.error(`Subscription error for channel ${channel}:`, ctx);
        });

        // 6. Subscribe
        if (!isCancelled) {
          await sub.subscribe();
        } else {
          centrifuge.removeSubscription(sub);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('Failed to subscribe to personal channel:', error);
        }
      }
    };

    setupPersonalSubscription();

    return () => {
      isCancelled = true;
      if (sub) {
        sub.unsubscribe();
        if (centrifuge) {
          centrifuge.removeSubscription(sub);
        }
      }
    };
  }, [centrifuge]);

  const handleChatSelect = (chat: IChat | null) => {
    if (selectedChat?.id === chat?.id) return;
    setSelectedChat(chat);
    if (chat) fetchChat(chat.id);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;
    sendMessage(selectedChat.id, messageInput);
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  return {
    // Data
    selectedChat,
    messageInput,
    currentChatMessages,
    isLoading,
    error,

    // Actions
    fetchChat,
    initializeWebSocket,
    handleChatSelect,
    setMessageInput,
    handleSendMessage,
    handleBack,
  };
};
