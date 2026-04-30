'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/utils';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  subtitle?: string;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  switchClassName?: string;
  thumbClassName?: string;
  labelClassName?: string;
  subtitleClassName?: string;
  iconClassName?: string;
  contentClassName?: string;
  id?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  subtitle,
  icon,
  disabled = false,
  className,
  switchClassName,
  thumbClassName,
  labelClassName,
  subtitleClassName,
  iconClassName,
  contentClassName,
  id
}) => {
  const handleChange = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const switchStyles = cn(
    'relative w-12 h-6 rounded-full transition-colors',
    checked ? 'bg-gray-800' : 'bg-gray-300',
    !disabled && 'cursor-pointer hover:opacity-90',
    disabled && 'opacity-50 cursor-not-allowed',
    'focus:outline-none focus:ring-2 focus:ring-blue-500',
    switchClassName
  );

  const toggleStyles = cn(
    'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
    checked ? 'right-1' : 'left-1',
    thumbClassName
  );

  return (
    <label
      className={cn(
        'flex items-center gap-3 cursor-pointer',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <div className={cn('flex-1', contentClassName)}>
        {icon && <span className={cn('inline-block mr-2', iconClassName)}>{icon}</span>}
        {label && <span className={cn('block font-medium text-gray-900', labelClassName)}>{label}</span>}
        {subtitle && <span className={cn('block text-sm text-gray-600', subtitleClassName)}>{subtitle}</span>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label || 'Toggle switch'}
        id={id}
        onClick={handleChange}
        disabled={disabled}
        className={switchStyles}
      >
        <span className={toggleStyles} />
      </button>
    </label>
  );
};

Switch.displayName = 'Switch';
export default Switch;
