import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type useGalleryStoreProps = {
  show: boolean;
  setShow: (val: boolean) => void;
};

export const useGalleryStore = create<useGalleryStoreProps>()(
  persist(
    (set) => ({
      show: false,
      setShow: (val) => set({ show: val }),
    }),
    {
      name: 'gallery-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
