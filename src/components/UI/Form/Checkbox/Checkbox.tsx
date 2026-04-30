'use client';

import { ReactNode, forwardRef } from 'react';
import { cn } from '@/utils/utils';

type CheckboxVariant = 'square';

const variantStyles: Record<CheckboxVariant, string> = {
  square: 'w-5 h-5 rounded cursor-pointer border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
};

const checkedStyles = 'bg-gray-800 border-gray-800';
const disabledStyles = 'opacity-50 cursor-not-allowed';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: CheckboxVariant;
  label?: ReactNode;
  subtitle?: string;
  detail?: ReactNode;
  withBadge?: boolean;
  badge?: string;
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  subtitleClassName?: string;
  detailClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      variant = 'square',
      label,
      subtitle,
      detail,
      withBadge,
      badge,
      className,
      wrapperClassName,
      labelClassName,
      subtitleClassName,
      detailClassName,
      disabled,
      checked,
      ...props
    },
    ref
  ) => {
    const checkboxStyles = cn(
      variantStyles[variant],
      checked && checkedStyles,
      disabled && disabledStyles,
      className
    );

    return (
      <label
        className={cn(
          'flex items-start gap-3 text-xs leading-[20px] tracking-zero',
          'lg:text-sm',
          disabled && 'cursor-not-allowed',
          wrapperClassName
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          className={checkboxStyles}
          disabled={disabled}
          checked={checked}
          {...props}
        />
        <div className="flex-1">
          {label && (
            <span className={cn('block font-medium text-gray-900', labelClassName)}>
              {label}
              {withBadge && badge && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                  {badge}
                </span>
              )}
            </span>
          )}
          {subtitle && (
            <span className={cn('block text-sm text-gray-600', subtitleClassName)}>
              {subtitle}
            </span>
          )}
        </div>
        {detail && (
          <span className={cn('text-gray-500 text-sm pt-0.5', detailClassName)}>
            {detail}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
export default Checkbox;
