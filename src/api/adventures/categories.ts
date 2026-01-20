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

export const useCategories = (): UseQueryResult<Category[], AxiosError> => {
  return useQuery<Category[], AxiosError>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await authAdventuresAxiosInstance.get<PaginatedData<Category> | Category[]>(
        '/categories',
      );
      const result = response.data;
      if (Array.isArray(result)) return result;
      return result?.data || [];
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
  { id: string; data: Partial<Category> }
> => {
  const queryClient = useQueryClient();
  return useMutation<Category, AxiosError, { id: string; data: Partial<Category> }>({
    mutationKey: ['categories', 'update'],
    mutationFn: async ({ id, data }) => {
      const response = await authAdventuresAxiosInstance.patch<Category>(`/categories/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
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
