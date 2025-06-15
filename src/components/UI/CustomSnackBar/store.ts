import { create } from 'zustand';

type SnackStoreState = {
  message: string | null;
  error: string | null;
  setMessage: (ind: string | null) => void;
  setError: (msg: string | null) => void;
};

export const useSnackStore = create<SnackStoreState>((set) => ({
  message: null,
  error: null,
  setMessage: (msg) => set({ message: msg }),
  setError: (errorMsg) => set({ error: errorMsg }),
}));
