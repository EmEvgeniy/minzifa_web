import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type FilterStoreData = {
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
  persist(
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
        const { prices, durations, destinations, seasons, hotels, tourTypes } = get();
        const params = new URLSearchParams();

        if (prices.length === 2) {
          params.append('prices', String(prices[0]));
          params.append('prices', String(prices[1]));
        }
        if (durations.length === 2) {
          params.append('days', String(durations[0]));
          params.append('days', String(durations[1]));
        }
        seasons.forEach((s) => params.append('seasons', s));
        hotels.forEach((h) => params.append('hotels', h));
        tourTypes.forEach((t) => params.append('types', t));
        destinations.forEach((d) => params.append('destinations', d));

        params.append('sort', get().sort);
        params.append('page', get().page.toString());

        return params.toString();
      },
    }),
    {
      name: 'filter-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
