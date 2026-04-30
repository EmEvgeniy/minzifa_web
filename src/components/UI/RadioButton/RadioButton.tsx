'use client';

import React, { forwardRef, ReactNode } from 'react';
import { cn } from '@/utils';

type RadioButtonVariant = 'circle';

const variantStyles: Record<RadioButtonVariant, string> = {
  circle: 'w-5 h-5 rounded-full cursor-pointer border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
};

const checkedStyles = 'bg-gray-800 border-gray-800';
const disabledStyles = 'opacity-50 cursor-not-allowed';

export interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: RadioButtonVariant;
  label?: string;
  subtitle?: string;
  detail?: ReactNode;
  className?: string;
  value: string;
}

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      variant = 'circle',
      label,
      subtitle,
      detail,
      className,
      disabled,
      checked,
      value,
      ...props
    },
    ref
  ) => {
    const radioStyles = cn(
      variantStyles[variant],
      checked && checkedStyles,
      disabled && disabledStyles,
      className
    );

    return (
      <label
        className={cn(
          'flex items-start gap-3',
          disabled && 'cursor-not-allowed'
        )}
      >
        <input
          ref={ref}
          type="radio"
          className={radioStyles}
          disabled={disabled}
          checked={checked}
          value={value}
          {...props}
        />
        <div className="flex-1 pt-0.5">
          {label && (
            <span className="block font-medium text-gray-900">{label}</span>
          )}
          {subtitle && (
            <span className="block text-sm text-gray-600">{subtitle}</span>
          )}
        </div>
        {detail && (
          <span className="text-gray-500 text-sm pt-0.5">{detail}</span>
        )}
      </label>
    );
  }
);

RadioButton.displayName = 'RadioButton';
export default RadioButton;
