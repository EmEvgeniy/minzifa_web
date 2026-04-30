import { forwardRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { cn } from '@/utils';

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value'> {
  label?: string;
  error?: boolean | { message?: string };
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
  value?: string | number;
  wrapperClassName?: string;
  labelClassName?: string;
  selectWrapperClassName?: string;
  errorClassName?: string;
  helperTextClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder = 'Выберите опцию',
      className,
      wrapperClassName,
      labelClassName,
      selectWrapperClassName,
      errorClassName,
      helperTextClassName,
      fullWidth = true,
      ...props
    },
    ref,
  ) => {
    const selectClasses = cn(
      'px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2',
      'disabled:bg-gray-50 disabled:cursor-not-allowed appearance-none bg-white',
      error
        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
        : 'border-gray-300 focus:border-[#27A430] focus:ring-[#27A430] focus:ring-opacity-20',
      fullWidth && 'w-full',
      className,
    );

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', wrapperClassName)}>
        {label && <label className={cn('text-sm font-medium text-gray-700', labelClassName)}>{label}</label>}

        <div className={cn('relative', selectWrapperClassName)}>
          <select ref={ref} className={selectClasses} {...props}>
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>

          <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
        </div>

        {error && <p className={cn('text-sm text-red-500', errorClassName)}>{typeof error === 'object' ? error.message : 'Error'}</p>}

        {helperText && !error && <p className={cn('text-sm text-gray-500', helperTextClassName)}>{helperText}</p>}
      </div>
    );
  },
);

Select.displayName = 'Select';
