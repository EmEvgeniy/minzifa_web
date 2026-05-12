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
  priority,
  preload,
  ...props
}: ImageWithFallbackProps & { preload?: boolean }) => {
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

  const loading = priority ? 'eager' : 'lazy';
  const quality = props.quality || (priority ? 85 : 75);
  const sizes = props.sizes || (priority ? '100vw' : undefined);

  // When fill is used, Next.js handles sizing via inline styles.
  // Default w-full h-full would conflict, so skip them.
  const isFill = (props as ImageProps).fill;
  const defaultClasses = isFill
    ? 'object-cover transition-opacity duration-300'
    : 'object-cover w-full h-full transition-opacity duration-300';

  return (
    <Image
      {...props}
      ref={imgRef}
      src={currentSrc}
      alt={props.alt || 'Minzifa Travel'}
      onError={handleError}
      loading={loading}
      priority={priority}
      quality={quality}
      sizes={sizes}
      preload={preload}
      className={cn(defaultClasses, props.className)}
    />
  );
};

export default ImageWithFallback;
