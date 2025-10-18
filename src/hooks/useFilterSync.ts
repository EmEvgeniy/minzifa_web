'use client';

import { useEffect, useCallback, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useFilterStore } from '@/store/toursFilterStore';
import useDebouncedValue from './useDebouncedValue';
import {
  isRangeFilterActive,
  calculateActiveFiltersCount,
  hasFilterStateChanged,
} from '@/utils/filters';

export const useFilterSync = () => {
  const pathname = usePathname();

  const {
    prices,
    durations,
    seasons,
    hotels,
    tourType,
    tourTypes,
    destinations,
    sort,
    page,
    setPrices,
    setDurations,
    setSeasons,
    setHotels,
    setTourType,
    setTourTypes,
    setDestinations,
    setSort,
    setPage,
    buildFilterQuery,
  } = useFilterStore();

  const initializedRef = useRef(false);
  const previousSortRef = useRef(sort);

  const extractFiltersFromURL = useCallback(
    (params: URLSearchParams) => {
      const urlPrices = params.getAll('prices[]').map(Number);
      const urlDurations = params.getAll('days[]').map(Number);
      const urlSeasons = params.getAll('seasons[]');
      const urlHotels = params.getAll('hotels[]');
      const urlTourType = params.getAll('tour_type[]');
      const urlTourTypes = params.getAll('types[]');
      const urlDestinations = params.getAll('destinations[]');
      const urlSort = params.get('sort');
      const urlPage = params.get('page');

      return {
        prices: urlPrices.length >= 2 ? urlPrices : [0, 20000],
        durations: urlDurations.length >= 2 ? urlDurations : [1, 31],
        seasons: urlSeasons,
        hotels: urlHotels,
        tourType: urlTourType,
        tourTypes: urlTourTypes,
        destinations: urlDestinations,
        sort: urlSort || 'newest',
        page: urlPage || '1',
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      prices,
      durations,
      seasons,
      hotels,
      tourType,
      tourTypes,
      destinations,
      sort,
      page,
      setPrices,
      setDurations,
      setSeasons,
      setHotels,
      setTourType,
      setTourTypes,
      setDestinations,
      setSort,
      setPage,
    ],
  );

  const updateURL = useCallback(
    (newParams: URLSearchParams) => {
      const newURL = `${pathname}${newParams.toString() ? `?${newParams.toString()}` : ''}`;

      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', newURL);
      }
    },
    [pathname],
  );

  const updateRangeFilter = useCallback(
    (
      filterName: string,
      currentValues: readonly number[],
      urlValues: readonly number[],
      setter: (values: [number, number], resetPage?: boolean) => void,
    ) => {
      if (isRangeFilterActive(currentValues, urlValues)) {
        setter(urlValues as [number, number], false);
      }
    },
    [],
  );

  const updateArrayFilter = useCallback(
    (
      filterName: string,
      currentValues: string[],
      urlValues: string[],
      setter: (value: string, resetPage?: boolean) => void,
    ) => {
      if (currentValues.length > 0 || urlValues.length > 0) {
        // Очищаем существующие значения
        currentValues.forEach((value: string) => setter(value, false));
        // Устанавливаем новые значения из URL
        urlValues.forEach((value: string) => setter(value, false));
      }
    },
    [],
  );

  useEffect(() => {
    // Используем более надежный способ получения URL параметров
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);

    const urlFilters = extractFiltersFromURL(urlParams);

    // Проверяем, нужно ли обновлять фильтры из URL
    const currentState = {
      prices,
      durations,
      seasons,
      hotels,
      tourType,
      tourTypes,
      destinations,
      sort,
      page,
    };
    const needsUpdate = hasFilterStateChanged(currentState, urlFilters, page);

    if (needsUpdate && !initializedRef.current) {
      updateRangeFilter('prices', prices, urlFilters.prices, setPrices);
      updateRangeFilter('durations', durations, urlFilters.durations, setDurations);

      updateArrayFilter('seasons', seasons, urlFilters.seasons, setSeasons);
      updateArrayFilter('hotels', hotels, urlFilters.hotels, setHotels);
      updateArrayFilter('tourType', tourType, urlFilters.tourType, setTourType);
      updateArrayFilter('tourTypes', tourTypes, urlFilters.tourTypes, setTourTypes);
      updateArrayFilter('destinations', destinations, urlFilters.destinations, setDestinations);

      if (urlFilters.sort !== sort) {
        setSort(urlFilters.sort, false);
      }

      if (urlFilters.page !== (typeof page === 'string' ? page : page.toString())) {
        setPage(urlFilters.page);
      }
    }

    initializedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterParams = useMemo(
    () => ({
      prices,
      durations,
      seasons,
      hotels,
      tourType,
      tourTypes,
      destinations,
      sort,
      page,
    }),
    [prices, durations, seasons, hotels, tourType, tourTypes, destinations, sort, page],
  );

  const debouncedFilterParams = useDebouncedValue(filterParams, 100);

  useEffect(() => {
    const queryString = buildFilterQuery();

    if (queryString) {
      const newParams = new URLSearchParams(queryString);

      if (pathname.includes('/destination/')) {
        newParams.delete('destinations[]');
      }

      updateURL(newParams);
    } else {
      updateURL(new URLSearchParams());
    }
  }, [debouncedFilterParams, buildFilterQuery, updateURL, pathname]);

  // Правильная логика сброса страницы только при изменении сортировки
  useEffect(() => {
    if (!initializedRef.current) return;

    // Сбрасываем страницу на 1 только если сортировка реально изменилась
    if (previousSortRef.current !== sort && sort !== 'newest') {
      setPage(1);
    }

    previousSortRef.current = sort;
  }, [sort, setPage]);

  // Эта логика была удалена - сброс страницы должен происходить только при реальном изменении сортировки

  const hasActiveFilters = useMemo(() => {
    const currentState = {
      prices,
      durations,
      seasons,
      hotels,
      tourType,
      tourTypes,
      destinations,
      sort,
      page,
    };
    return calculateActiveFiltersCount(currentState) > 0;
  }, [prices, durations, seasons, hotels, tourType, tourTypes, destinations, sort, page]);

  return {
    filterQuery: buildFilterQuery(),
    hasActiveFilters,
  };
};
