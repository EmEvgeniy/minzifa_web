'use client';
import React, { FC, useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { PhoneInputCompProp } from './_types';

export const PhoneInputComp: FC<PhoneInputCompProp> = ({ value, onChange }) => {
  const [countryCode, setCountryCode] = useState<string>('uz'); // fallback

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

  return (
    <PhoneInput
      containerClass="!rounded-[16px] !border-1 !border-gray-300 !py-[9px] !bg-white text-[16px]"
      inputClass="!w-full !rounded-[16px] !border-none"
      buttonClass="!rounded-tl-[16px] !rounded-bl-[16px]"
      country={countryCode}
      value={value}
      onChange={onChange}
    />
  );
};
