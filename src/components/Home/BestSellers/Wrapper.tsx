'use client';

import React, { useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import EmblaCarousel from '@/components/UI/EmblaCarousel/EmblaCarousel';
import { BestSellersPackagesCardType } from '@/components/UI/BestSellersPackagesCard/_types';
import BestSellersPackagesCard from '@/components/UI/BestSellersPackagesCard/BestSellersPackagesCard';
import BestSellersSkeleton from './BestSellersSkeleton';
import { ECArrowWrapper } from '@/components/UI/EmblaCarousel/EmblaCarouselArrowButtons';
import { useTranslations } from 'next-intl';
import Button from '@/components/UI/Button/Button';

type Props = {
  data: BestSellersPackagesCardType[] | null;
  locale: string;
};

export default function Wrapper({ data, locale }: Props) {
  const t = useTranslations();
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);

  return (
    <div className="flex flex-col gap-7.5 w-full">
      <div className="w-full">
        {Array.isArray(data) && data.length > 0 ? (
          <EmblaCarousel<BestSellersPackagesCardType>
            slides={data}
            renderSlide={(tour) => (
              <BestSellersPackagesCard key={tour.id} tour={tour} locale={locale} />
            )}
            onInit={setEmblaApi}
            className="gap-5"
          />
        ) : (
          <BestSellersSkeleton />
        )}
      </div>

      <div className="w-full flex items-center justify-between gap-3">
        <Button
          to={`/${locale}/tours`}
          color="secondary"
        >
          {t('common.seeAllTrips')}
        </Button>

        <ECArrowWrapper emblaApi={emblaApi} className="mt-0" variant="dark" />
      </div>
    </div>
  );
}
