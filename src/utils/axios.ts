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
const handleAuthError = (error: AxiosError) => {
  const status = error?.response?.status;

  if (status === 401 || status === 419) {
    const { logout } = useAuthStore.getState();
    logout();

    // Проверяем, находимся ли мы на защищенном роуте
    const pathname = window.location.pathname;
    const isProtected = PROTECTED_ROUTES.some((route) => route.test(pathname));

    if (isProtected) {
      window.location.href = '/?require-auth=1';
    }
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.response.use((response) => response, handleAuthError);
authAxiosInstance.interceptors.response.use((response) => response, handleAuthError);

export { axiosInstance, authAxiosInstance };
