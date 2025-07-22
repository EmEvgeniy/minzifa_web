import { create } from 'zustand';

type FilterStoreData = {
  prices: number[];
  durations: number[];
  seasons: string[];
  hotels: string[];
  tourTypes: string[];
  destinations: string[];
  sort: string;
  page: number | string;
  isLoading: boolean;
  setPrices: (prices: number[]) => void;
  setDurations: (durations: number[]) => void;
  setSeasons: (season: string) => void;
  setHotels: (hotel: string) => void;
  setTourTypes: (type: string) => void;
  setDestinations: (destination: string) => void;
  setSort: (sort: string) => void;
  setPage: (page: number | string) => void;
  setIsLoading: (isLoading: boolean) => void;
  resetFilters: () => void;
  buildFilterQuery: () => string;
};

export const useFilterStore = create<FilterStoreData>()(
  (set, get) => ({
    prices: [0, 20000],
    durations: [1, 31],
    seasons: [],
    hotels: [],
    tourTypes: [],
    destinations: [],
    sort: 'newest',
    page: '1',
    isLoading: true,
    setPrices: (prices) => set({ prices: prices }),
    setDurations: (durations) => set({ durations: durations }),
    setSeasons: (season: string) =>
      set((state) => ({
        seasons: state.seasons.includes(season)
          ? state.seasons.filter((v) => v !== season)
          : [...state.seasons, season],
      })),
    setHotels: (hotel: string) =>
      set((state) => ({
        hotels: state.hotels.includes(hotel)
          ? state.hotels.filter((v) => v !== hotel)
          : [...state.hotels, hotel],
      })),
    setTourTypes: (type: string) =>
      set((state) => ({
        tourTypes: state.tourTypes.includes(type)
          ? state.tourTypes.filter((v) => v !== type)
          : [...state.tourTypes, type],
      })),
    setDestinations: (destination: string) =>
      set((state) => ({
        destinations: state.destinations.includes(destination)
          ? state.destinations.filter((v) => v !== destination)
          : [...state.destinations, destination],
      })),
    setSort: (sort: string) => set({ sort: sort }),
    setPage: (page: number | string) => set({ page: page }),
    setIsLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
    resetFilters: () =>
      set({
        prices: [0, 20000],
        durations: [1, 31],
        seasons: [],
        hotels: [],
        tourTypes: [],
        destinations: [],
        sort: 'newest',
        page: 1,
        isLoading: false,
      }),
    buildFilterQuery: () => {
      const { prices, durations, destinations, seasons, hotels, tourTypes, sort, page } = get();

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
    }
  }),
);
