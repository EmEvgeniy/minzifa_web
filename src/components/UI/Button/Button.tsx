'use client';

import React, { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/utils';

interface ButtonProps {
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'red' | 'gray' | 'yellow' | 'light' | 'white' | 'soft' | 'link';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: ((e?: React.MouseEvent) => void) | (() => void);
  className?: string;
  as?: 'button' | typeof Link;
  to?: string;
  target?: string;
  disabled?: boolean;
  active?: boolean;
}

export default function Button({
  children,
  type,
  color = 'primary',
  leftIcon,
  rightIcon,
  onClick,
  className,
  as = 'button',
  to,
  target,
  disabled = false,
  active = false,
}: ButtonProps) {
  const baseStyles = cn(
    'flex items-center cursor-pointer justify-center gap-2 rounded-2xl px-4 py-2 font-medium transition-all duration-300',
    'hover:opacity-95 active:scale-97',
    {
      'bg-[#27A430] text-white hover:bg-[#239C3A]': color === 'primary' && !active,
      'bg-[#16372D] text-white': color === 'primary' && active,

      'bg-[#16372D] text-white hover:bg-[#1E4C3F]': color === 'secondary' && !active,
      'bg-[#27A430] text-white': color === 'secondary' && active,

      'bg-red-500 text-white hover:bg-red-600': color === 'red' && !active,
      'bg-red-700 text-white': color === 'red' && active,

      'bg-gray-500 text-white hover:bg-gray-600': color === 'gray' && !active,
      'bg-gray-700 text-white': color === 'gray' && active,

      'bg-yellow-400 text-gray-900 hover:bg-yellow-500': color === 'yellow' && !active,
      'bg-yellow-600 text-gray-900': color === 'yellow' && active,

      'bg-gray-100 text-gray-900 hover:bg-gray-200': color === 'light' && !active,
      'bg-gray-300 text-gray-900': color === 'light' && active,

      'bg-white text-[#16372D] border border-gray-300 hover:bg-gray-100':
        color === 'white' && !active,
      'bg-gray-100 text-[#16372D] border border-gray-300': color === 'white' && active,

      'bg-transparent text-[#16372D] hover:bg-[#E6F2EC]': color === 'soft' && !active,
      'bg-[#E6F2EC] text-[#16372D] border border-[#27A430]': color === 'soft' && active,

      // ✅ Новый стиль — текстовая "ссылка"
      'bg-transparent text-black px-0 py-0 font-normal hover:underline hover:text-gray-700':
        color === 'link' && !disabled,

      'opacity-50 cursor-not-allowed': disabled,
    },
    className,
  );

  const content = (
    <>
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  );

  if (as === 'button') {
    return (
      <motion.button
        type={type}
        onClick={(e) => !disabled && onClick && onClick(e)}
        className={baseStyles}
        disabled={disabled}
        whileHover={{ scale: disabled || color === 'link' ? 1 : 1.01 }}
        whileTap={{ scale: disabled || color === 'link' ? 1 : 0.97 }}
      >
        {content}
      </motion.button>
    );
  }

  const MotionLink = motion.create(
    forwardRef<HTMLAnchorElement, React.ComponentProps<typeof Link>>(
      function MotionLinkComponent({ href, children, ...props }, ref) {
        return (
          <Link href={href || '#'} ref={ref} {...props}>
            {children}
          </Link>
        );
      },
    ),
  );

  MotionLink.displayName = 'MotionLink';

  return (
    <MotionLink
      href={to || '#'}
      target={target}
      onClick={(e) => !disabled && onClick && onClick(e)}
      className={baseStyles}
      whileHover={{ scale: disabled || color === 'link' ? 1 : 1.01 }}
      whileTap={{ scale: disabled || color === 'link' ? 1 : 0.97 }}
    >
      {content}
    </MotionLink>
  );
}
