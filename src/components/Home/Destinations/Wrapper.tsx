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
              <div className="w-[170px] h-[234px] lg:w-[275px] lg:h-[275px] rounded-[16px] bg-white opacity-80 text-center flex flex-col items-center justify-center text-xl font-semibold p-5 [@media(max-width:768px)]:min-h-[200px]">
                {slide.icon.file && (
                  <ImageWithFallback
                    src={slide.icon.file ? slide.icon.file : ''}
                    alt={slide.icon.alt_text ? slide.icon.alt_text : 'image'}
                    width={150}
                    height={150}
                    className="w-[150px] h-[150px] object-cover mb-3"
                  />
                )}
                <h2 className="text-2xl font-normal [@media(max-width:768px)]:text-[18px]">
                  {slide?.name}
                </h2>
                <div className="text-base font-normal [@media(max-width:768px)]:text-[14px]">
                  {slide?.tours_count} tours
                </div>
              </div>
            </Link>
          )}
        />

        <ECArrowWrapper emblaApi={emblaApi} />
      </div>
    </>
  );
}
