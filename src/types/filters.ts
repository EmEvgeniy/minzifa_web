// Типы и константы для работы с фильтрами туров

export type FilterState = {
  prices: number[];
  durations: number[];
  seasons: string[];
  hotels: string[];
  tourType: string[];
  tourTypes: string[];
  destinations: string[];
  sort: string;
  page: string | number;
  dateFrom: string | null;
  dateTo: string | null;
};

export const DEFAULT_FILTERS = {
  prices: [0, 20000] as const,
  durations: [1, 31] as const,
  sort: 'newest',
  page: '1',
  dateFrom: null,
  dateTo: null,
} as const;
