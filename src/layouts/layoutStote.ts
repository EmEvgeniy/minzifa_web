import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface LayoutStore {
  open: boolean;
  shownByTimer: boolean;
  shownByScroll: boolean;
  setOpen: (val: boolean) => void;
  markShownByTimer: () => void;
  markShownByScroll: () => void;
}

export const useLayoutStore = create<LayoutStore>()(
  persist(
    (set) => ({
      open: false,
      shownByTimer: false,
      shownByScroll: false,
      setOpen: (val) => set({ open: val }),
      markShownByTimer: () => set({ shownByTimer: true }),
      markShownByScroll: () => set({ shownByScroll: true }),
    }),
    {
      name: 'layout-storage',
      storage: createJSONStorage(() => sessionStorage), // или localStorage
    },
  ),
);
