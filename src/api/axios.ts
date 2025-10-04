import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { getApiUrl } from '../utils/config';

export const BASE_API_PATH = '/api/v1';

// Создаем экземпляр для публичных запросов (без токена)
export const publicAxios = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
});

// Создаем экземпляр для аутентифицированных запросов (с токеном)
export const privateAxios = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
});

// Настраиваем перехватчики для privateAxios
privateAxios.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

privateAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      const { removeUser } = useAuthStore.getState();
      removeUser();
      // Перенаправление будет обработано в AuthProvider
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

// Устанавливаем baseURL для основного axios (для обратной совместимости)
axios.defaults.baseURL = getApiUrl();

export default axios;
