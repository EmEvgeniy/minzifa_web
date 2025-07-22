'use client';

import { DestinationData } from '@/app/[locale]/destination/[slug]/_types';
import { AllToursCardType, ToursResponse } from '@/components/Tours/MainSection/_types';
// import BestSellersPackagesCard from '@/components/UI/BestSellersPackagesCard/BestSellersPackagesCard';
import { useSearchParams, useRouter } from 'next/navigation';
import { Pagination, Skeleton } from '@mui/material';
import { useGetQuery } from '@/api/get.api';
import HorizontalTourCard from '@/components/Tours/HorizontalTourCard';
import { useRef } from 'react';
import TourViewBtn from '@/components/Tours/MainSection/TourViewBtn';
import { useFilterStore } from '@/components/Tours/MainSection/store';

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
  destination,
  menu,
  showing,
  out,
  nf
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { page, setPage, buildFilterQuery } = useFilterStore();

  const ref = useRef(null);

  const perPage = 8;

  const queryString = buildFilterQuery();

  const { data: tours, isLoading } = useGetQuery<ToursResponse>({
    key: [
      'destination_tours',
      locale,
      page.toString(),
      perPage.toString(),
      destination.name,
      queryString
    ],
    page: page.toString(),
    perPage: perPage.toString(),
    url: 'tours',
    searchItem: '',
    additionalParam: queryString ? `&${queryString}&destinations[]=${destination.name}` : `&destinations[]=${destination.name}`,
  });

  const totalPages = tours?.meta?.last_page || 1;

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', value.toString());
    router.replace(`?${params.toString()}`, { scroll: false, });

    if (ref.current) {
      const topOffset = (ref?.current as HTMLElement).getBoundingClientRect().top + window.scrollY - 200;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  if (tours?.data.length === 0) {
    return <div>{nf}</div>;
  }

  return (
    <section ref={ref}>
      <div className="w-full flex flex-col gap-10 items-center">
        <div className="w-full flex items-center justify-between min-h-[57px] [@media(max-width:1024px)]:justify-end">
          <p className="block [@media(max-width:1024px)]:hidden">
            {showing} {tours?.meta.from} - {tours?.meta.to} {out} {tours?.meta.total}
          </p>
          <TourViewBtn menu={menu} />
        </div>
        <div className="grid grid-cols-1 gap-5 w-full h-full">
          {(isLoading || !tours?.data?.length)
            ? Array.from({ length: perPage }).map((_, i) => (
              <Skeleton
                sx={{ borderRadius: '15px', backgroundColor: '#16372D' }}
                variant="rectangular"
                width={'100%'}
                key={i}
                height={300}
              />
            ))
            : tours?.data?.map((el: AllToursCardType) => (
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
            ))}
        </div>
        {totalPages > 1 && (
          <Pagination
            color="primary"
            count={totalPages}
            page={Number(page)}
            size="medium"
            onChange={handlePageChange}
            shape="rounded"
            aria-label='pagination'
          />
        )}
      </div>
    </section>
  );
}
