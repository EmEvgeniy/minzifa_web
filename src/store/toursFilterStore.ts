import { create } from 'zustand';
import { calculateActiveFiltersCount } from '@/utils/filters';

type FilterStoreData = {
  prices: number[];
  durations: number[];
  seasons: string[];
  hotels: string[];
  tourType: string[];
  tourTypes: string[];
  destinations: string[];
  currentDestination: string | null;
  sort: string;
  page: number | string;
  isLoading: boolean;
  expandedFilters: Record<string, boolean>;
  activeFiltersCount: number;
  dateFrom: string | null;
  dateTo: string | null;
  setPrices: (prices: number[], resetPage?: boolean) => void;
  setDurations: (durations: number[], resetPage?: boolean) => void;
  setSeasons: (season: string, resetPage?: boolean) => void;
  setHotels: (hotel: string, resetPage?: boolean) => void;
  setTourType: (type: string, resetPage?: boolean) => void;
  setTourTypes: (type: string, resetPage?: boolean) => void;
  setDestinations: (destination: string, resetPage?: boolean) => void;
  setCurrentDestination: (destination: string | null, resetPage?: boolean) => void;
  setDateRange: (dateFrom: string | null, dateTo: string | null, resetPage?: boolean) => void;
  setSort: (sort: string, resetPage?: boolean) => void;
  setPage: (page: number | string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setExpandedFilter: (filterKey: string, expanded: boolean) => void;
  updateActiveFiltersCount: () => void;
  resetFilters: () => void;
  buildFilterQuery: () => string;
};

// Хелпер для создания toggle-сеттеров массивов
type ArrayFilterKeys = 'seasons' | 'hotels' | 'tourType' | 'tourTypes' | 'destinations';

const createToggleSetter = (
  set: (
    fn: (state: FilterStoreData) => Partial<FilterStoreData> | Pick<FilterStoreData, 'page'>,
  ) => void,
  key: ArrayFilterKeys,
) => {
  return (value: string, resetPage = true) =>
    set((state) => {
      const currentArray = state[key];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((v) => v !== value)
        : [...currentArray, value];

      if (JSON.stringify(newArray) === JSON.stringify(currentArray) && resetPage) {
        return { page: 1 };
      }

      const newActiveFiltersCount = calculateActiveFiltersCount({ ...state, [key]: newArray });

      return {
        [key]: newArray,
        ...(resetPage && { page: 1 }),
        activeFiltersCount: newActiveFiltersCount,
      };
    });
};

export const useFilterStore = create<FilterStoreData>()((set, get) => ({
  prices: [0, 20000],
  durations: [1, 31],
  seasons: [],
  hotels: [],
  tourType: [],
  tourTypes: [],
  destinations: [],
  currentDestination: null,
  sort: 'newest',
  page: '1',
  isLoading: true,
  expandedFilters: {},
  activeFiltersCount: 0,
  dateFrom: null,
  dateTo: null,
  setPrices: (prices, resetPage = true) =>
    set((state) => {
      const newPrices = prices;
      const hasPriceChanged = newPrices[0] !== state.prices[0] || newPrices[1] !== state.prices[1];

      if (!hasPriceChanged && resetPage) {
        return { page: 1 };
      }

      const newActiveFiltersCount = hasPriceChanged
        ? calculateActiveFiltersCount({ ...state, prices: newPrices })
        : state.activeFiltersCount;

      return {
        prices: newPrices,
        ...(resetPage && { page: 1 }),
        ...(hasPriceChanged && { activeFiltersCount: newActiveFiltersCount }),
      };
    }),
  setDurations: (durations, resetPage = true) =>
    set((state) => {
      const newDurations = durations;
      const hasDurationChanged =
        newDurations[0] !== state.durations[0] || newDurations[1] !== state.durations[1];

      if (!hasDurationChanged && resetPage) {
        return { page: 1 };
      }

      const newActiveFiltersCount = hasDurationChanged
        ? calculateActiveFiltersCount({ ...state, durations: newDurations })
        : state.activeFiltersCount;

      return {
        durations: newDurations,
        ...(resetPage && { page: 1 }),
        ...(hasDurationChanged && { activeFiltersCount: newActiveFiltersCount }),
      };
    }),
  setSeasons: createToggleSetter(set, 'seasons'),
  setHotels: createToggleSetter(set, 'hotels'),
  setTourType: createToggleSetter(set, 'tourType'),
  setTourTypes: createToggleSetter(set, 'tourTypes'),
  setDestinations: createToggleSetter(set, 'destinations'),
  setCurrentDestination: (destination: string | null, resetPage = true) =>
    set(() => ({
      currentDestination: destination,
      ...(resetPage && { page: 1 }),
    })),
  setDateRange: (dateFrom: string | null, dateTo: string | null, resetPage = true) =>
    set((state) => {
      const hasDateChanged = dateFrom !== state.dateFrom || dateTo !== state.dateTo;
      if (!hasDateChanged && resetPage) {
        return { page: 1 };
      }

      const newActiveFiltersCount = hasDateChanged
        ? calculateActiveFiltersCount({ ...state, dateFrom, dateTo })
        : state.activeFiltersCount;

      return {
        dateFrom,
        dateTo,
        ...(resetPage && { page: 1 }),
        ...(hasDateChanged && { activeFiltersCount: newActiveFiltersCount }),
      };
    }),
  setSort: (sort: string, resetPage = true) =>
    set(() => ({
      sort: sort,
      ...(resetPage && { page: 1 }),
    })),
  setPage: (page: number | string) => set({ page: page }),
  setIsLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
  setExpandedFilter: (filterKey: string, expanded: boolean) =>
    set((state) => ({
      expandedFilters: {
        ...state.expandedFilters,
        [filterKey]: expanded,
      },
    })),
  updateActiveFiltersCount: () =>
    set((state) => ({
      activeFiltersCount: calculateActiveFiltersCount(state),
    })),
  resetFilters: () =>
    set({
      prices: [0, 20000],
      durations: [1, 31],
      seasons: [],
      hotels: [],
      tourType: [],
      tourTypes: [],
      destinations: [],
      currentDestination: null,
      sort: 'newest',
      page: 1,
      isLoading: false,
      activeFiltersCount: 0,
      dateFrom: null,
      dateTo: null,
    }),
  buildFilterQuery: () => {
    const {
      prices,
      durations,
      destinations,
      seasons,
      hotels,
      tourType,
      tourTypes,
      currentDestination,
      sort,
      page,
      dateFrom,
      dateTo,
    } = get();

    const params = new URLSearchParams();

    // Только если цены изменены от дефолта
    if (prices[0] !== 0 || prices[1] !== 20000) {
      params.append('prices[]', String(prices[0]));
      params.append('prices[]', String(prices[1]));
    }

    // Только если дни изменены от дефолта
    if (durations[0] !== 1 || durations[1] !== 31) {
      params.append('days[]', String(durations[0]));
      params.append('days[]', String(durations[1]));
    }

    if (seasons.length > 0) {
      seasons.forEach((s) => params.append('seasons[]', s));
    }

    if (hotels.length > 0) {
      hotels.forEach((h) => params.append('hotels[]', h));
    }

    if (tourType.length > 0) {
      tourType.forEach((t) => params.append('tour_type[]', t));
    }

    if (tourTypes.length > 0) {
      tourTypes.forEach((t) => params.append('types[]', t));
    }

    if (destinations.length > 0) {
      destinations.forEach((d) => params.append('destinations[]', d));
    }

    if (currentDestination) {
      params.append('destinations[]', currentDestination);
    }

    if (sort !== 'newest') {
      params.append('sort', sort);
    }

    if (dateFrom) {
      params.append('date_from', dateFrom);
    }

    if (dateTo) {
      params.append('date_to', dateTo);
    }

    if (page !== '1' && page !== 1) {
      const pageValue = typeof page === 'string' ? page : String(page);
      params.append('page', pageValue);
    }

    const queryString = params.toString();

    return queryString;
  },
}));
