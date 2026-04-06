'use client';

import React, { useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useGetQuery } from '@/api/get.api';
import { useFilterSync } from '@/hooks/useFilterSync';
import { useFilterStore } from '@/store/toursFilterStore';
import { AllToursCardType, TourType } from '@/components/Tours/MainSection/_types';
import HorizontalTourCard from '@/components/Tours/HorizontalTourCard';
import BestSellersPackagesCard from '@/components/UI/BestSellersPackagesCard/BestSellersPackagesCard';
import Pagination from '@/components/UI/Pagination';
import TourFilter from '@/components/TourFilters/TourFilter';
import { DestinationData } from '@/app/[locale]/(main)/destination/[slug]/_types';
import { availableFilters } from '@/components/TourFilters/_types';
import { useTranslations } from 'next-intl';
import { PaginatedData } from '@/types';
import { DestinationCard } from '@/components/Home/Destinations/_types';

const TourViewBtn = dynamic(() => import('@/components/Tours/MainSection/TourViewBtn'));

interface ToursSectionProps {
  locale: string;
  destination?: DestinationData;
  showFilter?: availableFilters[];
  initTours?: PaginatedData<AllToursCardType>;
  initDestinations?: DestinationCard[];
  initTourTypes?: TourType[];
}

export default function ToursSection({
  locale,
  destination,
  showFilter,
  initTours,
  initDestinations,
  initTourTypes,
}: ToursSectionProps) {
  const t = useTranslations();

  const { page, setPage } = useFilterStore();
  const { filterQuery } = useFilterSync();

  const sectionRef = useRef<HTMLElement>(null);

  const pageNum = Math.max(1, Number.parseInt(String(page), 10) || 1);

  /** page передаётся отдельно в useGetQuery; второй `page` из buildFilterQuery давал неверный порядок параметров у API */
  const filterQueryForApi = useMemo(() => {
    if (!filterQuery) return '';
    const withoutPage = filterQuery
      .split('&')
      .filter((p) => p.length > 0 && !p.startsWith('page='))
      .join('&');
    return withoutPage ? `&${withoutPage}` : '';
  }, [filterQuery]);

  const destinationParams = destination
    ? `&destinations[]=${encodeURIComponent(destination.name)}`
    : '';

  const pageString = page.toString();

  const { data: response } = useGetQuery<PaginatedData<AllToursCardType>>({
    key: ['tours_view', locale, destination?.name || 'all', filterQuery, pageString],
    page: pageString,
    perPage: '10',
    url: 'tours',
    searchItem: '',
    additionalParam: `${filterQueryForApi}${destinationParams}`,
  });

  const tours =
    response !== undefined
      ? (response.data ?? [])
      : pageNum === 1
        ? (initTours?.data ?? [])
        : [];

  /** last_page / total при пагинации те же, что у первой страницы; без SSR-meta ломается totalPages и goToPage при загрузке */
  const meta = response?.meta ?? initTours?.meta;
  const totalPages = meta?.last_page as number;
  const totalItems = meta?.total;
  const paginationFrom = meta?.from;
  const paginationTo = meta?.to;

  const goToPage = React.useCallback(
    (page: number) => {
      if (sectionRef.current) {
        const element = sectionRef.current;
        const elementPosition = element.getBoundingClientRect().top;

        // Безопасное получение pageYOffset только на клиенте
        const pageYOffset = typeof window !== 'undefined' ? window.pageYOffset : 0;
        const offsetPosition = elementPosition + pageYOffset - 150;

        if (typeof window !== 'undefined') {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }

      const max =
        typeof totalPages === 'number' && Number.isFinite(totalPages) && totalPages >= 1
          ? totalPages
          : undefined;
      if (page >= 1 && (max === undefined || page <= max)) {
        setPage(page);
      }
    },
    [totalPages, setPage],
  );

  return (
    <section ref={sectionRef} className="w-full flex flex-col gap-10 items-center">
      <div className="w-full grid max-[1024px]:grid-cols-1 grid-cols-[300px_1fr] items-start justify-between gap-7">
        <div className="block [@media(max-width:1024px)]:hidden">
          <TourFilter
            showFilter={showFilter}
            initDestinations={initDestinations}
            initTourTypes={initTourTypes}
          />
        </div>

        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex items-center justify-end md:justify-between ">
            <p className="w-full hidden md:block">
              {t('allTours.showing')} {paginationFrom} - {paginationTo} {t('allTours.out')}{' '}
              {totalItems}
            </p>
            <TourViewBtn className="max-w-[150px]" />
          </div>

          <div className="w-full flex flex-col gap-5">
            <div className="flex-col gap-5 w-full hidden lg:flex">
              {tours?.map((tour: AllToursCardType) => (
                <HorizontalTourCard key={tour.id} tour={tour} locale={locale} />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-5 w-full lg:hidden">
              {tours?.map((tour: AllToursCardType) => (
                <BestSellersPackagesCard key={tour.id} tour={tour} locale={locale} />
              ))}
            </div>

            {totalPages && totalPages > 1 && (
              <Pagination
                currentPage={page as number}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
