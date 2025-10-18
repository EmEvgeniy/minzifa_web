import { GroupPrice, Tour } from '../_types';
import { date_end, formatted_date } from '@/utils/utils';

export interface BookingData {
  passengers: [];
  tour_name: string;
  tour_start: string;
  tour_end: string;
  travellers_count: number;
  tour_price: number;
  deposit: number;
  total_price: number;
  payment_type: string;
  payment_status: string;
  single_price: number;
  currency: string;
  total_seats: number;
}

export interface BookingParams {
  tour_name: string;
  tour_start: string;
  tour_end: string;
  travellers_count: string;
  tour_price: string;
  deposit: string;
  total_price: string;
  payment_type: string;
  payment_status: string;
  single_price: string;
  currency: string;
  total_seats: string;
}

/**
 * Формирует данные для бронирования тура
 */
export const createBookingData = (
  tour: Tour,
  selectedPrice: GroupPrice,
  totalPrice: number,
  travellers: number,
  locale: string,
): BookingData => {
  return {
    passengers: [],
    tour_name: tour.name,
    tour_start: formatted_date(selectedPrice.date_start, locale),
    tour_end: date_end(selectedPrice.date_start, locale, tour.days || tour?.itineraries.length),
    travellers_count: travellers,
    tour_price: selectedPrice.price_for_double,
    deposit: totalPrice * 0.15,
    total_price: totalPrice,
    payment_type: 'cash',
    payment_status: 'pending',
    single_price: selectedPrice.price_for_single,
    currency: tour.prices.valute,
    total_seats: selectedPrice.tour_total_seats,
  };
};

/**
 * Создает URL параметры для страницы бронирования
 */
export const createBookingParams = (
  tour: Tour,
  selectedPrice: GroupPrice,
  totalPrice: number,
  travellers: number,
  locale: string,
): URLSearchParams => {
  return new URLSearchParams({
    tour_name: tour.name,
    tour_start: formatted_date(selectedPrice.date_start, locale),
    tour_end: date_end(selectedPrice.date_start, locale, tour.days || tour?.itineraries.length),
    travellers_count: travellers.toString(),
    tour_price: selectedPrice.price_for_double.toString(),
    deposit: (totalPrice * 0.15).toString(),
    total_price: totalPrice.toString(),
    payment_type: 'cash',
    payment_status: 'pending',
    single_price: selectedPrice.price_for_single.toString(),
    currency: tour.prices.valute,
    total_seats: selectedPrice.tour_total_seats.toString(),
  });
};

/**
 * Создает опции цен для приватного тура
 */
export const createPrivateTourPriceOptions = (
  prices: GroupPrice[],
  locale: string,
  currency: string = 'USD',
): Array<{ value: number; label: string }> => {
  return (prices || []).map((p) => ({
    value: p.price_for_double,
    label: `${formatted_date(p.date_start, locale)} — ${currency} ${p.price_for_double}`,
  }));
};

/**
 * Создает опции комфорта для индивидуального тура
 */
export const createComfortOptions = (tour: Tour): Array<{ value: number; label: string }> => {
  return [
    tour?.prices?.price_for_3_hotels,
    tour?.prices?.price_for_4_hotels,
    tour?.prices?.price_for_5_hotels,
  ]
    .filter((v) => typeof v === 'number')
    .map((v) => ({ value: v as number, label: `${tour?.prices?.valute || 'USD'} ${v}` }));
};
