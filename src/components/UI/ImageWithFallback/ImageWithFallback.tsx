'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/utils';
import { Fallback_Image } from '@/assets/img';

interface ImageWithFallbackProps {
  src?: string | null;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
  showLoader?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Компонент изображения с автоматическим fallback и loader'ом
 * Показывает loader пока изображение загружается
 * Показывает fallback изображение если основное не загрузилось или отсутствует
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = '',
  width = 500,
  height = 300,
  className,
  showLoader = true,
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setCurrentSrc(Fallback_Image.src);
    onError?.();
  };

  const image = !src ? Fallback_Image : currentSrc;

  return (
    <div className={cn('relative', className)}>
      {/* Loader */}
      {isLoading && showLoader && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-2"></div>
          </div>
        </div>
      )}

      {/* Изображение */}
      <Image
        src={image as string}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={cn(
          'object-cover w-full h-full transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default ImageWithFallback;
