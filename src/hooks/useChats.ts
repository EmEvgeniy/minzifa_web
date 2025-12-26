import { useCallback, useRef } from 'react';
import { useChatsStore } from '@/store/chatsStore';
import { IChat } from '@/types';
import { initCentrifugo } from '@/app/CentrifugeClient';
import { useChatApi } from './chat/useChatApi';
import { useChatSubscription } from './chat/useChatSubscription';
import { usePersonalSubscription } from './chat/usePersonalSubscription';

export const useChats = () => {
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
    setError,
    setCentrifuge,
    setSocketId,
  } = useChatsStore();

  const { fetchChat, sendMessage } = useChatApi();

  // Initialize subscriptions
  useChatSubscription();
  usePersonalSubscription();

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
