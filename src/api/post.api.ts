import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { getApiUrl } from '@/utils/config';

// Обобщённые типы
interface MutationParams<T> {
  obj: T;
  endpoint: string;
}

export function usePostMutation<
  TData = unknown,
  TVariables = Record<string, unknown>,
  TError = AxiosError,
>(
  key: (string | number)[],
  onSuccessCallback?: (data: TData) => void,
  onErrorCallback?: (error: TError) => void,
): UseMutationResult<TData, TError, MutationParams<TVariables>> {
  return useMutation<TData, TError, MutationParams<TVariables>>({
    mutationKey: [...key],
    mutationFn: async ({ obj, endpoint }) => {
      // Используем только endpoint, getApiUrl() добавит базовый URL из переменной окружения
      const response = await axios.post<TData>(getApiUrl(endpoint), {
        ...obj,
      });
      return response.data;
    },
    onSuccess: (data) => {
      onSuccessCallback?.(data);
    },
    onError: (error) => {
      onErrorCallback?.(error);
    },
  });
}
