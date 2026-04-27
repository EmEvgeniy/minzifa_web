'use client';

import { forwardRef, InputHTMLAttributes, ReactNode, useId } from 'react';
import { cn } from '@/utils';
import { FormFieldWrapper } from '../FormFieldWrapper/FormFieldWraper';

type InputVariant = 'bordered' | 'borderless';

const variantStyles: Record<InputVariant, string> = {
  bordered: 'border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500',
  borderless: 'border-b border-b-gray-300 px-0 py-2 focus:border-b-blue-500'
};

const errorStyles = 'border-red-600 focus:border-red-600';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: { message?: string };
    helperText?: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    fullWidth?: boolean;
    className?: string;
    wrapperClassName?: string;
    startIconClassName?: string;
    endIconClassName?: string;
    variant?: InputVariant;
    errorText?: string;
    icon?: ReactNode;
    onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            helperText,
            startIcon,
            endIcon,
            className,
            wrapperClassName,
            startIconClassName,
            endIconClassName,
            fullWidth = true,
            value,
            onChange,
            variant = 'bordered',
            errorText,
            icon,
            onClear,
            ...props
        },
        ref,
    ) => {
        const generatedID = useId();
        const inputID = props?.id ? `${props.id}-${generatedID}` : generatedID;

        const paddingLeftForLabel = startIcon ? 'pl-12' : 'pl-5';
        const displayIcon = icon || startIcon;
        const hasError = error || errorText;

        const inputClasses = cn(
            'w-full bg-transparent outline-none text-gray-900 text-base placeholder-gray-400 disabled:text-gray-400 placeholder:text-sm md:placeholder:text-base transition-colors duration-200',
            variantStyles[variant],
            hasError && errorStyles,
            label ? 'px-5 py-4 pt-10' : 'px-4 py-3',
            displayIcon && 'pl-12',
            (endIcon || onClear) && 'pr-12',
            className,
        );

        return (
            <FormFieldWrapper
                label={label}
                error={error}
                helperText={helperText || errorText}
                fullWidth={fullWidth}
                paddingLeft={paddingLeftForLabel}
                className={wrapperClassName}
            >
                <div
                    className={cn(
                        'relative flex items-center transition-all duration-200',
                        variant === 'bordered' && 'rounded-2xl border bg-white',
                        variant === 'borderless' && 'rounded-none',
                        hasError
                            ? 'border-red-500 focus-within:ring-red-200'
                            : 'border-gray-300 hover:border-gray-400 focus-within:border-[#27A430] focus-within:ring-2 focus-within:ring-[#27A430]/20',
                        'disabled:bg-gray-50 disabled:cursor-not-allowed',
                    )}
                >
                    {displayIcon && (
                        <div
                            className={cn(
                                "absolute left-3 top-0 bottom-0 flex items-center p-1 text-gray-400 pointer-events-none z-10",
                                startIconClassName
                            )}
                        >
                            {displayIcon}
                        </div>
                    )}

                    <input
                        id={inputID}
                        ref={ref}
                        value={value}
                        onChange={onChange}
                        className={inputClasses}
                        {...props}
                    />

                    {(endIcon || onClear) && (
                        <div
                            className={cn(
                                "absolute top-0 bottom-0 flex items-center p-1 right-3 text-gray-400 z-10",
                                endIconClassName,
                                onClear && 'cursor-pointer hover:text-gray-600'
                            )}
                            onClick={onClear}
                            role={onClear ? 'button' : undefined}
                            tabIndex={onClear ? 0 : undefined}
                        >
                            {endIcon}
                        </div>
                    )}
                </div>
            </FormFieldWrapper>
        );
    },
);

Input.displayName = 'Input';
