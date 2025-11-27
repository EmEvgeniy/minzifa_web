import { create } from 'zustand';
import { PaginatedData, IMessage, IChat } from '@/types';
import { Centrifuge, Subscription } from 'centrifuge';

// Re-export for convenience
export type { PaginatedData };

export interface ChatsStoreData {
  // UI State
  selectedChat: IChat | null;
  messageInput: string;
  isLoading: boolean;
  error: string | null;

  // Data
  currentChatMessages: PaginatedData<IMessage>;

  // WebSocket
  centrifuge: Centrifuge | null;
  subscription: Subscription | null;
  socketId: string | null;

  // Actions
  setSelectedChat: (chat: IChat | null) => void;
  setMessageInput: (message: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentChatMessages: (messages: PaginatedData<IMessage>) => void;
  addMessage: (message: IMessage) => void;
  replaceMessage: (tempId: number, newMessage: IMessage) => void;
  setCentrifuge: (centrifuge: Centrifuge | null) => void;
  setSubscription: (subscription: Subscription | null) => void;
  setSocketId: (socketId: string | null) => void;
}

export const useChatsStore = create<ChatsStoreData>((set) => ({
  // Initial State
  selectedChat: null,
  messageInput: '',
  isLoading: false,
  error: null,
  currentChatMessages: { data: [] },
  centrifuge: null,
  subscription: null,

  socketId: null,

  // Actions
  setSelectedChat: (chat) => {
    set({ selectedChat: chat });
  },
  setMessageInput: (message) => {
    set({ messageInput: message });
  },
  setIsLoading: (loading) => {
    set({ isLoading: loading });
  },
  setError: (error) => {
    set({ error });
  },
  setCurrentChatMessages: (messages) => {
    set({ currentChatMessages: messages });
  },
  addMessage: (message) => {
    set((state) => ({
      currentChatMessages: {
        ...state.currentChatMessages,
        data: state.currentChatMessages.data.find((m) => m.id === message.id)
          ? state.currentChatMessages.data
          : state.currentChatMessages.data.concat(message),
      },
    }));
  },
  replaceMessage: (tempId: number, newMessage: IMessage) => {
    set((state) => ({
      currentChatMessages: {
        ...state.currentChatMessages,
        data: state.currentChatMessages.data.map((m) => (m.id === tempId ? newMessage : m)),
      },
    }));
  },
  setCentrifuge: (centrifuge) => {
    set({ centrifuge });
  },
  setSubscription: (subscription) => {
    set({ subscription });
  },
  setSocketId: (socketId: string | null) => {
    set({ socketId });
  },
}));
