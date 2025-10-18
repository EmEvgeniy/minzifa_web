'use client';

import { useGetQuery } from '@/api/get.api';
import { useTranslations } from 'next-intl';
import { BestSellersPackagesCardType } from '../UI/BestSellersPackagesCard/_types';
import Link from 'next/link';
import BestSellersPackagesCard from '../UI/BestSellersPackagesCard/BestSellersPackagesCard';
import Loader from '../UI/Loader/Loader';
import { EmblaCarousel } from '../UI/EmblaCarousel';
import { ECArrowWrapper } from '../UI/EmblaCarousel/EmblaCarouselArrowButtons';
import { EmblaCarouselType } from 'embla-carousel';
import { useState } from 'react';

function FavoritesAll({ locale }: { locale: string }) {
  const t = useTranslations();
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);

  const { data, isLoading } = useGetQuery<{ data: BestSellersPackagesCardType[] }>({
    key: ['all_favorites'],
    page: '',
    perPage: '',
    url: 'tours',
    searchItem: '',
    additionalParam: '&all=1',
  });

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center min-h-[680px]">
        <Loader />
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-5">
      <h2 className="text-[42px] [@media(max-width:768px)]:text-[24px]">
        {locale === 'en' ? 'Our tours for you' : 'Наши туры для вас'}
      </h2>
      <div className="min-h-[520px] [@media(max-width:1024px)]:min-h-[450px] [@media(max-width:450px)]:min-h-[350px]">
        {data?.data?.length && (
          <EmblaCarousel
            slides={data.data}
            onInit={setEmblaApi}
            renderSlide={(tour: BestSellersPackagesCardType) => (
              <BestSellersPackagesCard tour={tour} locale={locale} />
            )}
          />
        )}
      </div>
      <div className="w-full flex items-center justify-between">
        <Link
          href={`/${locale}/tours`}
          className="w-full max-w-[209px] text-center bg-[#16372D] text-white py-[15px] rounded-[16px] text-[16px] shadow-2xl hover:bg-[#194D3D] transition-all active:bg-[#16372D] [@media(max-width:1024px)]:max-w-[150px] [@media(max-width:550px)]:py-[8px]"
        >
          {t('best_sellers_btns')}
        </Link>
        <ECArrowWrapper emblaApi={emblaApi} />
      </div>
    </div>
  );
}

export default FavoritesAll;
