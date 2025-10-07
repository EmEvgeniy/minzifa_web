'use client';

import { DestinationData } from '@/app/[locale]/destination/[slug]/_types';
import { AllToursCardType } from '@/components/Tours/MainSection/_types';
import HorizontalTourCard from '@/components/Tours/HorizontalTourCard';
import { TourCardListSkeleton } from '@/components/UI/TourCardSkeleton/TourCardSkeleton';
import TourViewBtn from '@/components/Tours/MainSection/TourViewBtn';
import Pagination from '@/components/UI/Pagination';
import { usePagination } from '@/hooks';

type Props = {
  days: string;
  from: string;
  view_itinerary: string;
  byRequest: string;
  locale: string;
  location: string;
  destination: DestinationData;
  menu: { title: string; value: string }[];
  showing: string;
  out: string;
  nf: string;
};

export default function Tours({
  locale,
  days,
  from,
  byRequest,
  view_itinerary,
  location,
  menu,
  showing,
  out,
  nf,
  destination,
}: Props) {
  // Создаем переменные для ключа кеширования и фильтрации
  const destinationKey = destination.name;
  const destinationFilter = `&destination=${destination.slug}`;

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
    key: ['tours_view', locale, destinationKey],
    url: 'tours',
    perPage: '10',
    searchItem: '',
    additionalParam: destinationFilter,
    initialPage: 1,
  });

  if (tours?.length === 0) {
    return <div>{nf}</div>;
  }

  return (
    <section>
      <div className="w-full flex flex-col gap-10 items-center">
        <div className="w-full flex items-center justify-between min-h-[57px] [@media(max-width:1024px)]:justify-end">
          <p className="block [@media(max-width:1024px)]:hidden">
            {showing} {paginationFrom} - {paginationTo} {out} {totalItems}
          </p>
          <TourViewBtn menu={menu} />
        </div>
        <div className="grid grid-cols-1 gap-5 w-full h-full">
          {isLoading || !tours?.length ? (
            <TourCardListSkeleton count={8} variant="horizontal" />
          ) : (
            (tours as AllToursCardType[]).map((el: AllToursCardType) => (
              <HorizontalTourCard
                tour={el}
                key={el.id}
                locale={locale}
                days={days}
                from={from}
                location={location}
                byRequest={byRequest}
                view_itinerary={view_itinerary}
              />
            ))
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
    </section>
  );
}
