'use client';

import { useEffect, useState } from 'react';
import Image, { ImageProps, StaticImageData } from 'next/image';
import { cn } from '@/utils/utils';
import { Fallback_Image } from '@/assets/img';

interface ImageWithFallbackProps
  extends Omit<ImageProps, 'src'> {
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
  const [currentSrc, setCurrentSrc] = useState<string | StaticImageData>(src);

  const shouldBlur = showLoader && !props.priority && isLoading;

  const handleComplete = () => setIsLoading(false);

  const handleError = () => {
    setCurrentSrc(fallbackSrc || Fallback_Image);
    setIsLoading(false);
  };

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoading(true);
  }, [src]);

  return (
    <Image
      {...props}
      key={currentSrc.toString()}
      quality={70}
      loading='lazy'
      src={currentSrc}
      alt={props.alt || 'Minzifa Travel'}
      onLoad={handleComplete}
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
