import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authAdventuresAxiosInstance } from '@/utils/adventures/axios';

import type { Category } from '@/types/adventures';

import { PaginatedData } from '@/types/common';

export const useCategories = (locale?: string): UseQueryResult<Category[], AxiosError> => {
  return useQuery<Category[], AxiosError>({
    queryKey: ['categories', { locale }],
    queryFn: async () => {
      const response = await authAdventuresAxiosInstance.get<PaginatedData<Category> | Category[]>(
        '/categories',
        { params: { locale } },
      );
      const result = response.data;
      const data = Array.isArray(result) ? result : result?.data || [];

      // Принудительная фильтрация по языку на фронтенде (fallback)
      if (locale) {
        return data.filter((c) => c.lang === locale);
      }
      return data;
    },
  });
};

export const useCategory = (id: string): UseQueryResult<Category, AxiosError> => {
  return useQuery<Category, AxiosError>({
    queryKey: ['categories', id],
    queryFn: async () => {
      const response = await authAdventuresAxiosInstance.get<Category>(`/categories/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateCategory = (): UseMutationResult<Category, AxiosError, Partial<Category>> => {
  const queryClient = useQueryClient();
  return useMutation<Category, AxiosError, Partial<Category>>({
    mutationKey: ['categories', 'create'],
    mutationFn: async (category) => {
      const response = await authAdventuresAxiosInstance.post<Category>('/categories', category);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdateCategory = (): UseMutationResult<
  Category,
  AxiosError,
  { id: number | undefined; data: Partial<Category> }
> => {
  const queryClient = useQueryClient();
  return useMutation<Category, AxiosError, { id: number | undefined; data: Partial<Category> }>({
    mutationKey: ['categories', 'update'],
    mutationFn: async ({ id, data }) => {
      const response = await authAdventuresAxiosInstance.patch<Category>(`/categories/${id}`, data);
      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['categories', id] });
    },
  });
};

export const useDeleteCategory = (): UseMutationResult<void, AxiosError, string> => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, string>({
    mutationKey: ['categories', 'delete'],
    mutationFn: async (id) => {
      await authAdventuresAxiosInstance.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
