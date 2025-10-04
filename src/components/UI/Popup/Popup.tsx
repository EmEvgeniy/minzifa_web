'use client';
import { cn } from '@/utils/utils';
import React, { FC, ReactNode } from 'react';

type PopupType = {
  open: boolean;
  handleClose: () => void;
  content: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  locale: string;
};

export const Popup: FC<PopupType> = ({
  open,
  handleClose,
  content,
  maxWidth = 'lg',
  className = '',
  locale,
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!open) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
      >
        {/* Popup Content */}
        <div
          className={cn(
            'relative bg-white rounded-lg shadow-xl w-full',
            maxWidthClasses[maxWidth],
            locale === 'en' && 'bg-transparent shadow-none',
            className,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button for Russian locale */}
          {locale === 'ru' && (
            <div className="absolute top-2 right-2 z-10">
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Content */}
          <div className="p-0">{content}</div>
        </div>
      </div>
    </>
  );
};
