import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { adventuresAxiosInstance, authAdventuresAxiosInstance } from '@/utils/adventures/axios';
import type { Article, ArticlePayload } from '@/types/adventures';

import { PaginatedData } from '@/types/common';

export const useArticles = (params?: any): UseQueryResult<Article[], AxiosError> => {
  return useQuery<Article[], AxiosError>({
    queryKey: ['articles', params],
    queryFn: async () => {
      const response = await adventuresAxiosInstance.get<PaginatedData<Article>>('/articles', {
        params,
      });
      return response.data.data || [];
    },
  });
};

export const useArticle = (idOrSlug: string): UseQueryResult<Article, AxiosError> => {
  return useQuery<Article, AxiosError>({
    queryKey: ['articles', idOrSlug],
    queryFn: async () => {
      const response = await adventuresAxiosInstance.get<{ success: Boolean; data: Article }>(
        `/articles/${idOrSlug}`,
      );
      return response.data.data;
    },
    enabled: !!idOrSlug,
  });
};

export const useCreateArticle = (): UseMutationResult<Article, AxiosError, ArticlePayload> => {
  const queryClient = useQueryClient();
  return useMutation<Article, AxiosError, ArticlePayload>({
    mutationKey: ['articles', 'create'],
    mutationFn: async (article) => {
      try {
        const response = await authAdventuresAxiosInstance.post<Article>('/articles', article);
        return response.data;
      } catch (error: any) {
        console.error('Create Article Error:', error.response?.data);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

export const useUpdateArticle = (): UseMutationResult<
  Article,
  AxiosError,
  { id: string; data: ArticlePayload }
> => {
  const queryClient = useQueryClient();
  return useMutation<Article, AxiosError, { id: string; data: ArticlePayload }>({
    mutationKey: ['articles', 'update'],
    mutationFn: async ({ id, data }) => {
      const response = await authAdventuresAxiosInstance.patch<Article>(`/articles/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['articles', variables.id] });
    },
  });
};

export const useDeleteArticle = (): UseMutationResult<void, AxiosError, string> => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, string>({
    mutationKey: ['articles', 'delete'],
    mutationFn: async (id) => {
      await authAdventuresAxiosInstance.delete(`/articles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};
