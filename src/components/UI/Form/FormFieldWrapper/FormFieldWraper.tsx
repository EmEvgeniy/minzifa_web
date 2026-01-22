'use client';

import { ReactNode } from 'react';
import { cn } from '@/utils';

interface FormFieldWrapperProps {
    label?: string;
    error?: { message?: string };
    helperText?: string;
    fullWidth?: boolean;
    className?: string;
    children: ReactNode;
    paddingLeft?: string;
}

export const FormFieldWrapper = ({
    label,
    error,
    helperText,
    fullWidth = true,
    className,
    children,
    paddingLeft = 'pl-5',
}: FormFieldWrapperProps) => {
    return (
        <div className={cn('relative flex flex-col', fullWidth && 'w-full', className)}>
            <div className="relative w-full">
                {label && (
                    <span
                        className={cn(
                            'absolute top-4 left-0 px-1 text-xs text-gray-500 select-none pointer-events-none z-10',
                            paddingLeft
                        )}
                        aria-hidden
                    >
                        {label}
                    </span>
                )}
                {children}
            </div>

            {/* helper / error */}
            {error ? (
                <p className="mt-2 text-xs text-red-500">{error.message}</p>
            ) : helperText ? (
                <p className="mt-2 text-xs text-gray-500">{helperText}</p>
            ) : null}
        </div>
    );
};
