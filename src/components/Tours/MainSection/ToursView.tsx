'use client';
import dynamic from 'next/dynamic';
import BestSellersPackagesCard from '@/components/UI/BestSellersPackagesCard/BestSellersPackagesCard';
import HorizontalTourCard from '../HorizontalTourCard';
import { TourCardListSkeleton } from '@/components/UI/TourCardSkeleton/TourCardSkeleton';
import { usePagination } from '@/hooks/usePagination';
import Pagination from '@/components/UI/Pagination/Pagination';
import { AllToursCardType } from './_types';

const TourViewBtn = dynamic(() => import('./TourViewBtn'));

type Props = {
  locale: string;
  menu: { title: string; value: string }[];
  showing: string;
  out: string;
  nf: string;
  days: string;
  fromText: string;
  location: string;
  view_itinerary: string;
  byRequest: string;
};

export default function ToursView({
  locale,
  menu,
  showing,
  out,
  nf,
  days,
  fromText,
  location,
  view_itinerary,
  byRequest,
}: Props) {
  const {
    data: tours,
    isLoading,
    totalPages,
    currentPage,
    totalItems,
    from: paginationFrom,
    to: paginationTo,
    goToPage,
  } = usePagination({
    key: ['tours_view', locale],
    url: 'tours',
    perPage: '10',
    searchItem: '',
    initialPage: 1,
  });

  if (tours?.length === 0) {
    return <div>{nf}</div>;
  }

  return (
    <div className="w-full flex flex-col gap-5 items-start justify-start">
      <div className="w-full flex items-center justify-between min-h-[57px] [@media(max-width:1024px)]:justify-end">
        <p className="block [@media(max-width:1024px)]:hidden">
          {showing} {paginationFrom} - {paginationTo} {out} {totalItems}
        </p>
        <TourViewBtn menu={menu} />
      </div>

      <div className="w-full flex flex-col gap-5">
        {/* Десктоп — HorizontalTourCard */}
        <div className="flex-col gap-5 w-full hidden lg:flex">
          {!isLoading && tours?.length ? (
            (tours as AllToursCardType[]).map((el: AllToursCardType) => (
              <HorizontalTourCard
                key={el.id}
                tour={el}
                locale={locale}
                days={days}
                from={fromText}
                location={location}
                view_itinerary={view_itinerary}
                byRequest={byRequest}
              />
            ))
          ) : (
            <TourCardListSkeleton count={8} variant="horizontal" />
          )}
        </div>

        {/* Мобильная сетка — BestSellersPackagesCard */}
        <div className="grid grid-cols-1 gap-5 w-full lg:hidden">
          {!isLoading && tours?.length ? (
            (tours as AllToursCardType[]).map((el: AllToursCardType) => (
              <BestSellersPackagesCard
                key={el.id}
                slide={el}
                locale={locale}
                days={days}
                from={fromText}
                byRequest={byRequest}
                view_itinerary={view_itinerary}
              />
            ))
          ) : (
            <TourCardListSkeleton count={8} variant="grid" />
          )}
        </div>

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
  );
}
