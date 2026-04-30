'use client';

import React, { forwardRef } from 'react';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import { ru, enGB } from 'date-fns/locale';
import './CustomDatepicker.scss';
import { cn } from '@/utils';
import { FormFieldWrapper } from '../Form/FormFieldWrapper/FormFieldWraper';

type Props = {
  locale: string;
  label?: string;
  icon?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  wrapperClassName?: string;
} & DatePickerProps;

export const CustomDatepicker = forwardRef<DatePicker, Props>(
  (
    {
      locale,
      label,
      icon,
      error,
      helperText,
      startIcon,
      endIcon,
      fullWidth = true,
      wrapperClassName,
      id,
      ...rest
    },
    ref,
  ) => {
    const inputId = id
      ?? (label
        ? `datepicker-${label.toLowerCase().replace(/\s+/g, '-')}`
        : `datepicker`
      );

    const paddingLeftForLabel = startIcon ? 'pl-10' : 'pl-3';

    return (
      <FormFieldWrapper
        label={label}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        paddingLeft={paddingLeftForLabel}
        className={wrapperClassName}
      >
        <div
          className={cn(
            'relative flex items-center rounded-2xl transition-all duration-200 bg-white',
            error
              ? 'border-red-500 focus-within:ring-red-200'
              : 'border-gray-300 hover:border-gray-400 focus-within:border-[#27A430] focus-within:ring-2 focus-within:ring-[#27A430]/20',
            'disabled:bg-gray-50 disabled:cursor-not-allowed',
          )}
        >
          {startIcon && (
            <div className="absolute left-4 text-gray-400 pointer-events-none z-10">
              {startIcon}
            </div>
          )}

          <DatePicker
            id={inputId}
            ref={ref}
            locale={locale === 'ru' ? ru : enGB}
            calendarClassName={cn("react-datepicker", rest.inline && "react-datepicker--inline")}
            popperClassName="!z-50"
            icon={icon}
            {...rest}
          />

          {(endIcon) && (
            <div className="absolute right-4 text-gray-400 z-10">
              {endIcon}
            </div>
          )}
        </div>
      </FormFieldWrapper>
    );
  },
);

CustomDatepicker.displayName = 'CustomDatepicker';
