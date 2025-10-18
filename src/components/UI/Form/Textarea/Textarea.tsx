'use client';

import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { cn } from '@/utils';
import { FormFieldWrapper } from '../FormFieldWrapper/FormFieldWraper';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: FieldError;
  helperText?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      fullWidth = true,
      id,
      rows = 4,
      ...props
    },
    ref,
  ) => {
    const textareaId = id
      ?? (label
        ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
        : `textarea-${Date.now()}`
      );

    return (
      <FormFieldWrapper label={label} error={error} helperText={helperText} fullWidth={fullWidth}>
        <div
          className={cn(
            'relative flex rounded-xl border transition-all duration-200 bg-white',
            error
              ? 'border-red-500 focus-within:ring-red-200'
              : 'border-gray-300 hover:border-gray-400 focus-within:border-[#27A430] focus-within:ring-2 focus-within:ring-[#27A430]/20',
            'disabled:bg-gray-50 disabled:cursor-not-allowed',
          )}
        >
          <textarea
            id={textareaId}
            ref={ref}
            rows={rows}
            className={cn(
              'w-full bg-transparent outline-none text-gray-900 text-base resize-none placeholder-gray-400 rounded-md disabled:text-gray-400',
              label ? 'px-3 py-2 pt-6' : 'px-3 py-2',
              className,
            )}
            {...props}
          />
        </div>
      </FormFieldWrapper>
    );
  },
);

Textarea.displayName = 'Textarea';
