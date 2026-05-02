'use client';

import { useState } from 'react';
import { DestinationCard } from './_types';
import Link from 'next/link';
import { EmblaCarouselType } from 'embla-carousel';
import EmblaCarousel from '@/components/UI/EmblaCarousel/EmblaCarousel';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { ECArrowWrapper } from '@/components/UI/EmblaCarousel/EmblaCarouselArrowButtons';
import { cn } from '@/utils';

export default function Wrapper({ data, locale }: { data: DestinationCard[]; locale: string }) {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <EmblaCarousel<DestinationCard>
        slides={data}
        onInit={setEmblaApi}
        className="gap-3"
        renderSlide={(slide: DestinationCard) => (
          <div
            key={slide?.id}
            className="flex-[0_0_280px] sm:flex-[0_0_50%] md:flex-[0_0_19.31%] relative flex flex-col items-center justify-center rounded-2xl w-full h-full overflow-hidden"
            style={{ willChange: 'transform' }}
          >
            <Link href={`/${locale}/destination/${slide.slug}`}>
              <div className="absolute inset-0 z-10" />
            </Link>

            <ImageWithFallback
              src={slide?.media?.file as string}
              alt={slide?.media?.alt_text || ''}
              width={200}
              height={200}
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 200px"
              className="aspect-[3/3.46] object-cover"
            />
            <div className="absolute inset-0 bg-black/30 z-0" />

            <h4 className="text-lg font-normal absolute px-5 py-2 bg-white rounded-[30px]">
              {slide?.name}
            </h4>
          </div>
        )}
      />

      <ECArrowWrapper
        emblaApi={emblaApi}
        className={cn('mt-0 w-full justify-between hidden', 'md:flex')}
        variant="dark"
        prevBtnRest={{ className: 'absolute left-1 top-1/2 -translate-y-1/2' }}
        nextBtnRest={{ className: 'absolute right-1 top-1/2 -translate-y-1/2' }}
      />
    </div>
  );
}
