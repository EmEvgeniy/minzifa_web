import { useState } from 'react';
import { useGoogleReCaptcha } from '@google-recaptcha/react';

export const useRecaptcha = () => {
  const { executeV3 } = useGoogleReCaptcha();
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string>('');
  const isReady = !!executeV3;

  const getToken = async (action: string): Promise<void> => {
    setError(null);
    try {
      if (!executeV3) {
        throw new Error('ReCAPTCHA not ready');
      }
      const token = await executeV3(action);
      setToken(token);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    }
  };

  return { isReady, getToken, error, token };
};
