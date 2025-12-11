'use client';

import { InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react';
import { cn } from '@/utils/utils';

export interface RadioProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: ReactNode | string;
    labelClassName?: string;
    size?: 'sm' | 'md' | 'lg';
    withBadge?: boolean;
    badge?: ReactNode | string;
}

const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
};

const dotMap = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2.5 h-2.5',
    lg: 'w-3.5 h-3.5',
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
    (
        {
            label,
            size = 'md',
            disabled,
            withBadge,
            badge,
            labelClassName,
            className,
            ...props
        },
        ref,
    ) => {
        const generatedID = useId();
        const radioID = props?.id ? `${props.id}-${generatedID}` : generatedID;

        return (
            <label
                htmlFor={radioID}
                className={cn(
                    'flex items-center gap-3 cursor-pointer select-none group',
                    disabled && 'opacity-50 cursor-not-allowed'
                )}
            >
                <input
                    id={radioID}
                    type="radio"
                    ref={ref}
                    disabled={disabled}
                    className="peer hidden"
                    {...props}
                    checked={props.checked ?? false}
                    onChange={props.onChange}
                />

                {/* Внешнее кольцо */}
                <span
                    className={cn(
                        'flex items-center justify-center rounded-full border-2 transition-all duration-200',
                        sizeMap[size],
                        'border-gray-400 bg-white',
                        'peer-hover:border-[#27A430]',
                        'peer-checked:border-[#27A430]',
                        'peer-focus-visible:ring-2 peer-focus-visible:ring-[#27A430] peer-focus-visible:ring-offset-0',
                        className
                    )}
                >
                    {/* Внутренняя точка */}
                    {props.checked && <span
                        className={cn(
                            'rounded-full bg-[#27A430] transition-transform duration-200 scale-100',
                            dotMap[size],
                            'peer-checked:scale-100'
                        )}
                    />}
                </span>

                {label && (
                    <span
                        className={cn(
                            'text-gray-900 transition-colors duration-200 group-hover:text-gray-700',
                            labelClassName,
                            size === 'sm' && 'text-xs',
                            size === 'lg' && 'text-base'
                        )}
                    >
                        {label}
                        {withBadge && (
                            typeof badge === 'string' ? (
                                <span className="ml-2 text-xs px-2 py-[2px] rounded-full bg-[#27A430] text-white font-medium">
                                    {badge}
                                </span>
                            ) : (
                                badge
                            )
                        )}
                    </span>
                )}
            </label>
        );
    }
);

Radio.displayName = 'Radio';
