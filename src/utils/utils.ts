import { clsx, type ClassValue } from 'clsx';
import { addDays, format } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { ru, enGB } from 'date-fns/locale';

// Объединяет классы и разрешает конфликты Tailwind-классов
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export function date_end(
  date_start: string,
  locale: string,
  days: number | undefined,
  formatType: string = 'MMM d, yyyy',
) {
  if (!days) return '';
  const startDate = new Date(date_start);
  const endDate = addDays(startDate, days);
  return format(endDate, formatType, { locale: locale === 'ru' ? ru : enGB });
}

export function formatted_date(date: string, locale: string, formatType: string = 'MMM d, yyyy') {
  if (date === '') return '';
  const startDate = new Date(date);
  return format(startDate, formatType, { locale: locale === 'ru' ? ru : enGB });
}

export function calculateReadingTime(text: string, averageReadingSpeed: number = 1500) {
  const textLength = text.length;
  const minutes = (textLength / averageReadingSpeed) * 0.2;
  return Math.ceil(minutes);
}

export const makeMultiParam = (key: string, values: (string | number)[]) =>
  values.length ? values.map((val) => `${key}[]=${val}`) : [];

export const calculateEndDate = (startDate: Date, days: number) => {
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + days);
  return endDate;
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'awaiting_confirmation':
      return 'bg-yellow-100 text-yellow-800';
    case 'awaiting_payment':
      return 'bg-orange-100 text-orange-800';
    case 'payment_confirmed':
      return 'bg-blue-100 text-blue-800';
    case 'tour_conducted':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
