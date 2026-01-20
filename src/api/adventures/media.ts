import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authAdventuresAxiosInstance } from '@/utils/adventures/axios';
import type { MediaUploadResponse } from '@/types/adventures';

export function useMediaUpload(): UseMutationResult<MediaUploadResponse, AxiosError, File[]> {
  return useMutation<MediaUploadResponse, AxiosError, File[]>({
    mutationKey: ['media', 'upload'],
    mutationFn: async (files: File[]) => {
      const endpoint = files.length > 1 ? '/files/uploads' : '/files/upload';
      const fieldName = files.length > 1 ? 'files' : 'file';

      const formData = new FormData();
      if (files.length > 1) {
        files.forEach((file) => {
          formData.append('files', file);
        });
      } else {
        formData.append('file', files[0]);
      }

      const response = await authAdventuresAxiosInstance.post<MediaUploadResponse>(
        endpoint,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    },
  });
}
