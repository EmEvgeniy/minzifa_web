'use client';

import React, { FC, useId } from 'react';
import PhoneInput from 'react-phone-input-2';
import { cn } from '@/utils';
import { useDetectCountry } from '@/hooks/useDetectCountry';
import { FormFieldWrapper } from '../Form/FormFieldWrapper/FormFieldWraper';
import { PhoneInputCompProp } from './_types';
import './style.scss';

export const PhoneInputComp: FC<PhoneInputCompProp> =
  (
    {
      value,
      onChange,
      label,
      error,
      helperText,
      fullWidth = true,
      wrapperClassName,
      ...props
    }
  ) => {
    const countryCode = useDetectCountry();
    const id = useId();

    return (
      <FormFieldWrapper
        label={label}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        className={wrapperClassName}
        paddingLeft={'pl-10'}
      >
        <div
          className={cn(
            'relative flex items-center rounded-2xl border transition-all duration-200 bg-white',
            error
              ? 'border-red-500 focus-within:ring-red-200'
              : 'border-gray-300 hover:border-gray-400 focus-within:border-[#27A430] focus-within:ring-2 focus-within:ring-[#27A430]/20',
            'disabled:bg-gray-50 disabled:cursor-not-allowed',
          )}
        >
          <PhoneInput
            country={countryCode}
            value={value}
            onChange={onChange}
            inputProps={{
              id,
              required: true,
              autoFocus: false,
              'aria-invalid': !!error,
              'aria-describedby': helperText ? `${id}-helper` : undefined,
            }}
            inputClass={cn(
              label && 'with-label',
              props.inputClass
            )}
            buttonClass={label && 'with-label'}
            {...props}
          />
        </div>
      </FormFieldWrapper>
    );
  };

PhoneInputComp.displayName = 'PhoneInputComp';
