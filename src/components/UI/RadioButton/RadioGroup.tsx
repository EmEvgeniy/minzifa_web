'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/utils';

export interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  orientation?: 'vertical' | 'horizontal';
  children: ReactNode;
  className?: string;
}

interface RadioChildProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onChange,
  orientation = 'vertical',
  children,
  className
}) => {
  const containerClass = cn(
    'flex gap-3',
    orientation === 'vertical' ? 'flex-col' : 'flex-row',
    className
  );

  return (
    <div
      className={containerClass}
      role="radiogroup"
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        
        const childProps = child.props as RadioChildProps;
        const childValue = childProps?.value as string;
        
        return React.cloneElement(child as React.ReactElement<RadioChildProps>, {
          checked: childValue === value,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
            childProps.onChange?.(e);
          }
        });
      })}
    </div>
  );
};

RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;
