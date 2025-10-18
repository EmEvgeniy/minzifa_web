'use client';

import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/utils/utils';
import { FaCheck } from 'react-icons/fa6';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode | string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
  withBadge?: boolean;
  badge?: ReactNode | string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const iconSizes = {
  sm: 'w-2.5 h-2.5',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, size = 'md', variant = 'default', className, disabled, withBadge, badge, ...props },
    ref,
  ) => {
    const checkboxClasses = cn(
      // Базовые стили
      'relative',
      sizeClasses[size],
      'appearance-none border-2 rounded cursor-pointer transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      // Варианты стиля
      variant === 'default' && [
        'bg-white border-gray-300',
        'checked:bg-[#27A430]',
        'focus:ring-gray-300',
        'disabled:bg-gray-100 disabled:border-gray-200 disabled:cursor-not-allowed',
      ],
      variant === 'outline' && [
        'bg-transparent border-[#27A430] hover:bg-[#27A430]/10',
        'checked:bg-[#27A430] checked:border-[#27A430]',
        'focus:ring-[#27A430]',
        'disabled:bg-gray-50 disabled:border-gray-200 disabled:cursor-not-allowed',
      ],
      // Состояния
      disabled && 'opacity-50 cursor-not-allowed',
      className,
    );

    return (
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative flex items-center justify-center ">
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            className={checkboxClasses}
            {...props}
          />
          <FaCheck
            className={cn(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none',
              iconSizes[size],
              !props.checked && 'hidden',
            )}
          />
        </div>
        {label && (
          <span
            className={cn(
              'text-base font-normal text-gray-900 select-none w-full flex items-center',
              'group-hover:text-gray-700 transition-colors duration-200',
              disabled && 'text-gray-400 cursor-not-allowed',
              size === 'sm' && 'text-xs',
              size === 'lg' && 'text-base',
              withBadge && 'justify-between',
            )}
          >
            {label}
            {withBadge &&
              (typeof badge !== 'string' ? (
                badge
              ) : (
                <span className="text-xs text-white bg-[#27A430] py-0.5 px-2 rounded-full font-medium ml-2">
                  {badge}
                </span>
              ))}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
