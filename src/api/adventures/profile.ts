import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authAdventuresAxiosInstance } from '@/utils/adventures/axios';
import type { AdventureUser } from '@/types/adventures';

// Get current user profile
export function useCurrentUser(options?: {
  enabled?: boolean;
}): UseQueryResult<AdventureUser, AxiosError> {
  return useQuery<AdventureUser, AxiosError>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const response = await authAdventuresAxiosInstance.get<AdventureUser>('/auth/me');
      return response.data;
    },
    ...options,
  });
}

// Update user profile
interface UpdateProfileData {
  name?: string;
  email?: string;
  avatar?: string;
}

export function useUpdateProfile(): UseMutationResult<
  AdventureUser,
  AxiosError,
  UpdateProfileData
> {
  const queryClient = useQueryClient();

  return useMutation<AdventureUser, AxiosError, UpdateProfileData>({
    mutationKey: ['auth', 'update-profile'],
    mutationFn: async (data) => {
      const response = await authAdventuresAxiosInstance.patch<AdventureUser>('/auth/me', data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'me'], data);
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });
}

// Change password
interface ChangePasswordData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export function useChangePassword(): UseMutationResult<void, AxiosError, ChangePasswordData> {
  return useMutation<void, AxiosError, ChangePasswordData>({
    mutationKey: ['auth', 'change-password'],
    mutationFn: async (data) => {
      await authAdventuresAxiosInstance.post('/auth/change-password', data);
    },
  });
}
