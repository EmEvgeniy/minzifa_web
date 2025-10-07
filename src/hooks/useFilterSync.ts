'use client';

import { useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useFilterStore } from '@/store/toursFilterStore';

/**
 * Хук для синхронизации фильтров между URL параметрами и store
 * Обеспечивает двустороннюю синхронизацию: изменения в store попадают в URL и наоборот
 */
export const useFilterSync = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    prices,
    durations,
    seasons,
    hotels,
    tourTypes,
    destinations,
    sort,
    page,
    setPrices,
    setDurations,
    setSeasons,
    setHotels,
    setTourTypes,
    setDestinations,
    setSort,
    setPage,
    buildFilterQuery,
  } = useFilterStore();

  // Функция для извлечения фильтров из URL параметров
  const extractFiltersFromURL = useCallback((params: URLSearchParams) => {
    const urlPrices = params.getAll('prices[]').map(Number);
    const urlDurations = params.getAll('days[]').map(Number);
    const urlSeasons = params.getAll('seasons[]');
    const urlHotels = params.getAll('hotels[]');
    const urlTourTypes = params.getAll('types[]');
    const urlDestinations = params.getAll('destinations[]');
    const urlSort = params.get('sort');
    const urlPage = params.get('page');

    return {
      prices: urlPrices.length >= 2 ? urlPrices : [0, 20000],
      durations: urlDurations.length >= 2 ? urlDurations : [1, 31],
      seasons: urlSeasons,
      hotels: urlHotels,
      tourTypes: urlTourTypes,
      destinations: urlDestinations,
      sort: urlSort || 'newest',
      page: urlPage || '1',
    };
  }, []);

  // Функция для обновления URL без перезагрузки страницы
  const updateURL = useCallback(
    (newParams: URLSearchParams) => {
      const newURL = `${pathname}?${newParams.toString()}`;
      // Используем replaceState для обновления URL без навигации
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', newURL);
      }
    },
    [pathname],
  );

  // Синхронизация store с URL параметрами при монтировании
  useEffect(() => {
    const urlFilters = extractFiltersFromURL(searchParams);

    // Обновляем store на основе URL параметров
    setPrices(urlFilters.prices as [number, number]);
    setDurations(urlFilters.durations as [number, number]);

    // Очищаем существующие значения перед установкой новых
    useFilterStore.setState({
      seasons: [],
      hotels: [],
      tourTypes: [],
      destinations: [],
    });

    urlFilters.seasons.forEach((season: string) => setSeasons(season));
    urlFilters.hotels.forEach((hotel: string) => setHotels(hotel));
    urlFilters.tourTypes.forEach((type: string) => setTourTypes(type));
    urlFilters.destinations.forEach((destination: string) => setDestinations(destination));

    if (urlFilters.page !== '1') {
      setPage(urlFilters.page);
    }

    if (urlFilters.sort !== 'newest') {
      setSort(urlFilters.sort);
    }
  }, [
    extractFiltersFromURL,
    searchParams,
    setPrices,
    setDurations,
    setSeasons,
    setHotels,
    setTourTypes,
    setDestinations,
    setPage,
    setSort,
  ]); // Выполняется только при монтировании

  // Синхронизация store изменений с URL
  useEffect(() => {
    const queryString = buildFilterQuery();

    if (queryString) {
      const newParams = new URLSearchParams(queryString);

      // На странице дестинации удаляем destinations параметр из URL
      // кроме currentDestination который используется для фильтрации
      if (pathname.includes('/destination/')) {
        newParams.delete('destinations[]');
      }

      updateURL(newParams);
    } else {
      // Если нет активных фильтров, очищаем URL
      updateURL(new URLSearchParams());
    }
  }, [
    prices,
    durations,
    seasons,
    hotels,
    tourTypes,
    destinations,
    sort,
    page,
    buildFilterQuery,
    updateURL,
    pathname,
  ]);

  // Возвращаем текущие параметры фильтрации для использования в API запросах
  return {
    filterQuery: buildFilterQuery(),
    hasActiveFilters: !!(
      prices[0] !== 0 ||
      prices[1] !== 20000 ||
      durations[0] !== 1 ||
      durations[1] !== 31 ||
      seasons.length > 0 ||
      hotels.length > 0 ||
      tourTypes.length > 0 ||
      destinations.length > 0 ||
      sort !== 'newest'
    ),
  };
};
