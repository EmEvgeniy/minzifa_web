// Helper функции для работы с фильтрами туров

import { FilterState, DEFAULT_FILTERS } from '@/types/filters';

// Экспорт констант для удобства импорта
export { DEFAULT_FILTERS };

export const isArrayFilterActive = (values: string[], defaultLength = 0) =>
  values.length > defaultLength;

export const isRangeFilterActive = (values: readonly number[], defaultValues: readonly number[]) =>
  values[0] !== defaultValues[0] || values[1] !== defaultValues[1];

export const isSortActive = (sort: string) => sort !== DEFAULT_FILTERS.sort;

export const calculateActiveFiltersCount = (state: FilterState) => {
  let count = 0;
  if (isRangeFilterActive(state.prices, DEFAULT_FILTERS.prices)) count++;
  if (isRangeFilterActive(state.durations, DEFAULT_FILTERS.durations)) count++;
  if (isArrayFilterActive(state.seasons)) count++;
  if (isArrayFilterActive(state.hotels)) count++;
  if (isArrayFilterActive(state.tourType)) count++;
  if (isArrayFilterActive(state.tourTypes)) count++;
  if (isArrayFilterActive(state.destinations)) count++;
  if (isSortActive(state.sort)) count++;
  return count;
};

export const hasFilterStateChanged = (
  currentState: FilterState,
  urlState: Partial<FilterState>,
  currentPage: string | number,
) => {
  return !!(
    (urlState.prices &&
      (currentState.prices[0] !== urlState.prices[0] ||
        currentState.prices[1] !== urlState.prices[1])) ||
    (urlState.durations &&
      (currentState.durations[0] !== urlState.durations[0] ||
        currentState.durations[1] !== urlState.durations[1])) ||
    (urlState.seasons &&
      JSON.stringify(currentState.seasons.sort()) !== JSON.stringify(urlState.seasons.sort())) ||
    (urlState.hotels &&
      JSON.stringify(currentState.hotels.sort()) !== JSON.stringify(urlState.hotels.sort())) ||
    (urlState.tourType &&
      JSON.stringify(currentState.tourType.sort()) !== JSON.stringify(urlState.tourType.sort())) ||
    (urlState.tourTypes &&
      JSON.stringify(currentState.tourTypes.sort()) !==
        JSON.stringify(urlState.tourTypes.sort())) ||
    (urlState.destinations &&
      JSON.stringify(currentState.destinations.sort()) !==
        JSON.stringify(urlState.destinations.sort())) ||
    (urlState.sort && currentState.sort !== urlState.sort) ||
    (urlState.page &&
      (typeof currentPage === 'string' ? currentPage : currentPage.toString()) !== urlState.page)
  );
};
