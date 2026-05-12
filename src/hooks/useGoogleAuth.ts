import { ITourist } from '@/types';
import { authApi } from '@/utils/http';
import { useState } from 'react';

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

      const data = await authApi<GoogleAuthResponse>('/auth/google/url');

      if (!data.success || !data.auth_url) {
        throw new Error('Не удалось получить URL авторизации');
      }

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

      return new Promise<ITourist>((resolve, reject) => {
        const handleMessage = async (event: MessageEvent) => {
          if (event.origin !== window.location.origin) return;

          if (event.data.type === 'google-auth-success') {
            stopWatching();
            popup?.close();

            try {
              const user = await authApi<ITourist>('/auth/me');
              setIsLoading(false);
              resolve(user);
            } catch (err) {
              console.log(err);
              setIsLoading(false);
              reject(new Error('Failed to fetch user data'));
            }
          } else if (event.data.type === 'google-auth-error') {
            stopWatching();
            popup?.close();
            setIsLoading(false);
            const errorMsg = event.data.error || 'Ошибка авторизации';
            setError(errorMsg);
            reject(new Error(errorMsg));
          }
        };

        window.addEventListener('message', handleMessage);

        const checkClosedInterval = setInterval(() => {
          if (popup?.closed) {
            stopWatching();
            setIsLoading(false);
            setError('Авторизация отменена');
            reject(new Error('Авторизация отменена'));
          }
        }, 500);

        function stopWatching() {
          clearInterval(checkClosedInterval);
          window.removeEventListener('message', handleMessage);
        }
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
