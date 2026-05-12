import { create } from 'zustand';
import type { ITourist } from '@/types';
import { authApi } from '@/utils/http';

export interface AuthState {
  email: string;
  user: ITourist | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authPopup: boolean;

  setEmail: (email: string) => void;
  setUser: (user: ITourist | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setAuthPopup: (authPopup: boolean) => void;
  login: (user: ITourist) => void;
  logout: (onSuccess?: () => void) => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  email: '',
  user: null,
  isAuthenticated: false,
  isLoading: false,
  authPopup: false,

  setEmail: (email) => set({ email }),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setAuthPopup: (authPopup) => set({ authPopup }),
  login: (user: ITourist) => {
    set({ user, isAuthenticated: true, authPopup: false });
  },
  logout: async (onSuccess) => {
    try {
      await authApi('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ user: null, isAuthenticated: false, authPopup: false });
      onSuccess?.();
    }
  },
}));
