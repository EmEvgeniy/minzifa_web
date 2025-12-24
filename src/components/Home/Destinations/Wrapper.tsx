'use client';

import React, { useState } from 'react';
import { DestinationCard } from './_types';
import Link from 'next/link';
import { EmblaCarouselType } from 'embla-carousel';
import EmblaCarousel from '@/components/UI/EmblaCarousel/EmblaCarousel';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { ECArrowWrapper } from '@/components/UI/EmblaCarousel/EmblaCarouselArrowButtons';

export default function Wrapper({ data, locale }: { data: DestinationCard[]; locale: string }) {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);

  return (
    <>
      <div className="container-right">
        <EmblaCarousel<DestinationCard>
          slides={data}
          onInit={setEmblaApi}
          className="gap-2.5 lg:gap-5"
          renderSlide={(slide: DestinationCard) => (
            <Link href={`/${locale}/destination/${slide.slug}`} className="flex-1" key={slide?.id}>
              <div className="w-[170px] h-[234px] lg:w-[275px] lg:h-[275px] rounded-2xl text-center flex flex-col items-center justify-center text-xl font-semibold [@media(max-width:768px)]:min-h-[200px] relative overflow-hidden">
                {slide?.media?.file && (
                  <ImageWithFallback
                    src={slide?.media?.file}
                    alt={slide?.media?.alt_text || ''}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                )}
                <h2 className="text-lg font-normal absolute px-5 py-2 bg-white rounded-tr-2xl bottom-0 left-0">
                  {slide?.name}
                </h2>
              </div>
            </Link>
          )}
        />

        <ECArrowWrapper emblaApi={emblaApi} />
      </div>
    </>
  );
}
