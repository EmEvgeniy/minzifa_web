'use client';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useSnackStore } from '../../../store/useSnackStore';
import { FaCheckCircle, FaExclamationCircle, FaTimes, FaInfoCircle } from 'react-icons/fa';

/**
 * Улучшенный компонент уведомлений с поддержкой:
 * - 4 типов уведомлений (success, error, warning, info)
 * - 6 позиций размещения (top-right, top-left, bottom-right, bottom-left, top-center, bottom-center)
 * - Красивые градиентные цвета и иконки
 * - Плавные анимации появления/исчезания
 * - Адаптивный дизайн для мобильных устройств
 *
 * Примеры использования:
 * useSnackStore.getState().setMessage('Операция выполнена успешно!', 'success', 'top-center');
 * useSnackStore.getState().setError('Произошла ошибка при сохранении', 'bottom-right');
 * useSnackStore.getState().setNotification('Предупреждение системы', 'warning', 'top-left');
 */

export const CustomSnackBar = () => {
  const { message, setMessage, error, setError, type, position } = useSnackStore((state) => state);

  const handleClose = useCallback(() => {
    if (error) {
      setError(null);
    } else if (message) {
      setMessage(null);
    }
  }, [error, message, setError, setMessage]);

  const getIcon = (notificationType: string) => {
    switch (notificationType) {
      case 'success':
        return <FaCheckCircle className="flex-shrink-0" size={20} />;
      case 'error':
        return <FaExclamationCircle className="flex-shrink-0" size={20} />;
      case 'warning':
        return <FaExclamationCircle className="flex-shrink-0" size={20} />;
      case 'info':
        return <FaInfoCircle className="flex-shrink-0" size={20} />;
      default:
        return <FaInfoCircle className="flex-shrink-0" size={20} />;
    }
  };

  const getStyles = (notificationType: string) => {
    switch (notificationType) {
      case 'success':
        return {
          container: 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-400',
          icon: 'text-green-100'
        };
      case 'error':
        return {
          container: 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-400',
          icon: 'text-red-100'
        };
      case 'warning':
        return {
          container: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-yellow-400',
          icon: 'text-yellow-100'
        };
      case 'info':
        return {
          container: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-400',
          icon: 'text-blue-100'
        };
      default:
        return {
          container: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-400',
          icon: 'text-gray-100'
        };
    }
  };

  const content = useMemo(() => {
    const text = error || message;
    const notificationType = type || (error ? 'error' : 'success');
    return text ? { text, type: notificationType } : null;
  }, [error, message, type]);

  // Автоматическое скрытие через 4 секунды для лучшего UX
  useEffect(() => {
    if (content) {
      const timer = setTimeout(handleClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [content, handleClose]);

  if (!content) return null;

  const styles = getStyles(content.type);

  const getPositionStyles = (pos: string) => {
    switch (pos) {
      case 'top-right':
        return 'top-4 right-4 md:right-4 md:left-auto';
      case 'top-left':
        return 'top-4 left-4 md:left-4 md:right-auto';
      case 'bottom-right':
        return 'bottom-4 right-4 md:bottom-4 md:right-4';
      case 'bottom-left':
        return 'bottom-4 left-4 md:bottom-4 md:left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2 md:left-1/2 md:transform md:-translate-x-1/2';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2 md:bottom-4 md:left-1/2 md:transform md:-translate-x-1/2';
      default:
        return 'top-4 right-4 md:right-4';
    }
  };

  const positionStyles = getPositionStyles(position || 'top-right');

  return (
    <>
      {/* Backdrop для мобильных устройств */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden animate-fadeIn" onClick={handleClose} />

      {/* Snackbar */}
      <div className={`fixed z-50 ${positionStyles} max-w-sm`}>
        <div
          className={`p-4 rounded-xl shadow-2xl border transition-all duration-500 transform ${styles.container} backdrop-blur-sm ${(position || 'top-right').includes('top') ? 'animate-slideInFromTop' :
            (position || 'top-right').includes('bottom') ? 'animate-slideInFromBottom' :
              (position || 'top-right').includes('left') ? 'animate-slideInFromRight' :
                'animate-slideInFromLeft'
            }`}
        >
          <div className="flex items-start gap-3">
            <div className={`${styles.icon} mt-0.5`}>
              {getIcon(content.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-relaxed">{content.text}</p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="flex-shrink-0 text-white/80 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 rounded p-1 hover:bg-white/10"
            >
              <FaTimes size={14} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromTop {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromBottom {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromRight {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-slideInFromTop {
          animation: slideInFromTop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-slideInFromBottom {
          animation: slideInFromBottom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};
