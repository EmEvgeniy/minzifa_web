import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type FilterStoreData = {
  price: number[];
  duration: number[];
  setPrice: (prices: number[]) => void;
  setDuration: (durations: number[]) => void;
};

export const useFilterStore = create<FilterStoreData>()(
  persist(
    (set) => ({
      price: [0, 10000],
      duration: [0, 20],
      setPrice: (prices) => set({ price: prices }),
      setDuration: (durations) => set({ duration: durations }),
    }),
    {
      name: 'filter-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
