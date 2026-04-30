'use client';

import { useState, useMemo } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import EmblaCarousel from '@/components/UI/EmblaCarousel/EmblaCarousel';
import { BestSellersPackagesCardType } from '@/components/UI/BestSellersPackagesCard/_types';
import BestSellersPackagesCard from '@/components/UI/BestSellersPackagesCard/BestSellersPackagesCard';
import BestSellersSkeleton from './BestSellersSkeleton';
import { ECArrowWrapper } from '@/components/UI/EmblaCarousel/EmblaCarouselArrowButtons';
import { useTranslations } from 'next-intl';
import Button from '@/components/UI/Button/Button';
import { useGetQuery } from '@/api/get.api';
import { PaginatedData } from '@/types';
import { cn } from '@/utils';

type Props = {
  data: BestSellersPackagesCardType[] | null;
  locale: string;
};

export default function Wrapper({ data, locale }: Props) {
  const t = useTranslations();
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);

  const filters = useMemo(
    () => [
      { name: t('home.main_filter.best_selling'), param: 'main_page=1' },
      { name: t('home.main_filter.private_tour'), param: 'tour_type[]=individual' },
      { name: t('home.main_filter.groud_tour'), param: 'tour_type[]=group' },
    ],
    [t],
  );

  const selectFilter = filters[selectedFilterIndex];

  const { data: queryData, isLoading } = useGetQuery<PaginatedData<BestSellersPackagesCardType>>({
    key: ['tours', 'filter', selectFilter.param],
    url: 'tours',
    additionalParam: selectFilter.param,
  });

  const tours = queryData?.data && queryData?.data.length > 0 ? queryData.data : data;

  const handleFilter = (index: number) => {
    setSelectedFilterIndex(index);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center bg-[#022B1B14] rounded-[40px]">
          {filters?.map((filter, index) => (
            <Button
              key={index}
              type="button"
              onClick={() => handleFilter(index)}
              color={index === selectedFilterIndex ? 'secondary' : 'link'}
              className="text-sm rounded-4xl p-4 leading-100 tracking-zero"
            >
              {filter.name}
            </Button>
          ))}
        </div>

        <Button
          to={`/${locale}/tours`}
          color="bordered"
          className={cn(
            'px-6 py-3 text-lg font-semibold leading-100 tracking-zero',
            'hidden lg:block',
          )}
        >
          {t('home.main_filter.view_all')}
        </Button>
      </div>

      <div className="relative flex flex-col justify-center">
        {isLoading && !queryData ? (
          <BestSellersSkeleton />
        ) : Array.isArray(tours) && tours.length > 0 ? (
          <EmblaCarousel<BestSellersPackagesCardType>
            slides={tours}
            options={{
              loop: false,
            }}
            renderSlide={(tour) => (
              <BestSellersPackagesCard key={tour.id} tour={tour} locale={locale} />
            )}
            onInit={setEmblaApi}
            className="gap-4"
          />
        ) : (
          <BestSellersSkeleton />
        )}

        <ECArrowWrapper
          emblaApi={emblaApi}
          className="mt-0 absolute w-full justify-between hidden lg:flex"
          variant="dark"
        />
      </div>

      <Button
        to={`/${locale}/tours`}
        color="bordered"
        className={cn(
            'text-center px-6 py-3 text-sm font-semibold leading-100 tracking-zero',
            'block lg:hidden',
          )}
      >
        {t('home.main_filter.view_all')}
      </Button>
    </div>
  );
}
