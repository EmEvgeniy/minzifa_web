import { create } from 'zustand';

export interface PrivateTourFormData {
  dates: [Date | null, Date | null];
  travellers: number;
  price?: string | number | null;
  wishes: string;
  name: string;
  email: string;
  phone: string;
  recaptchaToken?: string;
}

export interface PrivateTourFormState {
  popup: boolean;
  formData: PrivateTourFormData;
  setPopup: (isOpen: boolean) => void;
  setFormData: (
    patch:
      | Partial<PrivateTourFormData>
      | ((prev: PrivateTourFormData) => Partial<PrivateTourFormData>),
  ) => void;
  resetFormData: () => void;
}

const defaultFormData: PrivateTourFormData = {
  dates: [null, null],
  travellers: 1,
  price: null,
  wishes: '',
  name: '',
  email: '',
  phone: '',
  recaptchaToken: '',
};

export const usePrivateTourFormStore = create<PrivateTourFormState>((set) => ({
  popup: false,
  formData: defaultFormData,
  setPopup: (isOpen) => set({ popup: isOpen }),
  setFormData: (patch) =>
    set((state) => {
      const updated = typeof patch === 'function' ? patch(state.formData) : patch;
      return { formData: { ...state.formData, ...updated } };
    }),
  resetFormData: () => set({ formData: defaultFormData }),
}));
