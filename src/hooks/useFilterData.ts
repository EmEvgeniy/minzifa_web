import { useGetQuery } from '@/api/get.api';
import {
  DestinationDataResponse,
  TourTypeDataResponse,
} from '@/components/Tours/MainSection/_types';

interface UseFilterDataProps {
  locale: string;
}

export function useFilterData({ locale }: UseFilterDataProps) {
  const {
    data: tourTypesData,
    isLoading: tourTypesLoading,
    error: tourTypesError,
  } = useGetQuery<TourTypeDataResponse>({
    key: ['tour-types', locale],
    page: '',
    perPage: '',
    url: 'types',
    searchItem: '',
    additionalParam: `all=1`,
  });

  const {
    data: destinationsData,
    isLoading: destinationsLoading,
    error: destinationsError,
  } = useGetQuery<DestinationDataResponse>({
    key: ['destinations', locale],
    page: '',
    perPage: '',
    url: 'destinations',
    searchItem: '',
    additionalParam: `all=1`,
  });

  return {
    tourTypesData,
    destinationsData,
    loading: tourTypesLoading || destinationsLoading,
    error: tourTypesError || destinationsError,
  };
}
