'use client';

import { forwardRef, InputHTMLAttributes, ReactNode, useId } from 'react';
import { FieldError } from 'react-hook-form';
import { cn } from '@/utils';
import { FormFieldWrapper } from '../FormFieldWrapper/FormFieldWraper';

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
            ...props
        },
        ref,
    ) => {
        const generatedID = useId();
        const inputID = props?.id ? `${props.id}-${generatedID}` : generatedID;

        const paddingLeftForLabel = startIcon ? 'pl-12' : 'pl-5';

        return (
            <FormFieldWrapper
                label={label}
                error={error}
                helperText={helperText}
                fullWidth={fullWidth}
                paddingLeft={paddingLeftForLabel}
                className={wrapperClassName}
            >
                <div
                    className={cn(
                        'relative flex items-center rounded-2xl border transition-all duration-200 bg-white',
                        error
                            ? 'border-red-500 focus-within:ring-red-200'
                            : 'border-gray-300 hover:border-gray-400 focus-within:border-[#27A430] focus-within:ring-2 focus-within:ring-[#27A430]/20',
                        'disabled:bg-gray-50 disabled:cursor-not-allowed',
                    )}
                >
                    {startIcon && (
                        <div
                            className={cn(
                                "absolute left-3 top-0 bottom-0 flex items-center p-1 text-gray-400 pointer-events-none z-10",
                                startIconClassName
                            )}
                        >
                            {startIcon}
                        </div>
                    )}

                    <input
                        id={inputID}
                        ref={ref}
                        value={value}
                        onChange={onChange}
                        className={cn(
                            'w-full h-full bg-transparent outline-none text-gray-900 text-base placeholder-gray-400 rounded-md disabled:text-gray-400 placeholder:text-sm md:placeholder:text-base',
                            label ? 'px-5 py-4 pt-10' : 'px-4 py-3',
                            startIcon && 'pl-12',
                            endIcon && 'pr-12',
                            className,
                        )}
                        {...props}
                    />

                    {endIcon && (
                        <div
                            className={cn(
                                "absolute top-0 bottom-0 flex items-center p-1 right-3 text-gray-400 z-10",
                                endIconClassName
                            )}>
                            {endIcon}
                        </div>
                    )}
                </div>
            </FormFieldWrapper>
        );
    },
);

Input.displayName = 'Input';
