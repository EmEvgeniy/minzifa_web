import { create } from 'zustand';

export interface planYourTripPopupState {
  planYourTripPopup: boolean;
  setPlanYourTripPopup: (popup: boolean) => void;
}

export const usePlanYourTripPopupStore = create<planYourTripPopupState>()((set) => ({
  planYourTripPopup: false,
  setPlanYourTripPopup: (popup) => set({ planYourTripPopup: popup }),
}));
