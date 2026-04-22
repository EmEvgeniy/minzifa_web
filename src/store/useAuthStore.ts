import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ITourist } from '@/types';
import { AUTH_COOKIE_NAME, AUTH_TOKEN_NAME } from '@/constants';
import { authAxiosInstance } from '@/utils/axios';

export interface AuthState {
  // State
  email: string;
  user: ITourist | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authPopup: boolean;

  // Actions
  setEmail: (email: string) => void;
  setUser: (user: ITourist | null) => void;
  setToken: (token: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setAuthPopup: (authPopup: boolean) => void;
  login: (user: ITourist, token: string) => void;
  logout: (onSuccess?: () => void) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: '',
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      authPopup: false,

      setEmail: (email) => set({ email }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setAuthPopup: (authPopup) => set({ authPopup }),
      login: (user: ITourist, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
          authPopup: false,
        });
        const expires = new Date(Date.now() + 86400 * 1000).toUTCString();
        document.cookie = `auth-token=${encodeURIComponent(
          token,
        )}; path=/; expires=${expires}; SameSite=Lax; Secure`;
      },

      logout: async (onSuccess) => {
        try {
          // Вызываем API для отзыва токена
          await authAxiosInstance.post('auth/logout');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          // В любом случае очищаем состояние на клиенте
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            authPopup: false,
          });
          localStorage.removeItem('auth-storage');
          document.cookie = `${AUTH_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
          document.cookie = `${AUTH_TOKEN_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
          onSuccess?.();
        }
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
