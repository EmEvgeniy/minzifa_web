'use client';

import React, { useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import EmblaCarousel from '@/components/UI/EmblaCarousel/EmblaCarousel';
import { BestSellersPackagesCardType } from '@/components/UI/BestSellersPackagesCard/_types';
import BestSellersPackagesCard from '@/components/UI/BestSellersPackagesCard/BestSellersPackagesCard';
import BestSellersSkeleton from './BestSellersSkeleton';
import { ECArrowWrapper } from '@/components/UI/EmblaCarousel/EmblaCarouselArrowButtons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

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
        <Link
          href={`/${locale}/tours`}
          className="bg-[#16372D] py-6 px-12 text-base font-semibold text-white rounded-2xl w-[187px] h-[67px] flex items-center justify-center"
        >
          {t('best_sellers_btns')}
        </Link>

        <ECArrowWrapper emblaApi={emblaApi} className="mt-0" variant="dark" />
      </div>
    </div>
  );
}
