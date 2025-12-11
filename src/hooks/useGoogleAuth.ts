import { useState } from 'react';
import { authAxiosInstance } from '@/utils/axios';
import { ITourist } from '@/types';

interface GoogleAuthResponse {
  success: boolean;
  auth_url?: string;
  message?: string;
}

export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 1. Получить URL для авторизации
      const { data } = await authAxiosInstance.get<GoogleAuthResponse>('/auth/google/url');

      if (!data.success || !data.auth_url) {
        throw new Error('Не удалось получить URL авторизации');
      }

      // 2. Открыть popup окно для авторизации
      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        data.auth_url,
        'Google Login',
        `width=${width},height=${height},left=${left},top=${top}`,
      );

      if (!popup) {
        throw new Error('Не удалось открыть окно авторизации');
      }

      // 3. Слушать сообщения от popup окна
      return new Promise<ITourist>((resolve, reject) => {
        let checkClosedInterval: NodeJS.Timeout;

        const cleanup = () => {
          if (checkClosedInterval) clearInterval(checkClosedInterval);
          window.removeEventListener('message', handleMessage);
        };

        const handleMessage = (event: MessageEvent) => {
          if (event.origin !== window.location.origin) {
            return;
          }

          if (event.data.type === 'google-auth-success') {
            cleanup();
            popup?.close();
            setIsLoading(false);
            resolve(event.data.user);
          } else if (event.data.type === 'google-auth-error') {
            cleanup();
            popup?.close();
            setIsLoading(false);
            const errorMsg = event.data.error || 'Ошибка авторизации';
            setError(errorMsg);
            reject(new Error(errorMsg));
          }
        };

        window.addEventListener('message', handleMessage);

        checkClosedInterval = setInterval(() => {
          if (popup?.closed) {
            cleanup();
            setIsLoading(false);
            setError('Авторизация отменена');
            reject(new Error('Авторизация отменена'));
          }
        }, 500);
      });
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'Ошибка авторизации';
      setError(errorMessage);
      throw err;
    }
  };

  return {
    handleGoogleLogin,
    isLoading,
    error,
  };
}
