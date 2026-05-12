'use client';

import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { EmblaCarousel } from '@/components/UI/EmblaCarousel';
import { EmblaCarouselType } from 'embla-carousel';
import { ECArrowWrapper } from '@/components/UI/EmblaCarousel/EmblaCarouselArrowButtons';
import Link from 'next/link';
import { cn } from '@/utils';
import { Banner } from './types';

export default function HeroSlider({ banners }: { banners: Banner[] }) {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);

  return (
    <div className="container relative px-2.5">
      <EmblaCarousel<Banner>
        slides={banners}
        onInit={setEmblaApi}
        className="gap-3"
        renderSlide={(slide: Banner, index) => (
          <div
            key={index}
            className={cn(
              'relative flex-[0_0_88%] w-full h-full min-h-[388px] rounded-[12px] p-6 flex flex-col justify-end overflow-hidden',
              'lg:flex-[0_0_100%] lg:min-h-[658px] lg:rounded-5xl lg:p-8',
            )}
            style={{ willChange: 'transform' }}
          >
            <ImageWithFallback
              src={slide?.media?.file as string}
              alt={slide?.media?.alt_text as string}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover"
            />
            <div className="bg-linear-to-t from-black to-black/0 to-50% w-full h-full absolute left-0 bottom-0 z-10" />
            <div className="z-20 flex flex-col gap-3">
              <h2
                className={cn(
                  'text-[28px] max-w-[500px] font-title font-bold leading-100 tracking-zero text-white',
                  'lg:text-[52px]',
                )}
              >
                {slide.name}
              </h2>
              {slide.link ? (
                <Link href={slide.link} className="flex flex-row gap-1 items-center text-white">
                  {slide.link_title || 'Read more'} <FaChevronRight />
                </Link>
              ) : (
                <span className="flex flex-row gap-1 items-center text-white/80">
                  {slide.link_title || 'Read more'} <FaChevronRight />
                </span>
              )}
            </div>
          </div>
        )}
      />

      <ECArrowWrapper
        emblaApi={emblaApi}
        className="hidden flex-row items-center justify-between gap-4 z-20 absolute right-8 bottom-8 md:flex"
      />
    </div>
  );
}
