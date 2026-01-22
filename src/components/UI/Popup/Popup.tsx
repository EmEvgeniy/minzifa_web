'use client';

import { cn } from '@/utils/utils';
import React, { FC, ReactElement, ReactNode, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

type PopupType = {
  open: boolean;
  handleCloseAction: () => void;
  content?: ReactNode | ReactElement;
  locale?: string;
  className?: string;
  hasBackground?: boolean;
  showTimesButton?: boolean;
  timesButton?: ReactNode | ReactElement;
};

export const Popup: FC<PopupType> = ({
  open,
  handleCloseAction,
  content,
  className = '',
  showTimesButton = true,
  timesButton,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleCloseAction();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') handleCloseAction();
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-50 backdrop-blur-md overflow-y-auto',
          'transition-opacity duration-300',
          open ? 'bg-black/50 opacity-100' : 'bg-black/50 opacity-0 pointer-events-none',
        )}
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
      >
        <div className="flex min-h-full items-center justify-center p-4 md:p-6">
          <div
            className={cn(
              'relative transition-all duration-300 ease-out w-full flex flex-col items-center',
              open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {timesButton ||
              (showTimesButton && (
                <div className={'w-full text-right'}>
                  <button
                    type="button"
                    onClick={handleCloseAction}
                    className="cursor-pointer text-white hover:text-gray-200 transition-colors p-3"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
              ))}
            {content}
          </div>
        </div>
      </div>
    </>
  );
};
