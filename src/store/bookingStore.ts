import { Tour } from '@/components/Tour/_types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Passenger = {
  salutation?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  birth_date?: {
    month: string;
    day: string;
    year: string;
  };
  gender?: string;
  main_address?: {
    address?: string;
    address2?: string;
    state?: string;
    province?: string;
    towm?: string;
    postal_code?: string;
  };
};

export type BookingTourData = {
  tour_name?: string;
  tour_start?: string;
  tour_end?: string;
  travellers_count?: number | string;
  tour_price?: number | string;
  deposit?: number | string;
  total_price?: number | string;
  payment_type?: string;
  payment_status?: string;
  passengers?: Passenger[];
  room_types?: Partial<{
    twin: number;
    double: number;
    single: number;
  }>;
  single_price?: number | string;
  currency?: string;
  total_seats?: number;
};

export type BookingStoreData = {
  tour: Tour | undefined;
  bookingData: BookingTourData;
  sendStatus: boolean;
  setTour: (tour: Tour | undefined) => void;
  setBookingData: (data: BookingTourData) => void;
  setSendData: (val: boolean) => void;
};

export const useBookingStore = create<BookingStoreData>()(
  persist(
    (set) => ({
      tour: undefined,
      bookingData: {
        travellers_count: 1,
        passengers: [],
        room_types: {},
      },
      selectedPrice: undefined,
      sendStatus: true,
      setTour: (tour: Tour | undefined) => set({ tour: tour }),
      setSendData: (val) => set({ sendStatus: val }),
      setBookingData: (data) =>
        set((state) => ({
          bookingData: {
            ...state.bookingData,
            ...data,
          },
        })),
    }),
    {
      name: 'booking-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
