import { create } from 'zustand';

type FilterStoreData = {
  prices: number[];
  durations: number[];
  seasons: string[];
  hotels: string[];
  tourType: string[];
  tourTypes: string[];
  destinations: string[];
  sort: string;
  page: number | string;
  isLoading: boolean;
  setPrices: (prices: number[], resetPage?: boolean) => void;
  setDurations: (durations: number[], resetPage?: boolean) => void;
  setSeasons: (season: string, resetPage?: boolean) => void;
  setHotels: (hotel: string, resetPage?: boolean) => void;
  setTourType: (type: string, resetPage?: boolean) => void;
  setTourTypes: (type: string, resetPage?: boolean) => void;
  setDestinations: (destination: string, resetPage?: boolean) => void;
  setSort: (sort: string, resetPage?: boolean) => void;
  setPage: (page: number | string) => void;
  setIsLoading: (isLoading: boolean) => void;
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
  sort: 'newest',
  page: '1',
  isLoading: true,
  setPrices: (prices, resetPage = false) =>
    set(() => ({
      prices: prices,
      ...(resetPage && { page: 1 }),
    })),
  setDurations: (durations, resetPage = false) =>
    set(() => ({
      durations: durations,
      ...(resetPage && { page: 1 }),
    })),
  setSeasons: (season: string, resetPage = true) =>
    set((state) => ({
      seasons: state.seasons.includes(season)
        ? state.seasons.filter((v) => v !== season)
        : [...state.seasons, season],
      ...(resetPage && { page: 1 }),
    })),
  setHotels: (hotel: string, resetPage = true) =>
    set((state) => ({
      hotels: state.hotels.includes(hotel)
        ? state.hotels.filter((v) => v !== hotel)
        : [...state.hotels, hotel],
      ...(resetPage && { page: 1 }),
    })),
  setTourType: (type: string, resetPage = true) =>
    set((state) => ({
      tourType: state.tourType.includes(type)
        ? state.tourType.filter((v) => v !== type)
        : [...state.tourType, type],
      ...(resetPage && { page: 1 }),
    })),
  setTourTypes: (type: string, resetPage = true) =>
    set((state) => ({
      tourTypes: state.tourTypes.includes(type)
        ? state.tourTypes.filter((v) => v !== type)
        : [...state.tourTypes, type],
      ...(resetPage && { page: 1 }),
    })),
  setDestinations: (destination: string, resetPage = true) =>
    set((state) => ({
      destinations: state.destinations.includes(destination)
        ? state.destinations.filter((v) => v !== destination)
        : [...state.destinations, destination],
      ...(resetPage && { page: 1 }),
    })),
  setSort: (sort: string, resetPage = true) =>
    set(() => ({
      sort: sort,
      ...(resetPage && { page: 1 }),
    })),
  setPage: (page: number | string) => set({ page: page }),
  setIsLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
  resetFilters: () =>
    set({
      prices: [0, 20000],
      durations: [1, 31],
      seasons: [],
      hotels: [],
      tourType: [],
      tourTypes: [],
      destinations: [],
      sort: 'newest',
      page: 1,
      isLoading: false,
    }),
  buildFilterQuery: () => {
    const { prices, durations, destinations, seasons, hotels, tourType, tourTypes, sort, page } =
      get();

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

    if (sort !== 'newest') {
      params.append('sort', sort);
    }

    if (page !== '1') {
      params.append('page', page.toString());
    }

    return params.toString();
  },
}));
