import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { BestSellersPackagesCardType } from '../BestSellersPackagesCard/_types';

export type FavoriteBtnData = {
  tours: BestSellersPackagesCardType[];
  active: boolean;
  setTours: (val: BestSellersPackagesCardType[]) => void;
  setActive: (e: boolean) => void;
};

export const useFavoriteStore = create<FavoriteBtnData>()(
  persist(
    (set) => ({
      tours: [],
      active: false,
      setTours: (val) => set({ tours: val }),
      setActive: (e) => set({ active: e }),
    }),
    {
      name: 'favorite-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
