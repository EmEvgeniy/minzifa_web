import { useEffect, useCallback } from 'react';
import { privateAxios } from '@/api/axios';
import { useChatsStore } from '@/store/chatsStore';
import { IChat, IMessage } from '@/types';
import { initCentrifugo, subscribeToChat } from '@/app/CentrifugeClient';

export const useChats = () => {
  const {
    chats,
    selectedChat,
    messageInput,
    currentChatMessages,
    isLoading,
    error,
    centrifuge,
    subscription,
    setSelectedChat,
    setMessageInput,
    setIsLoading,
    setError,
    setChats,
    setCurrentChatMessages,
    addMessage,
    setCentrifuge,
    setSubscription,
  } = useChatsStore();

  // API Actions
  const fetchChats = async () => {
    // Проверяем, что запрос уже не выполняется
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('auth-token='))
        ?.split('=')[1];

      console.log('Auth token found:', !!token);
      console.log('All cookies:', document.cookie);

      if (!token) {
        console.error('No auth token found in cookies');
        throw new Error('No auth token found');
      }

      const response = await privateAxios.get('/api/v1/chats');

      if (response.data && response.data.data) {
        // API возвращает данные в формате { data: [...] }
        setChats(response.data);
      } else if (Array.isArray(response.data)) {
        // API возвращает массив напрямую, оборачиваем в нужный формат
        setChats({ data: response.data });
      } else {
        setChats({ data: [] });
      }
    } catch (error) {
      console.error('Failed to fetch chats:', error);
      setError('Failed to load chats');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChat = async (chatId: number) => {
    try {
      setIsLoading(true);
      setError(null);

      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('auth-token='))
        ?.split('=')[1];

      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await privateAxios.get(`/api/v1/chats/${chatId}`);

      const chat = response.data;
      setSelectedChat(chat);

      // Fetch messages separately
      await fetchChatMessages(chatId);
    } catch (error) {
      console.error('Failed to fetch chat:', error);
      setError('Failed to load chat');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChatMessages = async (chatId: number) => {
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('auth-token='))
        ?.split('=')[1];

      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await privateAxios.get(`/api/v1/chats/${chatId}/messages`);

      let messages = response.data;

      // Handle different response formats
      if (messages.data && Array.isArray(messages.data)) {
        messages = messages.data;
      } else if (!Array.isArray(messages)) {
        messages = [];
      }

      // Ensure messages have proper format
      const processedMessages = messages.map((msg: IMessage) => ({
        ...msg,
        created_at: msg.created_at ? new Date(msg.created_at) : new Date(),
        updated_at: msg.updated_at ? new Date(msg.updated_at) : new Date(),
      }));

      setCurrentChatMessages({ data: processedMessages });
    } catch (error) {
      console.error('Failed to fetch chat messages:', error);
      setError('Failed to load messages');
    }
  };

  const sendMessage = async (chatId: number, message: string) => {
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('auth-token='))
        ?.split('=')[1];

      if (!token) {
        throw new Error('No auth token found');
      }

      // Create temporary message for immediate UI update
      const tempMessage: IMessage = {
        id: Date.now(), // Temporary ID
        chat_id: chatId,
        sender_type: 'App\\Models\\Tourist', // Assuming current user is tourist
        sender_id: 0, // Will be set by server
        message_type: 'text',
        message: message,
        file_path: '',
        is_read: false,
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Add message to UI immediately
      addMessage(tempMessage);

      await privateAxios.post(`/api/v1/chats/${chatId}/messages`, {
        message,
        message_type: 'text',
      });

      // Clear message input after successful send
      setMessageInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Failed to send message');
    }
  };

  // WebSocket Actions
  const initializeWebSocket = useCallback(async () => {
    try {
      // Проверяем, что centrifuge еще не инициализирован
      if (centrifuge) {
        return;
      }

      const centrifugeInstance = await initCentrifugo();
      setCentrifuge(centrifugeInstance);

      // Connect to centrifuge
      centrifugeInstance.connect();
    } catch (error) {
      console.error('Failed to initialize WebSocket:', error);
      setError('Failed to initialize WebSocket');
    }
  }, [centrifuge, setCentrifuge, setError]);

  const unsubscribeFromChat = useCallback(() => {
    if (subscription) {
      subscription.unsubscribe();
      setSubscription(null);
    }
  }, [subscription, setSubscription]);

  const subscribeToChatChannel = useCallback(
    async (chatId: number) => {
      try {
        if (!centrifuge) {
          throw new Error('Centrifuge not initialized');
        }

        // Проверяем, что уже не подписаны на этот чат
        if (subscription && selectedChat?.id === chatId) {
          return;
        }

        // Unsubscribe from previous subscription if exists
        unsubscribeFromChat();

        const subscriptionInstance = await subscribeToChat(
          centrifuge,
          chatId.toString(),
          (message: IMessage) => {
            // Add incoming message to the list
            addMessage(message);
          },
        );

        setSubscription(subscriptionInstance);
      } catch (error) {
        console.error('Failed to subscribe to chat:', error);
        setError('Failed to subscribe to chat');
      }
    },
    [
      centrifuge,
      subscription,
      selectedChat?.id,
      setSubscription,
      setError,
      addMessage,
      unsubscribeFromChat,
    ],
  );

  // Initialize WebSocket on mount if authenticated
  useEffect(() => {
    const initWebSocket = async () => {
      if (!centrifuge) {
        await initializeWebSocket();
      }
    };

    initWebSocket();
  }, [centrifuge, initializeWebSocket]);

  // Subscribe to chat when selectedChat changes
  useEffect(() => {
    if (selectedChat && centrifuge) {
      subscribeToChatChannel(selectedChat.id);
    }

    return () => {
      unsubscribeFromChat();
    };
  }, [selectedChat, centrifuge, subscribeToChatChannel, unsubscribeFromChat]);

  const handleChatSelect = (chat: IChat) => {
    setSelectedChat(chat);
    fetchChat(chat.id);
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
    chats,
    selectedChat,
    messageInput,
    currentChatMessages,
    isLoading,
    error,

    // Actions
    fetchChats,
    fetchChat,
    handleChatSelect,
    setMessageInput,
    handleSendMessage,
    handleBack,
  };
};
