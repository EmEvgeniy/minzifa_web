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

export const makeMultiParam = (key: string, values: (string | number)[]) => values.length ? values.map(val => `${key}[]=${val}`) : [];