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
  currentDestination: string | null; // Фильтр для конкретной дестинации на странице destination/[slug]
  sort: string;
  page: number | string;
  isLoading: boolean;
  expandedFilters: Record<string, boolean>;
  activeFiltersCount: number;
  setPrices: (prices: number[], resetPage?: boolean) => void;
  setDurations: (durations: number[], resetPage?: boolean) => void;
  setSeasons: (season: string, resetPage?: boolean) => void;
  setHotels: (hotel: string, resetPage?: boolean) => void;
  setTourType: (type: string, resetPage?: boolean) => void;
  setTourTypes: (type: string, resetPage?: boolean) => void;
  setDestinations: (destination: string, resetPage?: boolean) => void;
  setCurrentDestination: (destination: string | null, resetPage?: boolean) => void;
  setSort: (sort: string, resetPage?: boolean) => void;
  setPage: (page: number | string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setExpandedFilter: (filterKey: string, expanded: boolean) => void;
  updateActiveFiltersCount: () => void;
  resetFilters: () => void;
  buildFilterQuery: () => string;
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
  setPrices: (prices, resetPage = true) =>
    set((state) => {
      const newPrices = prices;
      const hasPriceChanged = newPrices[0] !== state.prices[0] || newPrices[1] !== state.prices[1];

      if (!hasPriceChanged && resetPage) {
        return { page: 1 };
      }

      // Используем helper функцию для пересчета активных фильтров
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
  setSeasons: (season: string, resetPage = true) =>
    set((state) => {
      const newSeasons = state.seasons.includes(season)
        ? state.seasons.filter((v) => v !== season)
        : [...state.seasons, season];

      if (JSON.stringify(newSeasons) === JSON.stringify(state.seasons) && resetPage) {
        return { page: 1 };
      }

      const newActiveFiltersCount = calculateActiveFiltersCount({ ...state, seasons: newSeasons });

      return {
        seasons: newSeasons,
        ...(resetPage && { page: 1 }),
        activeFiltersCount: newActiveFiltersCount,
      };
    }),
  setHotels: (hotel: string, resetPage = true) =>
    set((state) => {
      const newHotels = state.hotels.includes(hotel)
        ? state.hotels.filter((v) => v !== hotel)
        : [...state.hotels, hotel];

      if (JSON.stringify(newHotels) === JSON.stringify(state.hotels) && resetPage) {
        return { page: 1 };
      }

      const newActiveFiltersCount = calculateActiveFiltersCount({ ...state, hotels: newHotels });

      return {
        hotels: newHotels,
        ...(resetPage && { page: 1 }),
        activeFiltersCount: newActiveFiltersCount,
      };
    }),
  setTourType: (type: string, resetPage = true) =>
    set((state) => {
      const newTourType = state.tourType.includes(type)
        ? state.tourType.filter((v) => v !== type)
        : [...state.tourType, type];

      if (JSON.stringify(newTourType) === JSON.stringify(state.tourType) && resetPage) {
        return { page: 1 };
      }

      const newActiveFiltersCount = calculateActiveFiltersCount({
        ...state,
        tourType: newTourType,
      });

      return {
        tourType: newTourType,
        ...(resetPage && { page: 1 }),
        activeFiltersCount: newActiveFiltersCount,
      };
    }),
  setTourTypes: (type: string, resetPage = true) =>
    set((state) => {
      const newTourTypes = state.tourTypes.includes(type)
        ? state.tourTypes.filter((v) => v !== type)
        : [...state.tourTypes, type];

      if (JSON.stringify(newTourTypes) === JSON.stringify(state.tourTypes) && resetPage) {
        return { page: 1 };
      }

      const newActiveFiltersCount = calculateActiveFiltersCount({
        ...state,
        tourTypes: newTourTypes,
      });

      return {
        tourTypes: newTourTypes,
        ...(resetPage && { page: 1 }),
        activeFiltersCount: newActiveFiltersCount,
      };
    }),
  setDestinations: (destination: string, resetPage = true) =>
    set((state) => {
      const newDestinations = state.destinations.includes(destination)
        ? state.destinations.filter((v) => v !== destination)
        : [...state.destinations, destination];

      if (JSON.stringify(newDestinations) === JSON.stringify(state.destinations) && resetPage) {
        return { page: 1 };
      }

      const newActiveFiltersCount = calculateActiveFiltersCount({
        ...state,
        destinations: newDestinations,
      });

      return {
        destinations: newDestinations,
        ...(resetPage && { page: 1 }),
        activeFiltersCount: newActiveFiltersCount,
      };
    }),
  setCurrentDestination: (destination: string | null, resetPage = true) =>
    set(() => ({
      currentDestination: destination,
      ...(resetPage && { page: 1 }),
    })),
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

    if (page !== '1' && page !== 1) {
      const pageValue = typeof page === 'string' ? page : String(page);
      params.append('page', pageValue);
    }

    const queryString = params.toString();

    return queryString;
  },
}));
