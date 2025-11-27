// Типы для туров и форм бронирования

export type TourPriceOption = {
  value: string | number;
  label: string;
};

export type TourPrivateFormData = {
  date?: string | null;
  travellers: number;
  priceOption?: string | number | null;
  wishes: string;
  name: string;
  email: string;
  phone: string;
  recaptchaToken?: string;
};
