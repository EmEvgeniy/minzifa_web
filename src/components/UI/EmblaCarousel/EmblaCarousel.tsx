'use client';

import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/utils';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';

type PropType<T> = {
  slides: T[];
  renderSlide: (slide: T, index: number) => ReactNode;
  options?: EmblaOptionsType;
  onInit?: (api: EmblaCarouselType | undefined) => void;
  className?: string;
  prevIcon?: ReactNode;
  nextIcon?: ReactNode;
};

const EmblaCarousel = <T,>({ slides, renderSlide, options, onInit, className, prevIcon, nextIcon }: PropType<T>) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const defaultOptions: EmblaOptionsType = {
    align: 'end',
    slidesToScroll: 'auto',
    dragFree: isMobile,
    loop: false,
    containScroll: 'trimSnaps',
    ...options,
  };

  const [viewportRef, emblaApi] = useEmblaCarousel(defaultOptions);

  const handleInit = useCallback(() => {
    if (onInit) onInit(emblaApi);
  }, [emblaApi, onInit]);

  useEffect(() => {
    handleInit();
  }, [handleInit]);

  return (
    <div className="w-full">
      <div className={cn("overflow-hidden pb-5", (prevIcon && nextIcon) && 'relative')} ref={viewportRef}>
        <div className={cn(
          'flex touch-pan-y will-change-transform',
          className
        )}>
          {slides?.map((slide, index) => renderSlide(slide, index))}
        </div>
        {prevIcon}
        {nextIcon}
      </div>
    </div>
  );
};

export default EmblaCarousel;
