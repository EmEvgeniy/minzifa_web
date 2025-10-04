// Централизованные экспорты для утилит

// Конфигурация приложения
export {
  appConfig,
  getApiUrl,
  isDevelopment,
  isProduction,
  getAnalyticsConfig,
  type AppEnvironment,
  type AppConfig,
} from './config';

// Общие утилиты
export { cn, date_end, formatted_date, calculateReadingTime, makeMultiParam } from './utils';

// Серверные API утилиты
export { apiGet, apiPost } from './serverApi';
