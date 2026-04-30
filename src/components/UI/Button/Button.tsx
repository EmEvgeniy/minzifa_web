'use client';

import React, { forwardRef, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/utils';

type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'red'
  | 'gray'
  | 'yellow'
  | 'light'
  | 'white'
  | 'soft'
  | 'link'
  | 'bordered';

interface BaseProps {
  children?: ReactNode;
  color?: ButtonVariants;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  disabled?: boolean;
  active?: boolean;
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
  };

type ButtonAsLink = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    to: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const colorStyles: Record<ButtonVariants, string> = {
  primary: 'bg-[#00D37F] text-black hover:bg-[#239C3A]',
  secondary: 'bg-[#16372D] text-white hover:bg-[#0F2A21]',
  red: 'bg-red-600 text-white hover:bg-red-700',
  gray: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  yellow: 'bg-yellow-400 text-black hover:bg-yellow-500',
  light: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  white: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50',
  soft: 'bg-green-100 text-green-800 hover:bg-green-200',
  link: 'bg-transparent text-gray-700 hover:text-primary',
  bordered: 'border border-foreground',
};

const activeStyles: Record<ButtonVariants, string> = {
  primary: 'bg-[#16372D] text-white',
  secondary: 'bg-[#0F2A21] text-white',
  red: 'bg-red-800 text-white',
  gray: 'bg-gray-400 text-white',
  yellow: 'bg-yellow-600 text-black',
  light: 'bg-gray-200 text-gray-900',
  white: 'bg-gray-100 text-gray-800',
  soft: 'bg-green-200 text-green-900',
  link: 'text-gray-900',
  bordered: 'bg-foreground',
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      color = 'primary',
      leftIcon,
      rightIcon,
      className,
      disabled = false,
      active = false,
      to,
      type,
      ...props
    },
    ref,
  ) => {
    const isLink = typeof to === 'string';

    const currentColor = active ? activeStyles[color] : colorStyles[color];

    const baseStyles = cn(
      'flex items-center justify-center gap-2 rounded-5xl px-6 py-4 font-medium select-none transition cursor-pointer leading-100 tracking-zero',
      'focus:outline-none',
      currentColor,
      {
        'opacity-50 cursor-not-allowed pointer-events-none': disabled,
      },
      className,
    );

    const content = (
      <>
        {leftIcon && <span>{leftIcon}</span>}
        {children}
        {rightIcon && <span>{rightIcon}</span>}
      </>
    );

    if (isLink) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={to}
          className={baseStyles}
          aria-disabled={disabled}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={(type as ButtonAsButton['type']) ?? 'button'}
        disabled={disabled}
        className={baseStyles}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
