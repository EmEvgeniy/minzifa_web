'use client';

import { AllToursCardType, ToursResponse } from '@/components/Tours/MainSection/_types';
import BestSellersPackagesCard from '@/components/UI/BestSellersPackagesCard/BestSellersPackagesCard';

import { Pagination, Skeleton } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  days: string;
  from: string;
  view_itinerary: string;
  byRequest: string;
  tours: ToursResponse;
  locale: string;
};

export default function Tours({ tours, locale, days, from, byRequest, view_itinerary }: Props) {
  const page = Number(useSearchParams().get('page')) || 1;
  const router = useRouter();

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`?page=${value}`);
  };

  const totalPages = tours?.meta?.last_page || 1;

  return (
    <section className="container py-[70px]">
      <div className="w-full flex flex-col gap-10 items-center">
        <div className="grid grid-cols-3 gap-5 w-full h-full">
          {tours?.data?.length > 0
            ? tours?.data?.map((el: AllToursCardType) => (
                <BestSellersPackagesCard
                  slide={el}
                  key={el.id}
                  locale={locale}
                  days={days}
                  from={from}
                  byRequest={byRequest}
                  view_itinerary={view_itinerary}
                />
              ))
            : Array.from({ length: 9 })
                .fill(1)
                .map((_, i) => (
                  <Skeleton
                    sx={{ borderRadius: '15px', backgroundColor: '#16372D' }}
                    variant="rectangular"
                    width={'100%'}
                    key={i}
                    height={375}
                  />
                ))}
        </div>
        {totalPages > 1 && (
          <Pagination
            color="primary"
            count={totalPages}
            page={page}
            size="medium"
            onChange={handlePageChange}
            shape="rounded"
          />
        )}
      </div>
    </section>
  );
}
