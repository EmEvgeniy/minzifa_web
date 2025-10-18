import { useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetQuery } from '@/api/get.api';
import { ToursResponse } from '@/components/Tours/MainSection/_types';
import { useFilterStore } from '@/store';

interface UseToursViewProps {
  locale: string;
  perPage?: number;
  destination?: string;
}

interface UseToursViewReturn {
  tours: ToursResponse | null;
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  ref: React.RefObject<HTMLDivElement | null>;
}

export function useToursView({
  locale,
  perPage = 8,
  destination,
}: UseToursViewProps): UseToursViewReturn {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const queryString = useFilterStore((state) => state.buildFilterQuery());

  const page = Number(searchParams.get('page')) || 1;

  const additionalParams = [
    `limit=${perPage}`,
    `perPage=${perPage}`,
    `locale=${locale}`,
    queryString ? `&${queryString}` : '',
    destination ? `&destinations[]=${destination}` : '',
  ]
    .filter(Boolean)
    .join('&');

  const { data: toursData, isLoading } = useGetQuery<ToursResponse>({
    key: ['tours', page.toString(), perPage.toString(), locale, destination || '', queryString],
    page: page.toString(),
    perPage: perPage.toString(),
    url: 'tours',
    searchItem: '',
    additionalParam: additionalParams,
  });

  const totalPages = toursData?.meta?.last_page || 1;

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', value.toString());
    router.replace(`?${params.toString()}`, { scroll: false });

    if (ref.current) {
      const topOffset = ref.current.getBoundingClientRect().top + window.scrollY - 200;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return {
    tours: toursData ?? null,
    isLoading,
    totalPages,
    currentPage: page,
    handlePageChange,
    ref,
  };
}
