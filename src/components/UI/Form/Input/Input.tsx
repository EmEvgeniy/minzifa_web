import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { cn } from '@/utils';

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
    { label, error, helperText, startIcon, endIcon, className, fullWidth = true, ...props },
    ref,
  ) => {
    const inputClasses = cn(
      'px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2',
      'disabled:bg-gray-50 disabled:cursor-not-allowed',
      startIcon && 'pl-10',
      endIcon && 'pr-10',
      error
        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
        : 'border-gray-300 focus:border-[#27A430] focus:ring-[#27A430] focus:ring-opacity-20',
      fullWidth && 'w-full',
      className,
    );

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {startIcon}
            </div>
          )}

          <input ref={ref} className={inputClasses} {...props} />

          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{endIcon}</div>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error.message}</p>}

        {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
