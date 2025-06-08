import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Объединяет классы и разрешает конфликты Tailwind-классов
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
