'use client';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useSnackStore } from './store';

export const CustomSnackBar = () => {
  const { message, setMessage, error, setError } = useSnackStore((state) => state);

  const handleClose = useCallback(() => {
    if (error) {
      setError(null);
    } else if (message) {
      setMessage(null);
    }
  }, [error, message, setError, setMessage]);

  const content = useMemo(() => {
    return error
      ? { text: error, type: 'error' as const }
      : message
      ? { text: message, type: 'success' as const }
      : null;
  }, [error, message]);

  // Автоматическое скрытие через 3 секунды
  useEffect(() => {
    if (content) {
      const timer = setTimeout(handleClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [content, handleClose]);

  if (!content) return null;

  return (
    <>
      {/* Backdrop для мобильных устройств */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={handleClose} />

      {/* Snackbar */}
      <div className="fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:top-4 md:max-w-sm">
        <div
          className={`p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-y-0 ${
            content.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{content.text}</p>
            <button
              type="button"
              onClick={handleClose}
              className="ml-3 text-white hover:text-gray-200 focus:outline-none"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
