import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type LayoutStoreData = {
  open: boolean;
  shownPaths: string[];
  setOpen: (e: boolean) => void;
  markAsShown: (path: string) => void;
  wasShown: (path: string) => boolean;
};

export const useLayoutStore = create<LayoutStoreData>()(
  persist(
    (set, get) => ({
      open: false,
      shownPaths: [],
      setOpen: (e) => set({ open: e }),
      markAsShown: (path) => {
        if (!get().shownPaths.includes(path)) {
          set((state) => ({
            shownPaths: [...state.shownPaths, path],
          }));
        }
      },
      wasShown: (path) => get().shownPaths.includes(path),
    }),
    {
      name: 'layout-storage',
      storage: createJSONStorage(() => sessionStorage), // или localStorage
    },
  ),
);
