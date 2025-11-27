'use client';

import React, { ReactNode, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/utils';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';

type PropType<T> = {
  slides: T[];
  renderSlide: (slide: T, index: number) => ReactNode;
  options?: EmblaOptionsType;
  onInit?: (api: EmblaCarouselType | undefined) => void; // ✅ добавляем callback
  className?: string;
  prevIcon?: ReactNode;
  nextIcon?: ReactNode;
};

const EmblaCarousel = <T,>({ slides, renderSlide, options, onInit, className, prevIcon, nextIcon }: PropType<T>) => {
  const defaultOptions: EmblaOptionsType = {
    align: 'end',
    slidesToScroll: 'auto',
    ...options,
  };

  const [viewportRef, emblaApi] = useEmblaCarousel(defaultOptions);

  useEffect(() => {
    if (onInit) onInit(emblaApi);
  }, [emblaApi, onInit]);

  return (
    <div className="w-full">
      <div className={cn("overflow-hidden", (prevIcon && nextIcon) && 'relative')} ref={viewportRef}>
        <div className={cn(
          'flex touch-pan-y',
          className
        )}>
          {slides.map((slide, index) => renderSlide(slide, index))}
        </div>
        {prevIcon}
        {nextIcon}
      </div>
    </div>
  );
};

export default EmblaCarousel;
