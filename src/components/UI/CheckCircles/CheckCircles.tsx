'use client';

import React, { forwardRef, ReactNode } from 'react';
import { cn } from '@/utils';

type CheckCirclesVariant = 'circle';

const variantStyles: Record<CheckCirclesVariant, string> = {
  circle: 'w-5 h-5 rounded-full cursor-pointer border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
};

const checkedStyles = 'bg-gray-800 border-gray-800';
const disabledStyles = 'opacity-50 cursor-not-allowed';

export interface CheckCirclesProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: CheckCirclesVariant;
  label?: string;
  subtitle?: string;
  detail?: ReactNode;
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  subtitleClassName?: string;
  detailClassName?: string;
}

const CheckCircles = forwardRef<HTMLInputElement, CheckCirclesProps>(
  (
    {
      variant = 'circle',
      label,
      subtitle,
      detail,
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
    const circleStyles = cn(
      variantStyles[variant],
      checked && checkedStyles,
      disabled && disabledStyles,
      className
    );

    return (
      <label
        className={cn(
          'flex items-start gap-3',
          disabled && 'cursor-not-allowed',
          wrapperClassName
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          className={circleStyles}
          disabled={disabled}
          checked={checked}
          {...props}
        />
        <div className="flex-1 pt-0.5">
          {label && (
            <span className={cn('block font-medium text-gray-900', labelClassName)}>
              {label}
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

CheckCircles.displayName = 'CheckCircles';
export default CheckCircles;
