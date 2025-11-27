import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getApiUrl } from '@/utils/config';
import axiosInstance from '@/utils/axios';

interface MutationParams<T> {
  obj: T;
  endpoint: string;
}

export function usePatchMutation<
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
      const url = getApiUrl(endpoint);
      try {
        const response = await axiosInstance.patch<TData>(url, {
          ...obj,
        });
        return response.data;
      } catch (error) {
        console.error('Patch request failed:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      onSuccessCallback?.(data);
    },
    onError: (error) => {
      onErrorCallback?.(error);
    },
  });
}
