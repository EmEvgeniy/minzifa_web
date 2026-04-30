'use client';

import { forwardRef, useEffect, useRef, useId } from 'react';
import { cn } from '@/utils';
import { FormFieldWrapper } from '../FormFieldWrapper/FormFieldWraper';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  maxRows?: number;
  wrapperClassName?: string;
  innerWrapperClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      wrapperClassName,
      innerWrapperClassName,
      fullWidth = true,
      rows = 1,
      maxRows = 4,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const generatedID = useId();
    const textareaID = props?.id ? `${props.id}-${generatedID}` : generatedID;

    const innerRef = useRef<HTMLTextAreaElement | null>(null);

    const setRefs = (el: HTMLTextAreaElement) => {
      innerRef.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.RefObject<HTMLTextAreaElement | null>).current = el;
    };

    useEffect(() => {
      const el = innerRef.current;
      if (!el) return;

      const lineHeight = 24;
      const maxHeight = lineHeight * maxRows;

      el.style.height = 'auto';
      const newHeight = Math.min(el.scrollHeight, maxHeight);

      el.style.height = `${newHeight}px`;

      el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
    }, [value, maxRows]);

    return (
      <FormFieldWrapper label={label} error={error} helperText={helperText} fullWidth={fullWidth} className={wrapperClassName}>
        <div
          className={cn(
            'relative flex rounded-xl border transition-all duration-200 bg-white',
            error
              ? 'border-red-500 focus-within:ring-red-200'
              : 'border-gray-300 hover:border-gray-400 focus-within:border-[#27A430] focus-within:ring-2 focus-within:ring-[#27A430]/20',
            'disabled:bg-gray-50 disabled:cursor-not-allowed',
            innerWrapperClassName,
          )}
        >
          <textarea
            id={textareaID}
            ref={setRefs}
            rows={rows}
            value={value}
            onChange={onChange}
            className={cn(
              `
              w-full bg-transparent outline-none text-gray-900 text-base resize-none
              placeholder-gray-400 placeholder:text-sm rounded-md disabled:text-gray-400
              transition-[height] duration-200 ease-in-out
            `,
              label ? 'px-5 py-4 pt-10' : 'px-4 py-3',
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
