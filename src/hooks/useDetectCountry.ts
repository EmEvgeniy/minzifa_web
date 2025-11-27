import { useEffect, useState } from 'react';

export const useDetectCountry = () => {
  const [countryCode, setCountryCode] = useState<string>('uz');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedCountry = localStorage.getItem('country_code');
    if (savedCountry) {
      setCountryCode(savedCountry);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error('Ошибка запроса: ' + res.status);
        const data = await res.json();
        if (data?.country_code) {
          const code = data.country_code.toLowerCase();
          setCountryCode(code);
          localStorage.setItem('country_code', code);
        }
      })
      .catch((err) => {
        console.warn('Не удалось определить страну:', err.message);
      })
      .finally(() => clearTimeout(timeout));

    return () => controller.abort();
  }, []);

  return countryCode;
};
