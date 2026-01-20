import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { adventuresAxiosInstance, authAdventuresAxiosInstance } from '@/utils/adventures/axios';
import type { AdventureUser, LoginResponse } from '@/types/adventures';
import { useAdventuresAuthStore } from '@/store/adventures/useAdventuresAuthStore';

/**
 * Хук для входа в админку Adventures
 */
export const useAdventuresLogin = (): UseMutationResult<
  LoginResponse,
  AxiosError,
  { email: string; password: string }
> => {
  const { login } = useAdventuresAuthStore();
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, AxiosError, { email: string; password: string }>({
    mutationKey: ['adventures', 'login'],
    mutationFn: async (credentials) => {
      const response = await adventuresAxiosInstance.post<LoginResponse>(
        '/auth/signin',
        credentials,
      );
      return response.data;
    },
    onSuccess: (data) => {
      login(data.user, data.token);
      // Мгновенно обновляем кэш TanStack Query данными из ответа
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });
};

/**
 * Хук для регистрации в админке Adventures
 */
export const useAdventuresRegister = (): UseMutationResult<
  LoginResponse,
  AxiosError,
  { name: string; email: string; password: string; confirmPassword: string }
> => {
  const { login } = useAdventuresAuthStore();
  const queryClient = useQueryClient();

  return useMutation<
    LoginResponse,
    AxiosError,
    { name: string; email: string; password: string; confirmPassword: string }
  >({
    mutationKey: ['adventures', 'register'],
    mutationFn: async (data) => {
      const response = await adventuresAxiosInstance.post<LoginResponse>('/auth/signup', data);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.user, data.token);
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });
};

/**
 * Хук для получения данных текущего пользователя Adventures
 */
export const useAdventuresMe = (): UseQueryResult<AdventureUser, AxiosError> => {
  return useQuery<AdventureUser, AxiosError>({
    queryKey: ['adventures', 'me'],
    queryFn: async () => {
      const response = await authAdventuresAxiosInstance.get<AdventureUser>('/auth/me');
      return response.data;
    },
  });
};
