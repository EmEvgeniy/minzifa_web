'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useGetQuery } from '@/api/get.api';
import { useFilterSync } from '@/hooks/useFilterSync';
import { AllToursCardType } from '@/components/Tours/MainSection/_types';
import HorizontalTourCard from '@/components/Tours/HorizontalTourCard';
import BestSellersPackagesCard from '@/components/UI/BestSellersPackagesCard/BestSellersPackagesCard';
import { TourCardListSkeleton } from '@/components/UI/TourCardSkeleton/TourCardSkeleton';
import Pagination from '@/components/UI/Pagination';
import Filter from '@/components/Tours/MainSection/Filter';
import { availableFilters } from '@/types/routing';
import { DestinationData } from '@/app/[locale]/destination/[slug]/_types';

const TourViewBtn = dynamic(() => import('@/components/Tours/MainSection/TourViewBtn'));

// Отдельные интерфейсы для переводов
interface PaginationTranslations {
  showing: string;
  out: string;
}

interface CommonTranslations {
  nf: string;
  days: string;
  from: string;
  location: string;
}

interface TourCardTranslations {
  view_itinerary: string;
  byRequest: string;
  fromText?: string;
}

interface FilterTranslations {
  f_top_btn: string;
  pl: string;
  before: string;
  pl2: string;
  pl3: string;
  pl4: string;
  pl5: string;
  pl6: string;
  pl7: string;
  find_destination: string;
}

// Объединенный интерфейс для всех переводов
interface ToursSectionTranslations
  extends PaginationTranslations,
    CommonTranslations,
    TourCardTranslations,
    FilterTranslations {}

interface ToursSectionProps {
  locale: string;
  destination?: DestinationData; // Опциональный параметр для страницы конкретной дестинации
  showFilter?: availableFilters[];
  seasonData?: { title: string; value: string }[];
  hotelData?: { title: string; value: string }[];
  types?: { title: string; value: string }[];
  menu?: { title: string; value: string }[];
  translations: ToursSectionTranslations;
}

export default function ToursSection({
  locale,
  destination,
  showFilter = ['price', 'duration', 'seasons', 'hotels', 'tourType', 'destinations'],
  seasonData = [],
  hotelData = [],
  types = [],
  menu = [],
  translations,
}: ToursSectionProps) {
  // Используем хук синхронизации фильтров с URL
  const { filterQuery } = useFilterSync();

  // Локальное состояние для текущей страницы
  const [currentPage, setCurrentPage] = useState(1);

  // Ref для секции для прокрутки к началу
  const sectionRef = useRef<HTMLElement>(null);

  // Строим параметры для фильтрации дестинации
  const destinationParams = destination
    ? `&destinations[]=${encodeURIComponent(destination.name)}`
    : '';

  // Используем useGetQuery напрямую вместо usePagination
  const { data: response, isLoading } = useGetQuery<{
    data: AllToursCardType[];
    meta?: { last_page: number; total: number; from: number; to: number; current_page: number };
  }>({
    key: [
      'tours_view',
      locale,
      destination?.name || 'all',
      filterQuery,
      destination?.name || '',
      currentPage.toString(),
    ],
    page: currentPage.toString(),
    perPage: '10',
    url: 'tours',
    searchItem: '',
    additionalParam: `${filterQuery}${destinationParams}`,
  });

  // Извлекаем данные и метаданные из ответа
  const tours = response?.data || [];
  const meta = response?.meta;
  const totalPages = meta?.last_page || 1;
  const totalItems = meta?.total || 0;
  const paginationFrom = meta?.from || 0;
  const paginationTo = meta?.to || 0;

  // Функции навигации пагинации
  const goToPage = (page: number) => {
    // Всегда прокручиваем к началу секции при клике на любую кнопку пагинации
    if (sectionRef.current) {
      const element = sectionRef.current;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 150;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    // Меняем страницу только если это возможно
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (tours?.length === 0) {
    return <div>{translations.nf}</div>;
  }

  return (
    <section ref={sectionRef} className="w-full flex flex-col gap-10 items-center">
      {/* Desktop layout with filters */}
      <div className="w-full grid max-[1024px]:grid-cols-1 grid-cols-[300px_1fr] items-start justify-between gap-7">
        {/* Filters sidebar - hidden on mobile */}
        <div className="block [@media(max-width:1024px)]:hidden">
          <Filter
            locale={locale}
            showFilter={showFilter}
            seasonData={seasonData}
            hotelData={hotelData}
            types={types}
            translations={{
              f_top_btn: translations.f_top_btn,
              pl: translations.pl,
              from: translations.from,
              before: translations.before,
              pl2: translations.pl2,
              pl3: translations.pl3,
              pl4: translations.pl4,
              pl5: translations.pl5,
              pl6: translations.pl6,
              pl7: translations.pl7,
              find_destination: translations.find_destination,
              days: translations.days,
            }}
          />
        </div>

        {/* Tours content */}
        <div className="w-full flex flex-col gap-5 items-start justify-start">
          {/* Header with pagination info and view switcher */}
          <div className="w-full flex items-center justify-between min-h-[57px] [@media(max-width:1024px)]:justify-end">
            <p className="block [@media(max-width:1024px)]:hidden">
              {translations.showing} {paginationFrom} - {paginationTo} {translations.out}{' '}
              {totalItems}
            </p>
            <TourViewBtn menu={menu} />
          </div>

          {/* Tours grid/list */}
          <div className="w-full flex flex-col gap-5">
            {/* Desktop — HorizontalTourCard */}
            <div className="flex-col gap-5 w-full hidden lg:flex">
              {!isLoading && tours?.length ? (
                tours
                  .filter((tour): tour is AllToursCardType => {
                    return (
                      tour !== null &&
                      typeof tour === 'object' &&
                      'id' in tour &&
                      'name' in tour &&
                      'days' in tour &&
                      'destinations' in tour &&
                      'slug' in tour &&
                      'price' in tour
                    );
                  })
                  .map((tour: AllToursCardType) => (
                    <HorizontalTourCard
                      key={tour.id}
                      tour={tour}
                      locale={locale}
                      days={translations.days}
                      from={translations.from}
                      location={translations.location}
                      view_itinerary={translations.view_itinerary}
                      byRequest={translations.byRequest}
                    />
                  ))
              ) : (
                <TourCardListSkeleton count={8} variant="horizontal" />
              )}
            </div>

            {/* Mobile — BestSellersPackagesCard */}
            <div className="grid grid-cols-1 gap-5 w-full lg:hidden">
              {!isLoading && tours?.length ? (
                tours
                  .filter((tour): tour is AllToursCardType => {
                    return (
                      tour !== null &&
                      typeof tour === 'object' &&
                      'id' in tour &&
                      'name' in tour &&
                      'days' in tour &&
                      'destinations' in tour &&
                      'slug' in tour &&
                      'price' in tour
                    );
                  })
                  .map((tour: AllToursCardType) => (
                    <BestSellersPackagesCard
                      key={tour.id}
                      slide={tour}
                      locale={locale}
                      days={translations.days}
                      from={translations.fromText || translations.from}
                      byRequest={translations.byRequest}
                      view_itinerary={translations.view_itinerary}
                    />
                  ))
              ) : (
                <TourCardListSkeleton count={8} variant="grid" />
              )}
            </div>

            {/* Pagination */}
            {totalPages && totalPages > 1 ? (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                locale={locale}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
