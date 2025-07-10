'use client';
import { AllToursCardType, ToursResponse } from './_types';
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';

import { useFilterStore } from './store';
import { HorizontalTourCard } from '../HorizontalTourCard';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import BestSellersPackagesCard from '@/components/UI/BestSellersPackagesCard/BestSellersPackagesCard';

const TourViewBtn = dynamic(() => import('./TourViewBtn'));

export default function ToursView({
  tourData,
  locale,
  menu,
  showing,
  out,
  nf,
}: {
  tourData: ToursResponse;
  locale: string;
  menu: { title: string; value: string }[];
  showing: string;
  out: string;
  nf: string;
}) {
  const { page, setPage, prices, durations, seasons, hotels, tourTypes, destinations } =
    useFilterStore((state) => state);

  const { data } = useQuery({
    queryKey: [
      'all_tours',
      locale,
      page,
      prices[0],
      prices[1],
      durations[0],
      durations[1],
      seasons?.length,
      hotels?.length,
      tourTypes?.length,
      destinations?.length,
    ],
    queryFn: async () => {
      const res = await fetch(
        `https://api.minzifatravel.com/api/v1/tours?${
          prices[0] > 0 || prices[1] !== 20000 ? `prices[]=${prices[0]}&prices[]=${prices[1]}` : ''
        }&${
          durations[0] > 1 || durations[1] !== 31
            ? `days[]=${durations[0]}&days[]=${durations[1]}`
            : ''
        }&${seasons?.length ? `seasons[]=${seasons.join(',')}` : ''}&${
          hotels?.length ? `hotels[]=${hotels.join(',')}` : ''
        }&${tourTypes?.length ? `types[]=${tourTypes.join(',')}` : ''}&${
          destinations?.length ? `destinations[]=${destinations.join(',')}` : ''
        }&limit=5&page=${page}&perPage=5&locale=${locale}`,
      );
      if (!res.ok) throw new Error('Failed to fetch tours');
      return res.json();
    },
    initialData: tourData,
  });

  const lastPage = data?.meta.last_page || 1;

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (data.data.length === 0) {
    return <div>{nf}</div>;
  }

  return (
    <div className="w-full flex flex-col gap-5 items-start justify-start">
      <div className="w-full flex items-center justify-between min-h-[57px] [@media(max-width:1024px)]:justify-end">
        <p className="block [@media(max-width:1024px)]:hidden">
          {showing} {tourData?.meta.from} - {tourData?.meta.to} {out} {tourData?.meta.total}
        </p>
        <TourViewBtn menu={menu} />
      </div>

      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-5 w-full [@media(max-width:1024px)]:hidden">
          {data.data.length > 0
            ? data?.data?.map((el: AllToursCardType) => (
                <HorizontalTourCard key={el.id} tour={el} />
              ))
            : Array.from({ length: 5 })
                .fill(1)
                .map((_, i) => (
                  <Skeleton
                    sx={{ borderRadius: '15px', backgroundColor: '#16372D' }}
                    variant="rectangular"
                    width={'100%'}
                    key={i}
                    height={300}
                  />
                ))}
        </div>
        <div className="hidden grid-cols-3 gap-5 w-full [@media(max-width:1024px)]:grid [@media(max-width:768px)]:grid-cols-1">
          {tourData?.data.length > 0
            ? tourData?.data.map((el: AllToursCardType) => (
                <BestSellersPackagesCard key={el.id} slide={el} locale={locale} />
              ))
            : Array.from({ length: 5 })
                .fill(2)
                .map((_, i) => (
                  <Skeleton
                    sx={{ borderRadius: '15px', backgroundColor: '#16372D' }}
                    variant="rectangular"
                    width={'100%'}
                    height={375}
                    key={i}
                  />
                ))}
        </div>
        {lastPage && lastPage > 1 ? (
          <Pagination
            color="primary"
            count={lastPage}
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
