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
  chats: PaginatedData<IChat>;
  currentChatMessages: PaginatedData<IMessage>;

  // WebSocket
  centrifuge: Centrifuge | null;
  subscription: Subscription | null;

  // Actions
  setSelectedChat: (chat: IChat | null) => void;
  setMessageInput: (message: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setChats: (chats: PaginatedData<IChat>) => void;
  setCurrentChatMessages: (messages: PaginatedData<IMessage>) => void;
  addMessage: (message: IMessage) => void;
  setCentrifuge: (centrifuge: Centrifuge | null) => void;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useChatsStore = create<ChatsStoreData>((set) => ({
  // Initial State
  selectedChat: null,
  messageInput: '',
  isLoading: false,
  error: null,
  chats: { data: [] },
  currentChatMessages: { data: [] },
  centrifuge: null,
  subscription: null,

  // Actions
  setSelectedChat: (chat) => set({ selectedChat: chat }),
  setMessageInput: (message) => set({ messageInput: message }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setChats: (chats) => set({ chats }),
  setCurrentChatMessages: (messages) => set({ currentChatMessages: messages }),
  addMessage: (message) =>
    set((state) => ({
      currentChatMessages: {
        ...state.currentChatMessages,
        data: [...state.currentChatMessages.data, message],
      },
    })),
  setCentrifuge: (centrifuge) => set({ centrifuge }),
  setSubscription: (subscription) => set({ subscription }),
}));
