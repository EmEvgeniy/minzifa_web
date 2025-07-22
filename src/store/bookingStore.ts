import { Tour } from '@/components/Tour/_types';
import { create } from 'zustand';

export type RoomType = ('standart' | 'single');

export type RoomTypes = {
  [key in RoomType]: number;
};

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
  room_types?: RoomTypes;
  single_price?: number | string;
  currency?: string;
  total_seats?: number;
};

export type BookingStoreData = {
  tour: Tour | undefined;
  bookingData: BookingTourData;
  sendStatus: boolean;
  selectedPrice?: number | string;
  setTour: (tour: Tour | undefined) => void;
  setBookingData: (data: BookingTourData) => void;
  setSendData: (val: boolean) => void;
  updatePassengerField: (index: number, path: string, value: string) => void;
};

export const useBookingStore = create<BookingStoreData>()(
  (set) => ({
    tour: undefined,
    bookingData: {
      travellers_count: 1,
      passengers: [],
      room_types: {
        standart: 1,
        single: 0,
      },
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
    updatePassengerField: (index: number, path: string, value: string) => {
      const keys = path.split('.');

      set((state) => {
        const newPassengers = [...(state?.bookingData?.passengers || [])];
        const passenger = { ...newPassengers[index] };

        let current: Record<string, unknown> = passenger;

        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];

          current[key] = current[key] || {};
          current = current[key] as Record<string, unknown>;
        }

        current[keys[keys.length - 1]] = value;

        newPassengers[index] = passenger;

        return {
          ...state,
          bookingData: {
            ...state.bookingData,
            passengers: newPassengers,
          },
        };
      });
    },
  }),
);
