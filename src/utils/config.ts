/**
 * Конфигурация приложения для разных режимов
 */

export type AppEnvironment = 'development' | 'production' | 'test';

export interface AppConfig {
  apiUrl: string;
  articlesApiUrl: string;
  appUrl: string;
  /** Базовый origin CRM без завершающего слэша (лиды и т.д.) */
  crmApiBaseUrl: string;
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

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const crmApiBaseUrl = process.env.NEXT_PUBLIC_CRM_API_URL
    ? process.env.NEXT_PUBLIC_CRM_API_URL.replace(/\/$/, '')
    : appUrl.replace(/\/$/, '');

  const config: AppConfig = {
    environment: env,
    isDevelopment: env === 'development',
    isProduction: env === 'production',
    apiUrl: process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1`
      : 'https://api.minzifatravel.com/api/v1',
    articlesApiUrl: process.env.NEXT_PUBLIC_ARTICLES_API_URL
      ? `${process.env.NEXT_PUBLIC_ARTICLES_API_URL}/api/v1`
      : 'https://articles.minzifatravel.com/api/v1',
    appUrl,
    crmApiBaseUrl,
    analytics: {
      gaId: process.env.NEXT_PUBLIC_GA_ID as string,
      yandexId: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID as string,
      facebookPixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID as string,
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
 * Полный URL создания лида в CRM (POST).
 * База: NEXT_PUBLIC_CRM_API_URL или NEXT_PUBLIC_APP_URL (тот же origin, что и сайт).
 */
export const getCrmLeadsUrl = (): string => {
  const base = appConfig.crmApiBaseUrl.endsWith('/')
    ? appConfig.crmApiBaseUrl.slice(0, -1)
    : appConfig.crmApiBaseUrl;
  return `${base}/api/v1/leads`;
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
