'use client';

import { EmblaCarouselType } from 'embla-carousel';
import EmblaCarousel from '@/components/UI/EmblaCarousel/EmblaCarousel';
import { useState } from 'react';
import { AdventureCardType } from '@/components/UI/AdventureCard/_types';
import { ECArrowWrapper } from '@/components/UI/EmblaCarousel/EmblaCarouselArrowButtons';
import { useLocale } from 'next-intl';
import AdventureCard from '@/components/UI/AdventureCard/AdventureCard';
import { cn } from '@/utils';

export default function Wrapper({ data }: { data: AdventureCardType[] }) {
  const locale = useLocale();
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <EmblaCarousel<AdventureCardType>
        slides={data}
        onInit={setEmblaApi}
        className="gap-3"
        renderSlide={(slide: AdventureCardType, index) => (
          <AdventureCard
            key={index}
            type={slide}
            locale={locale}
            className="flex-[0_0_41%] relative flex flex-col items-start justify-center rounded-2xl w-full h-full"
          />
        )}
      />

      <ECArrowWrapper
        emblaApi={emblaApi}
        className={cn('mt-0 absolute w-full justify-between hidden', 'md:block')}
        variant="dark"
      />
    </div>
  );
}
