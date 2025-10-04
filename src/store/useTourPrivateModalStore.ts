import { create } from 'zustand';
import { TourPriceOption, TourPrivateFormData } from '@/types';

type TourPrivateModalState = {
  isOpen: boolean;
  priceOptions: TourPriceOption[];
  preselectedPrice?: string | number | null;
  form: TourPrivateFormData;
  open: (opts?: { priceOptions?: TourPriceOption[] }) => void;
  close: () => void;
  setForm: (patch: Partial<TourPrivateFormData>) => void;
  resetForm: () => void;
  setPriceOptions: (options: TourPriceOption[]) => void;
  setPreselectedPrice: (value: string | number | null) => void;
};

const initialForm: TourPrivateFormData = {
  date: null,
  travellers: 1,
  priceOption: null,
  wishes: '',
  name: '',
  email: '',
  phone: '',
};

export const useTourPrivateModalStore = create<TourPrivateModalState>((set) => ({
  isOpen: false,
  priceOptions: [],
  preselectedPrice: null,
  form: initialForm,
  open: (opts) =>
    set((state) => ({
      isOpen: true,
      priceOptions: opts?.priceOptions ?? state.priceOptions,
    })),
  close: () => set({ isOpen: false }),
  setForm: (patch) => set((state) => ({ form: { ...state.form, ...patch } })),
  resetForm: () => set({ form: initialForm }),
  setPriceOptions: (options) => set({ priceOptions: options }),
  setPreselectedPrice: (value) =>
    set({ preselectedPrice: value, form: { ...initialForm, priceOption: value } }),
}));
