// Типы для роутинга и навигации

export type DefaultPageProps = {
  params: Promise<{ locale: string; slug?: string }>;
};

export type availableFilters =
  | 'price'
  | 'duration'
  | 'seasons'
  | 'hotels'
  | 'tourType'
  | 'tourTypes'
  | 'destinations';

export type DefaultComponentsProps = {
  locale: string;
  showFilter?: availableFilters[];
};
