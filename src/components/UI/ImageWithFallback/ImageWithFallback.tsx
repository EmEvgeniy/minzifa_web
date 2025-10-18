'use client';

import { useState } from 'react';
import Image, { ImageProps, StaticImageData } from 'next/image';
import { cn } from '@/utils/utils';
import { Fallback_Image } from '@/assets/img';

interface ImageWithFallbackProps extends ImageProps {
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

  const [isLoading, setIsLoading] = useState(true);
  const [initSrc, setInitSrc] = useState(src);

  const shouldBlur = showLoader && !props.priority && isLoading;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setInitSrc(fallbackSrc || Fallback_Image);
    setIsLoading(false);
  };

  return (
    <Image
      {...props}
      quality={70}
      loading='lazy'
      src={initSrc}
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
