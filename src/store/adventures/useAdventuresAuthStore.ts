import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AdventureUser } from '@/types/adventures';
import { ADV_AUTH_TOKEN_NAME } from '@/constants';
import { adventuresAxiosInstance } from '@/utils/adventures/axios';

export interface AdventuresAuthState {
  // State
  user: AdventureUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: AdventureUser | null) => void;
  setToken: (token: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  login: (user: AdventureUser, token: string) => void;
  logout: (onSuccess?: () => void) => Promise<void>;
}

export const useAdventuresAuthStore = create<AdventuresAuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

      login: (user: AdventureUser, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });

        // Set cookie for middleware/server-side checks
        const expires = new Date(Date.now() + 86400 * 7 * 1000).toUTCString(); // 7 days
        if (typeof document !== 'undefined') {
          document.cookie = `${ADV_AUTH_TOKEN_NAME}=${encodeURIComponent(
            token,
          )}; path=/; expires=${expires}; SameSite=Lax`;
        }
      },

      logout: async (onSuccess) => {
        // Clear state
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });

        // Clear cookie
        if (typeof document !== 'undefined') {
          document.cookie = `${ADV_AUTH_TOKEN_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
        }

        onSuccess?.();
      },
    }),
    {
      name: 'adventures-auth-storage',
    },
  ),
);
