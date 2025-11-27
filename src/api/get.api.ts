import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { getApiUrl } from '@/utils/config';
import { PaginatedData } from '@/types';
import axiosInstance from '@/utils/axios';

type GetQueryType = {
  key: string[];
  page?: string;
  perPage?: string;
  url?: string;
  searchItem?: string;
  additionalParam?: string;
  withLocale?: boolean;
};

export const useGetQuery = <T = unknown>({
  key,
  page,
  perPage,
  url,
  searchItem,
  additionalParam,
  withLocale = true,
}: GetQueryType) => {
  const lang = useLocale();

  return useQuery<T>({
    queryKey: [...key, page, perPage, searchItem, additionalParam, withLocale ? lang : null],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (withLocale) {
        params.append('locale', lang);
      }

      if (searchItem) params.append('name', searchItem);

      if (page && perPage) {
        params.append('page', page);
        params.append('perPage', perPage);
      }

      const endpoint = url?.startsWith('/') ? url.slice(1) : url;

      const extra = additionalParam
        ? additionalParam.startsWith('&')
          ? additionalParam
          : `&${additionalParam}`
        : '';

      const finalUrl = `${getApiUrl(endpoint)}?${params.toString()}${extra}`;
      const response = await axiosInstance.get(finalUrl);

      return response.data;
    },
  });
};

type GetInfiniteQueryType = {
  key: string[];
  url: string;
  perPage?: string;
  searchItem?: string;
  additionalParam?: string;
  withLocale?: boolean;
};

export const useGetInfiniteQuery = <T = unknown>({
  key,
  url,
  perPage = '12',
  searchItem = '',
  additionalParam = '',
  withLocale = true,
}: GetInfiniteQueryType) => {
  const lang = useLocale();

  const queryKey = [...key, perPage, searchItem, additionalParam];
  if (withLocale) {
    queryKey.push(lang); // <--- теперь всегда string
  }

  return useInfiniteQuery<
    PaginatedData<T>,
    Error,
    InfiniteData<PaginatedData<T>>,
    string[],
    number
  >({
    queryKey,
    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();

      if (withLocale) {
        params.append('locale', lang);
      }

      if (searchItem) params.append('name', searchItem);

      params.append('page', pageParam.toString());
      params.append('perPage', perPage);

      const endpoint = url.startsWith('/') ? url.slice(1) : url;

      const extra = additionalParam
        ? additionalParam.startsWith('&')
          ? additionalParam
          : `&${additionalParam}`
        : '';

      const finalUrl = `${getApiUrl(endpoint)}?${params.toString()}${extra}`;
      const response = await axiosInstance.get(finalUrl);

      return response.data;
    },

    getNextPageParam: (lastPage) => {
      const meta = lastPage?.meta;
      if (!meta) return undefined;

      return meta.current_page < meta.last_page ? meta.current_page + 1 : undefined;
    },
  });
};

export const getCsrfToken = async () => await axiosInstance.get('/csrf-cookie');
