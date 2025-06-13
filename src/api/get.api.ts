import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useLocale } from 'next-intl';

type GetQueryType = {
  key: string[];
  page: string;
  perPage: string;
  url: string;
  searchItem: string;
  additionalParam: string;
};

export const useGetQuery = <T>({
  key,
  page,
  perPage,
  url,
  searchItem,
  additionalParam,
}: GetQueryType) => {
  const lang = useLocale();

  return useQuery<T>({
    queryKey: [...key, page, perPage, searchItem, lang],
    queryFn: async () => {
      const params = new URLSearchParams({ locale: lang });
      if (searchItem) params.append('name', searchItem);
      if (page && perPage) {
        params.append('page', page);
        params.append('perPage', perPage);
      }
      const response = await axios.get(
        `https://api.minzifatravel.com/api/v1/${url}?${params.toString()}${additionalParam ? additionalParam : ''
        }`,
      );
      return response.data;
    },
  });
};
