import { PaginatedData } from '@/types/common';
import { AdventureUser, UserQueryParams } from '@/types/adventures';
import { authAdventuresAxiosInstance } from '@/utils/adventures/axios';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

/**
 * Хук для создания нового пользователя
 */
export const useCreateAdventuresUser = (): UseMutationResult<
  AdventureUser,
  AxiosError,
  Partial<AdventureUser>
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await authAdventuresAxiosInstance.post<AdventureUser>('/users', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adventures', 'users'] });
    },
  });
};

/**
 * Хук для получения списка всех пользователей (только для ADMIN)
 */
export const useAdventuresUsers = (
  params?: UserQueryParams,
): UseQueryResult<AdventureUser[], AxiosError> => {
  return useQuery<AdventureUser[], AxiosError>({
    queryKey: ['adventures', 'users', params],
    queryFn: async () => {
      const response = await authAdventuresAxiosInstance.get<PaginatedData<AdventureUser>>(
        '/users',
        {
          params,
        },
      );
      const data = response.data;
      return Array.isArray(data) ? data : data?.data || [];
    },
  });
};

/**
 * Хук для получения одного пользователя по ID
 */
export const useAdventuresUser = (
  id: string | number,
): UseQueryResult<AdventureUser, AxiosError> => {
  return useQuery<AdventureUser, AxiosError>({
    queryKey: ['adventures', 'users', id],
    queryFn: async () => {
      const response = await authAdventuresAxiosInstance.get<AdventureUser>(`/users/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

/**
 * Хук для обновления пользователя
 */
export const useUpdateAdventuresUser = (): UseMutationResult<
  AdventureUser,
  AxiosError,
  { id: string | number; data: Partial<AdventureUser> }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await authAdventuresAxiosInstance.patch<AdventureUser>(`/users/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adventures', 'users'] });
    },
  });
};

/**
 * Хук для удаления пользователя
 */
export const useDeleteAdventuresUser = (): UseMutationResult<void, AxiosError, string | number> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await authAdventuresAxiosInstance.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adventures', 'users'] });
    },
  });
};
