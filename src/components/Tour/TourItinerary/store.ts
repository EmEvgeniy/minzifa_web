import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Itinerary } from '../_types';

export type useItineraryStoreProps = {
  isAllExpanded: boolean;
  currentlyExpandedIndexes: number[];
  setCurrentlyExpandedIndexes: (val: number[]) => void;
  handleToggleAll: (val: Itinerary[]) => void;
  setIsAllExpanded: (val: boolean) => void;
};

export const useItineraryStore = create<useItineraryStoreProps>()(
  persist(
    (set, get) => ({
      isAllExpanded: false,
      currentlyExpandedIndexes: [0],
      setIsAllExpanded: (val) => set({ isAllExpanded: val }),
      setCurrentlyExpandedIndexes: (val) => set({ currentlyExpandedIndexes: val }),
      handleToggleAll: (itineraries) => {
        const newIsAllExpanded = !get().isAllExpanded;
        get().setIsAllExpanded(newIsAllExpanded);

        if (newIsAllExpanded) {
          const allIndexes = itineraries.map((_, index) => index);
          get().setCurrentlyExpandedIndexes(allIndexes);
        } else {
          get().setCurrentlyExpandedIndexes([]);
        }
      },
    }),
    {
      name: 'itinerary-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
