import { BookingFormType } from '@/validation/bookingFormSchema';

export type RoomType = 'standart' | 'single';

export type RoomTypes = {
  [key in RoomType]: number;
};

export type BookingFormDataResponse = {
  id: number;
  form_name: string;
  form_data: BookingFormType;
};
