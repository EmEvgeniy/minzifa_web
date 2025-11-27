import { create } from 'zustand';

type useNavStoreState = {
  index: number | null;
  setIndex: (ind: number | null) => void;
};

export const useNavStore = create<useNavStoreState>((set) => ({
  index: null,
  setIndex: (ind) => set({ index: ind }),
}));
