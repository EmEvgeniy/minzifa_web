import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

// Обобщённые типы
interface MutationParams<T> {
  obj: T;
  http: string;
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
    mutationFn: async ({ obj, http }) => {
      const response = await axios.post<TData>(`https://api.minzifatravel.com/api/v1/${http}`, {
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
