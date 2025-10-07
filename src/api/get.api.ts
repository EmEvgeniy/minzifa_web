import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useLocale } from 'next-intl';
import { getApiUrl } from '@/utils/config';

type GetQueryType = {
  key: string[];
  page: string;
  perPage: string;
  url: string;
  searchItem: string;
  additionalParam: string;
};

export const useGetQuery = <T = unknown>({
  key,
  page,
  perPage,
  url,
  searchItem,
  additionalParam,
}: GetQueryType) => {
  const lang = useLocale();

  return useQuery<T>({
    queryKey: [...key, page, perPage, searchItem, additionalParam, lang],
    queryFn: async () => {
      const params = new URLSearchParams({ locale: lang });
      if (searchItem) params.append('name', searchItem);
      if (page && perPage) {
        params.append('page', page);
        params.append('perPage', perPage);
      }

      // Используем только endpoint, getApiUrl() добавит базовый URL из переменной окружения
      const endpoint = url.startsWith('/') ? url.slice(1) : url;
      const extra = additionalParam
        ? additionalParam.startsWith('&')
          ? additionalParam
          : `&${additionalParam}`
        : '';
      const response = await axios.get(`${getApiUrl(endpoint)}?${params.toString()}${extra}`);
      return response.data;
    },
  });
};
