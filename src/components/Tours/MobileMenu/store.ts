import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type useMobFilterStoreProps = {
  open: boolean;
  setOpen: (va: boolean) => void;
};

export const useMobFilterStore = create<useMobFilterStoreProps>()(
  persist(
    (set) => ({
      open: false,

      setOpen: (val) => set({ open: val }),
    }),
    {
      name: 'mob-filter-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
