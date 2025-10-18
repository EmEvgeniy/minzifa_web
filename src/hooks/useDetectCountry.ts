import { useEffect, useState } from 'react';

export const useDetectCountry = () => {
  const [countryCode, setCountryCode] = useState<string>('uz');

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data?.country_code) {
          setCountryCode(data.country_code.toLowerCase());
        }
      } catch (error) {
        console.error('Ошибка получения страны по IP:', error);
      }
    };

    fetchCountry();
  }, []);

  return countryCode;
};
