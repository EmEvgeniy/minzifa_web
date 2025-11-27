'use client';

import { useEffect, useState, useRef } from 'react';
import Image, { ImageProps, StaticImageData } from 'next/image';
import { cn } from '@/utils/utils';
import { Fallback_Image } from '@/assets/img';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string | StaticImageData;
  fallbackSrc?: string | StaticImageData;
  showLoader?: boolean;
}

export const ImageWithFallback = ({
  src,
  fallbackSrc,
  showLoader = true,
  ...props
}: ImageWithFallbackProps) => {
  const [currentSrc, setCurrentSrc] = useState<string | StaticImageData>(src);
  const [isLoading, setIsLoading] = useState(true);

  const previousSrcRef = useRef(src);

  useEffect(() => {
    if (previousSrcRef.current !== src) {
      previousSrcRef.current = src;
      setCurrentSrc(src);
      setIsLoading(true); // выставляем загрузку только если реально изменился src
    }
  }, [src]);

  const handleLoad = () => setIsLoading(false);

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc || Fallback_Image);
      setIsLoading(false);
    }
  };

  const shouldBlur = showLoader && !props.priority && isLoading;

  return (
    <Image
      {...props}
      quality={props?.quality ?? 70}
      priority={props.priority ?? false}
      loading={props.priority ? 'eager' : 'lazy'}
      src={currentSrc}
      alt={props.alt || 'Minzifa Travel'}
      onLoad={handleLoad}
      onError={handleError}
      className={cn(
        'object-cover w-full h-full transition-all duration-500 ease-in-out',
        shouldBlur
          ? 'blur-md opacity-50 scale-[1.02]'
          : 'blur-0 opacity-100 scale-100',
        props.className,
      )}
    />
  );
};

export default ImageWithFallback;
