import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type LayoutStoreData = {
  open: boolean;
  setOpen: (e: boolean) => void;
  setOneOpen: (e: boolean) => void;
  oneOpened: boolean;
};

export const useLayoutStore = create<LayoutStoreData>()(
  persist(
    (set) => ({
      open: false,
      oneOpened: false,
      setOpen: (e) => set({ open: e }),
      setOneOpen: (e) => set({ oneOpened: e }),
    }),
    {
      name: 'layout-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
