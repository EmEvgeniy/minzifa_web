/**
 * Конфигурация приложения для разных режимов
 */

export type AppEnvironment = 'development' | 'production' | 'test';

export interface AppConfig {
  apiUrl: string;
  appUrl: string;
  environment: AppEnvironment;
  isDevelopment: boolean;
  isProduction: boolean;
  analytics: {
    gaId: string;
    yandexId: string;
    facebookPixelId: string;
  };
}

/**
 * Получаем конфигурацию из переменных окружения
 */
function getAppConfig(): AppConfig {
  const env = (process.env.NEXT_PUBLIC_APP_ENV as AppEnvironment) || 'development';

  const config: AppConfig = {
    environment: env,
    isDevelopment: env === 'development',
    isProduction: env === 'production',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api/v1',
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    analytics: {
      gaId: process.env.NEXT_PUBLIC_GA_ID || 'G-M136S4C9GK',
      yandexId: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || '98106769',
      facebookPixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '777577019559963',
    },
  };

  return config;
}

/**
 * Экспортируем текущую конфигурацию
 */
export const appConfig = getAppConfig();

/**
 * Утилита для получения API URL для разных режимов
 */
export const getApiUrl = (endpoint?: string): string => {
  const baseUrl = appConfig.apiUrl.endsWith('/') ? appConfig.apiUrl.slice(0, -1) : appConfig.apiUrl;

  if (!endpoint) return baseUrl;

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

/**
 * Проверяем, запущены ли мы в режиме разработки
 */
export const isDevelopment = (): boolean => appConfig.isDevelopment;

/**
 * Проверяем, запущены ли мы в продакшене
 */
export const isProduction = (): boolean => appConfig.isProduction;

/**
 * Получаем настройки аналитики
 */
export const getAnalyticsConfig = () => appConfig.analytics;
