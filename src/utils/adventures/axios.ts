import axios, { AxiosInstance } from 'axios';
import { appConfig } from '../config';
import { useAdventuresAuthStore } from '@/store/adventures/useAdventuresAuthStore';
import { PROTECTED_ROUTES } from '@/constants';

const createAxios = (baseURL: string): AxiosInstance => {
  return axios.create({
    baseURL,
    withCredentials: false,
    withXSRFToken: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
  });
};

const adventuresAxiosInstance = createAxios(appConfig.articlesApiUrl);
const authAdventuresAxiosInstance = createAxios(appConfig.articlesApiUrl);

// Перехватчик запросов для добавления токена
const addTokenInterceptor = (config: any) => {
  // Токен берем только на клиенте, чтобы избежать ошибок SSR с localStorage
  if (typeof window !== 'undefined') {
    const token = useAdventuresAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
};

adventuresAxiosInstance.interceptors.request.use(addTokenInterceptor, (error) =>
  Promise.reject(error),
);
authAdventuresAxiosInstance.interceptors.request.use(addTokenInterceptor, (error) =>
  Promise.reject(error),
);

// Перехватчик ответов для обработки 401
const handleAuthError = (error: any) => {
  const status = error?.response?.status;

  if (status === 401 || status === 419) {
    const { logout } = useAdventuresAuthStore.getState();
    logout();

    // Проверяем, находимся ли мы на защищенном роуте
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;

      if (pathname.includes('/prototype/adventures/admin')) {
        // Если мы уже на странице логина или регистрации, не редиректим повторно
        if (pathname.includes('/login') || pathname.includes('/register')) {
          return Promise.reject(error);
        }

        // Угадываем локаль из пути или используем дефолт
        const localeMatch = pathname.match(/^\/([a-z]{2})\//);
        const locale = localeMatch ? localeMatch[1] : 'en';
        window.location.href = `/${locale}/prototype/adventures/admin/login`;
        return Promise.reject(error);
      }

      const isProtected = PROTECTED_ROUTES.some((route) => route.test(pathname));

      if (isProtected) {
        window.location.href = '/?require-auth=1';
      }
    }
  }

  return Promise.reject(error);
};

adventuresAxiosInstance.interceptors.response.use((response) => response, handleAuthError);
authAdventuresAxiosInstance.interceptors.response.use((response) => response, handleAuthError);

export { adventuresAxiosInstance, authAdventuresAxiosInstance };
