'use client';

import { useEffect, useState, useRef } from 'react';
import Image, { ImageProps, StaticImageData } from 'next/image';
import { cn } from '@/utils/utils';
import { Fallback_Image } from '@/assets/img';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string | StaticImageData;
  fallbackSrc?: string | StaticImageData;
}

export const ImageWithFallback = ({
  src,
  fallbackSrc,
  ...props
}: ImageWithFallbackProps) => {
  const [currentSrc, setCurrentSrc] = useState<string | StaticImageData>(
    src || fallbackSrc || Fallback_Image,
  );

  const imgRef = useRef<HTMLImageElement | null>(null);
  const previousSrcRef = useRef(src);

  useEffect(() => {
    const validSrc = src || fallbackSrc || Fallback_Image;
    if (previousSrcRef.current !== src) {
      previousSrcRef.current = src;
      setCurrentSrc(validSrc);
    }
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc || Fallback_Image);
    }
  };

  return (
    <Image
      {...props}
      ref={imgRef}
      src={currentSrc}
      alt={props.alt || 'Minzifa Travel'}
      onError={handleError}
      className={cn(
        'object-cover w-full h-full transition-opacity duration-300',
        props.className,
      )}
      quality={props.quality || 75}
    />
  );
};

export default ImageWithFallback;
