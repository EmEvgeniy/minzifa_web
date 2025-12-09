import { OrderTourDetailData } from '@/components/Tour/_types';
import { create } from 'zustand';

export interface OrderTourDetailStoreData {
  additionalFormData: OrderTourDetailData;
  setAdditionalFormData: (data: OrderTourDetailData) => void;
}

export const useOrderTourDetailStore = create<OrderTourDetailStoreData>()((set) => ({
  additionalFormData: {
    tour_id: null,
    tour_name: '',
    tour_start: null,
    tour_end: null,
    count: null,
    price_id: null,
    price: null,
    total_price: null,
  },
  setAdditionalFormData: (data: OrderTourDetailData) =>
    set((state) => ({ additionalFormData: { ...state.additionalFormData, ...data } })),
}));
