import { useCallback } from 'react';
import { useChatsStore } from '@/store/chatsStore';
import { authAxiosInstance } from '@/utils/axios';
import { AUTH_COOKIE_NAME } from '@/constants';
import { getCookie } from 'cookies-next';

export const useChatApi = () => {
  const {
    setSelectedChat,
    setCurrentChatMessages,
    setIsLoading,
    setError,
    addMessage,
    setMessageInput,
    socketId,
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
    [addMessage, setMessageInput, socketId, setError],
  );

  return {
    fetchChat,
    sendMessage,
  };
};
