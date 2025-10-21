'use client';

import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { cn } from '@/utils';
import { FormFieldWrapper } from '../FormFieldWrapper/FormFieldWraper';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      className,
      fullWidth = true,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id
      ?? (label
        ? `input-${label.toLowerCase().replace(/\s+/g, '-')}`
        : `input`
      );

    const paddingLeftForLabel = startIcon ? 'pl-10' : 'pl-3';

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
            'relative flex items-center rounded-xl border transition-all duration-200 bg-white',
            error
              ? 'border-red-500 focus-within:ring-red-200'
              : 'border-gray-300 hover:border-gray-400 focus-within:border-[#27A430] focus-within:ring-2 focus-within:ring-[#27A430]/20',
            'disabled:bg-gray-50 disabled:cursor-not-allowed',
          )}
        >
          {startIcon && (
            <div className="absolute left-2 text-gray-400 pointer-events-none z-10">
              {startIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full h-full bg-transparent outline-none text-gray-900 text-base placeholder-gray-400 rounded-md disabled:text-gray-400',
              label ? 'px-3 py-2 pt-6' : 'px-3 py-2',
              startIcon && 'pl-10',
              endIcon && 'pr-9',
              className,
            )}
            {...props}
          />

          {endIcon && (
            <div className="absolute right-3 text-gray-400 z-10">
              {endIcon}
            </div>
          )}
        </div>
      </FormFieldWrapper>
    );
  },
);

Input.displayName = 'Input';
