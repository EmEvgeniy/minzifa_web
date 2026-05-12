import { ofetch } from 'ofetch';
import { getApiUrl } from './config';
import { useAuthStore } from '@/store/useAuthStore';
import { PROTECTED_ROUTES } from '@/constants';

const apiUrl = getApiUrl();
const rootUrl = apiUrl.replace(/\/api\/v1$/, '');

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const baseHeaders: Record<string, string> = {
  Accept: 'application/json',
  ...(apiKey && { 'X-API-Key': apiKey }),
};

export const api = ofetch.create({
  baseURL: apiUrl,
  credentials: 'include',
  headers: baseHeaders,
  onResponseError: async ({ response }) => {
    const status = response?.status;
    if (status === 401 || status === 419) {
      const store = useAuthStore.getState();
      store.setUser(null);
      store.setAuthPopup(false);

      const pathname = window.location.pathname;
      const isProtected = PROTECTED_ROUTES.some((route) => route.test(pathname));
      if (isProtected) {
        window.location.href = '/?require-auth=1';
      }
    }
  },
});

export const authApi = ofetch.create({
  baseURL: rootUrl,
  credentials: 'include',
  headers: baseHeaders,
  onResponseError: async ({ response, request }) => {
    const status = response?.status;
    const url = (request as Request)?.url || '';
    const isLogoutRequest = url.includes('/auth/logout') || url.includes('/logout');

    if ((status === 401 || status === 419) && !isLogoutRequest) {
      const store = useAuthStore.getState();

      if (store.isAuthenticated) {
        store.logout();
      }

      const pathname = window.location.pathname;
      const isProtected = PROTECTED_ROUTES.some((route) => route.test(pathname));
      if (isProtected) {
        window.location.href = '/?require-auth=1';
      }
    }
  },
});

export const getCsrfCookie = async () => {
  return ofetch(`${rootUrl}/sanctum/csrf-cookie`, { credentials: 'include', headers: baseHeaders });
};
