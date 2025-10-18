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
};

const EmblaCarousel = <T,>({ slides, renderSlide, options, onInit, className }: PropType<T>) => {
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
      <div className="overflow-hidden" ref={viewportRef}>
        <div className={cn('flex touch-pan-y', className)}>
          {slides.map((slide, index) => renderSlide(slide, index))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
