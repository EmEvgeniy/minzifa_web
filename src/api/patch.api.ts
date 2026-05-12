import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { FetchError } from 'ofetch';
import { getApiUrl } from '@/utils/config';
import { api, authApi } from '@/utils/http';

interface MutationParams<T> {
  obj: T;
  endpoint: string;
}

export function usePatchMutation<
  TData = unknown,
  TVariables = Record<string, unknown>,
  TError = FetchError,
>(
  key: (string | number)[],
  onSuccessCallback?: (data: TData) => void,
  onErrorCallback?: (error: TError) => void,
): UseMutationResult<TData, TError, MutationParams<TVariables>> {
  return useMutation<TData, TError, MutationParams<TVariables>>({
    mutationKey: [...key],
    mutationFn: async ({ obj, endpoint }) => {
      const url = getApiUrl(endpoint);
      return api<TData>(url, { method: 'PATCH', body: obj as Record<string, unknown> });
    },
    onSuccess: (data) => {
      onSuccessCallback?.(data);
    },
    onError: (error) => {
      onErrorCallback?.(error);
    },
  });
}

export function useAuthPatchMutation<
  TData = unknown,
  TVariables = Record<string, unknown>,
  TError = FetchError,
>(
  key: (string | number)[],
  onSuccessCallback?: (data: TData) => void,
  onErrorCallback?: (error: TError) => void,
): UseMutationResult<TData, TError, MutationParams<TVariables>> {
  return useMutation<TData, TError, MutationParams<TVariables>>({
    mutationKey: [...key],
    mutationFn: async ({ obj, endpoint }) => {
      return authApi<TData>(endpoint, { method: 'PATCH', body: obj as Record<string, unknown> });
    },
    onSuccess: (data) => {
      onSuccessCallback?.(data);
    },
    onError: (error) => {
      onErrorCallback?.(error);
    },
  });
}
