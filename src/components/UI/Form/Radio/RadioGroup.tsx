'use client';

import { ReactNode } from 'react';
import { Radio } from './Radio';
import { cn } from '@/utils/utils';
import { FormFieldWrapper } from '../FormFieldWrapper/FormFieldWraper';
import { FieldError } from 'react-hook-form';

export interface RadioOption {
    label: string | ReactNode;
    value: string;
    badge?: string | ReactNode;
    disabled?: boolean;
}

interface RadioGroupProps {
    name: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    options?: RadioOption[];
    direction?: 'vertical' | 'horizontal';
    gap?: string;
    children?: ReactNode;
    className?: string;
    error?: FieldError;
}

export const RadioGroup = ({
    name,
    value,
    defaultValue,
    onChange,
    options,
    direction = 'vertical',
    gap = 'gap-3',
    children,
    className,
    error,
}: RadioGroupProps) => {
    // Extract the specific error for this field if it's a FieldErrors object
    const fieldError = error && typeof error === 'object' && 'message' in error ? error : undefined;
    const handleChange = (newVal: string) => {
        onChange?.(newVal);
    };

    return (
        <FormFieldWrapper
            error={fieldError}
        >
            <div
                className={cn(
                    'flex',
                    direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
                    gap,
                    className
                )}
                role="radiogroup"
            >
                {options
                    ? options.map((opt) => (
                        <Radio
                            key={opt.value}
                            name={name}
                            label={opt.label}
                            value={opt.value}
                            withBadge={!!opt.badge}
                            badge={opt.badge}
                            disabled={opt.disabled}
                            checked={value ? value === opt.value : undefined}
                            defaultChecked={defaultValue ? defaultValue === opt.value : undefined}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    ))
                    : children}
            </div>
        </FormFieldWrapper>
    );
};
