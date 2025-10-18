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

// Экспорт функций и типов для фильтров
export {
  DEFAULT_FILTERS,
  isArrayFilterActive,
  isRangeFilterActive,
  isSortActive,
  calculateActiveFiltersCount,
  hasFilterStateChanged,
} from '@/utils/filters';

export type { FilterState } from '@/types/filters';

// Серверные API утилиты
export { apiGet, apiPost } from './serverApi';
