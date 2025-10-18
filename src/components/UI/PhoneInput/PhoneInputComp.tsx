'use client';

import React, { FC } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FieldError } from 'react-hook-form';
import { cn } from '@/utils';
import { useDetectCountry } from '@/hooks/useDetectCountry';
import { PhoneInputCompProp } from './_types';
import { FormFieldWrapper } from '../Form/FormFieldWrapper/FormFieldWraper';

interface Props extends PhoneInputCompProp {
  label?: string;
  error?: FieldError;
  helperText?: string;
  fullWidth?: boolean;
}

export const PhoneInputComp: FC<Props> = ({
  value,
  onChange,
  label,
  error,
  helperText,
  fullWidth = true,
}) => {
  const countryCode = useDetectCountry();
  const paddingLeftForLabel = 'pl-16';

  return (
    <FormFieldWrapper
      label={label}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      paddingLeft={paddingLeftForLabel}
    >
      <div
        className={cn(
          'relative flex rounded-xl border transition-all duration-200 bg-white',
          error
            ? 'border-red-500 focus-within:ring-red-200'
            : 'border-gray-300 hover:border-gray-400 focus-within:border-[#27A430] focus-within:ring-2 focus-within:ring-[#27A430]/20',
        )}
      >
        <div className={cn(
          "flex flex-col w-full",
          label ? "px-3 py-3 pt-6" : "px-3 py-2",
        )}>
          <PhoneInput
            country={countryCode}
            value={value}
            onChange={onChange}
            specialLabel=""
            inputProps={{
              required: true,
              autoFocus: false,
            }}
            containerClass="!w-full !m-0"
            buttonClass="!rounded-tl-[12px] !rounded-bl-[12px] !border-none !bg-transparent"
            inputClass={cn(
              '!w-full !bg-transparent !text-base !text-gray-900 !border-none !outline-none !shadow-none',
            )}
            dropdownClass="!rounded-xl !border !border-gray-200 !shadow-lg"
          />
        </div>
      </div>
    </FormFieldWrapper>
  );
};
