'use client';
import React, { FC } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { PhoneInputCompProp } from './_types';

export const PhoneInputComp: FC<PhoneInputCompProp> = ({ value, onChange }) => {
  return (
    <PhoneInput
      containerClass="!rounded-[16px] !border-1 !border-gray-300 !py-[9px] !bg-white text-[16px]"
      inputClass="!w-full !rounded-[16px] !border-none"
      buttonClass="!rounded-tl-[16px] !rounded-bl-[16px]"
      country={'uz'}
      value={value}
      onChange={onChange}
    />
  );
};
