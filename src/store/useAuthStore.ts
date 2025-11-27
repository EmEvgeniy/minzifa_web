import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ITourist } from '@/types';
import { AUTH_COOKIE_NAME } from '@/constants';

export interface AuthState {
  // State
  user: ITourist | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authPopup: boolean;

  // Actions
  setUser: (user: ITourist | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setAuthPopup: (authPopup: boolean) => void;
  login: (user: ITourist) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      authPopup: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setAuthPopup: (authPopup) => set({ authPopup }),
      login: (user: ITourist) => {
        set({
          user,
          isAuthenticated: true,
          authPopup: false,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          authPopup: false,
        });
        localStorage.removeItem('auth-storage');
        document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0`;
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
