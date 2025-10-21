import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { privateAxios } from '@/api/axios';
import { IMediaData } from '@/components/Auth/_types';
import { useSnackStore } from '@/components/UI/CustomSnackBar/store';

export interface ITourist {
  id: number;
  name: string | null;
  email: string | null;
  email_verified_at: string;
  phone: string | null;
  avatar: IMediaData | null;
}

export interface AuthState {
  // State
  user: ITourist | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // UI State
  authPopupOpen: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  removeToken: () => void;
  removeUser: () => void;

  // UI Actions
  openAuthPopup: () => void;
  closeAuthPopup: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      authPopupOpen: false,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await privateAxios.post('/auth/login', {
            email,
            password,
          });

          const { token, user } = response.data;

          // Устанавливаем токен в cookies
          document.cookie = `auth-token=${token}; path=/; max-age=86400; samesite=lax`;

          // Сохраняем токен в store (persist middleware сохранит его автоматически)
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          let errorMessage = 'Login failed';

          if (axios.isAxiosError(error) && error.response?.data?.message) {
            errorMessage = error.response.data.message;
          }

          set({
            isLoading: false,
            error: errorMessage,
            user: null,
            token: null,
            isAuthenticated: false,
          });

          throw error;
        }
      },

      register: async (name: string, email: string, password: string, confirmPassword: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await privateAxios.post('/auth/register', {
            name,
            email,
            password,
            password_confirmation: confirmPassword,
          });

          const { message, user, token } = response.data;

          // Устанавливаем токен в cookies
          document.cookie = `auth-token=${token}; path=/; max-age=86400; samesite=lax`;

          // Показываем сообщение об успехе через CustomSnackBar
          useSnackStore.getState().setMessage(message, 'success');

          // Сохраняем токен в store (persist middleware сохранит его автоматически)
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          let errorMessage = 'Registration failed';

          if (axios.isAxiosError(error) && error.response?.data?.message) {
            errorMessage = error.response.data.message;
          }

          set({
            isLoading: false,
            error: errorMessage,
            user: null,
            token: null,
            isAuthenticated: false,
          });

          throw error;
        }
      },

      logout: () => {
        // Удаляем токен из cookies
        document.cookie = 'auth-token=; path=/; max-age=0; samesite=lax';

        // Очищаем состояние аутентификации
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      checkAuth: async () => {
        // Проверяем токен в store
        const { token } = get();

        if (!token) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          return;
        }

        set({ isLoading: true });

        try {
          // Проверяем токен на сервере - получаем данные пользователя
          const response = await privateAxios.get('/api/v1/auth/me');

          const user = response.data;

          // Обновляем данные пользователя (могли измениться)
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          // Если токен недействителен, очищаем состояние
          console.warn('Token validation failed:', error);
          get().logout();
          set({ isLoading: false });
        }
      },

      clearError: () => set({ error: null }),

      setLoading: (isLoading: boolean) => set({ isLoading }),

      removeToken: () => set({ token: null }),
      removeUser: () => set({ user: null }),

      // UI Actions
      openAuthPopup: () => set({ authPopupOpen: true }),
      closeAuthPopup: () => set({ authPopupOpen: false }),
    }),
    {
      name: 'auth-storage', // ключ для localStorage
      partialize: (state) => ({
        // Сохраняем только эти поля
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
