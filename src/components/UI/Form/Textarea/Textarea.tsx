import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { cn } from '@/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: FieldError;
  helperText?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, helperText, className, fullWidth = true, resize = 'none', rows = 4, ...props },
    ref,
  ) => {
    const textareaClasses = cn(
      'px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 resize-none',
      'disabled:bg-gray-50 disabled:cursor-not-allowed',
      error
        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
        : 'border-gray-300 focus:border-[#27A430] focus:ring-[#27A430] focus:ring-opacity-20',
      fullWidth && 'w-full',
      className,
    );

    const resizeClass = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    }[resize];

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

        <textarea ref={ref} rows={rows} className={cn(textareaClasses, resizeClass)} {...props} />

        {error && <p className="text-sm text-red-500">{error.message}</p>}

        {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
