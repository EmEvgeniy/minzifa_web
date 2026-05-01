import axios, { AxiosInstance, AxiosError } from 'axios';
import { getApiUrl } from './config';
import { useAuthStore } from '@/store/useAuthStore';
import { PROTECTED_ROUTES } from '@/constants';

const createAxios = (url?: string | null): AxiosInstance => {
  return axios.create({
    baseURL: url ?? getApiUrl(),
    withCredentials: false,
    withXSRFToken: false, // Отключаем так как используем Bearer токены
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
  });
};

const axiosInstance = createAxios();
const authAxiosInstance = createAxios(process.env.NEXT_PUBLIC_API_URL);

// Add API key to all requests
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
if (apiKey) {
  axiosInstance.defaults.headers.common['X-API-Key'] = apiKey;
  authAxiosInstance.defaults.headers.common['X-API-Key'] = apiKey;
} else {
  console.warn('API Key NOT FOUND in environment!');
}

// Перехватчик запросов для добавления токена
authAxiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Перехватчик ответов для обработки 401
let isLoggingOut = false;

const handleAuthError = (error: AxiosError) => {
  const status = error?.response?.status;
  const requestUrl = error?.config?.url || '';
  const method = error?.config?.method || '';

  console.log(`[API Error] ${status} ${method.toUpperCase()} ${requestUrl}`);

  if (status === 401 || status === 419) {
    // Prevent recursive logout calls
    const isLogoutRequest = requestUrl.includes('/auth/logout') || requestUrl.includes('/logout');

    if (isLoggingOut) {
      console.log('[Auth] Already logging out, preventing recursive call');
      return Promise.reject(error);
    }

    if (!isLogoutRequest) {
      console.log('[Auth] 401 on non-logout request, initiating logout');
      isLoggingOut = true;
      const { logout } = useAuthStore.getState();
      logout().finally(() => {
        isLoggingOut = false;
      });
    } else {
      console.log('[Auth] 401 on logout request, clearing state directly');
      const { setUser, setToken, setIsAuthenticated, setAuthPopup } = useAuthStore.getState();
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      setAuthPopup(false);
      localStorage.removeItem('auth-storage');
      document.cookie = `auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
    }

    // Проверяем, находимся ли мы на защищенном роуте
    const pathname = window.location.pathname;
    const isProtected = PROTECTED_ROUTES.some((route) => route.test(pathname));

    if (isProtected) {
      console.log('[Auth] On protected route, redirecting to login');
      window.location.href = '/?require-auth=1';
    }
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.response.use((response) => response, handleAuthError);
authAxiosInstance.interceptors.response.use((response) => response, handleAuthError);

export { axiosInstance, authAxiosInstance };
