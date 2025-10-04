import React from 'react';
import { cn } from '@/utils/utils';
import Link from 'next/link';

interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

interface ButtonProps extends BaseButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

interface ButtonLinkProps extends BaseButtonProps {
  href: string;
  locale?: string;
  external?: boolean;
}

const buttonVariants = {
  primary: 'bg-[#16372D] text-white hover:bg-[#194D3D] active:bg-[#16372D] shadow-2xl',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-500',
  outline: 'border-2 border-[#16372D] text-[#16372D] hover:bg-[#16372D] hover:text-white',
  ghost: 'text-[#16372D] hover:bg-gray-100',
};

const buttonSizes = {
  sm: 'px-4 py-2 text-sm min-h-[36px]',
  md: 'px-6 py-[14px] text-[16px] min-h-[48px]',
  lg: 'px-8 py-4 text-lg min-h-[56px]',
};

/**
 * Переиспользуемый компонент кнопки
 * Поддерживает разные варианты стилей, размеры и состояния загрузки
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-[16px] font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#16372D] focus:ring-offset-2';

  const classes = cn(
    baseClasses,
    buttonVariants[variant],
    buttonSizes[size],
    disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className,
  );

  return (
    <button
      type={type}
      className={classes}
      onClick={isLoading ? undefined : onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Загрузка...
        </>
      ) : (
        children
      )}
    </button>
  );
};

/**
 * Кнопка-ссылка для навигации
 */
export const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  href,
  locale,
  external = false,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-[16px] font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#16372D] focus:ring-offset-2';

  const classes = cn(
    baseClasses,
    buttonVariants[variant],
    buttonSizes[size],
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className,
  );

  const linkHref = locale ? `/${locale}${href}` : href;

  if (external) {
    return (
      <a href={linkHref} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={linkHref} className={classes} {...props}>
      {children}
    </Link>
  );
};

// Экспортируем компоненты
export default Button;
