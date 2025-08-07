'use client';
import { ToursResponse } from './_types';
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
import dynamic from 'next/dynamic';
import BestSellersPackagesCard from '@/components/UI/BestSellersPackagesCard/BestSellersPackagesCard';
import HorizontalTourCard from '../HorizontalTourCard';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetQuery } from '@/api/get.api';
import { useRef } from 'react';
import { useFilterStore } from './store';

const TourViewBtn = dynamic(() => import('./TourViewBtn'));

type Props = {
  tourData: ToursResponse;
  locale: string;
  menu: { title: string; value: string }[];
  showing: string;
  out: string;
  nf: string;
  days: string;
  from: string;
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
  from,
  location,
  view_itinerary,
  byRequest,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryString = useFilterStore(state => state.buildFilterQuery());

  const ref = useRef(null);

  const page = Number(searchParams.get('page')) || 1;
  const perPage = 8;

  const { data: tours, isLoading } = useGetQuery<ToursResponse>({
    key: [
      'destination_tours',
      locale,
      page.toString(),
      perPage.toString(),
      queryString
    ],
    page: page.toString(),
    perPage: `${perPage}`,
    url: 'tours',
    searchItem: '',
    additionalParam: `&${queryString}`,
  });

  const totalPages = tours?.meta?.last_page || 1;

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
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
    <div className="w-full flex flex-col gap-5 items-start justify-start">
      <div className="w-full flex items-center justify-between min-h-[57px] [@media(max-width:1024px)]:justify-end">
        <p className="block [@media(max-width:1024px)]:hidden">
          {showing} {tours?.meta.from} - {tours?.meta.to} {out} {tours?.meta.total}
        </p>
        <TourViewBtn menu={menu} />
      </div>

      <div className="w-full flex flex-col gap-5">
        {/* Десктоп — HorizontalTourCard */}
        <div ref={ref} className="flex-col gap-5 w-full hidden lg:flex">
          {!isLoading && tours?.data.length
            ? tours.data.map((el) => (
              <HorizontalTourCard
                key={el.id}
                tour={el}
                locale={locale}
                days={days}
                from={from}
                location={location}
                view_itinerary={view_itinerary}
                byRequest={byRequest}
              />
            ))
            : Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                sx={{ borderRadius: '15px', backgroundColor: '#16372D' }}
                variant="rectangular"
                width="100%"
                height={300}
              />
            ))}
        </div>

        {/* Мобильная сетка — BestSellersPackagesCard */}
        <div className="grid-cols-1 gap-5 w-full grid lg:hidden">
          {!isLoading && tours?.data.length
            ? tours.data.map((el) => (
              <BestSellersPackagesCard
                key={el.id}
                slide={el}
                locale={locale}
                days={days}
                from={from}
                byRequest={byRequest}
                view_itinerary={view_itinerary}
              />
            ))
            : Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                sx={{ borderRadius: '15px', backgroundColor: '#16372D' }}
                variant="rectangular"
                width="100%"
                height={375}
              />
            ))}
        </div>

        {totalPages && totalPages > 1 ? (
          <Pagination
            color="primary"
            count={totalPages}
            page={Number(page)}
            size="medium"
            onChange={handlePageChange}
            shape="rounded"
          />
        ) : null}
      </div>
    </div>
  );
}
