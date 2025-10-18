'use client';

import { useState, useRef } from 'react';
import { useGetQuery } from '@/api/get.api';

interface UsePaginationOptions {
  key: (string | number | Record<string, unknown>)[];
  url: string;
  perPage?: string;
  searchItem?: string;
  additionalParam?: string;
  initialPage?: number;
}

interface PaginationMeta {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface UsePaginationReturn<T> {
  data: T[] | undefined;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  from: number;
  to: number;
  goToPage: (page: number) => void;
}

export function usePagination<T = unknown>({
  key,
  url,
  perPage = '10',
  searchItem = '',
  additionalParam = '',
  initialPage = 1,
}: UsePaginationOptions): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const sectionRef = useRef<HTMLElement>(null);

  // Используем useGetQuery для получения данных
  const { data: response, isLoading } = useGetQuery<{
    data: T[];
    meta?: PaginationMeta;
  }>({
    key: [...key.map((k) => String(k)), currentPage.toString()],
    page: currentPage.toString(),
    perPage,
    url,
    searchItem,
    additionalParam,
  });

  // Извлекаем данные и метаданные из ответа
  const data = response?.data;
  const meta = response?.meta;
  const totalPages = meta?.last_page || 1;
  const totalItems = meta?.total || 0;
  const from = meta?.from || 0;
  const to = meta?.to || 0;

  // Функция навигации пагинации
  const goToPage = (page: number) => {
    // Прокручиваем к началу секции при клике на любую кнопку пагинации
    if (sectionRef.current) {
      const element = sectionRef.current;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 150;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    // Меняем страницу только если это возможно
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    data,
    isLoading,
    currentPage,
    totalPages,
    totalItems,
    from,
    to,
    goToPage,
  };
}
