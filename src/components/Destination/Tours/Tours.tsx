'use client';

import { DestinationData } from '@/app/[locale]/destination/[slug]/_types';
import { AllToursCardType } from '@/components/Tours/MainSection/_types';
import { useToursView } from '@/hooks/useToursView';
import HorizontalTourCard from '@/components/Tours/HorizontalTourCard';
import { TourCardListSkeleton } from '@/components/UI/TourCardSkeleton/TourCardSkeleton';
import TourViewBtn from '@/components/Tours/MainSection/TourViewBtn';
import { Button } from '@/components/UI/Button/Button';

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
  nf,
}: Props) {
  const { tours, isLoading, totalPages, currentPage, handlePageChange, ref } = useToursView({
    locale,
    destination: destination.name,
  });

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
          {isLoading || !tours?.data?.length ? (
            <TourCardListSkeleton count={8} variant="horizontal" />
          ) : (
            tours?.data?.map((el: AllToursCardType) => (
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
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handlePageChange({} as React.MouseEvent<HTMLButtonElement>, currentPage - 1)
              }
              disabled={currentPage <= 1}
            >
              Назад
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                if (pageNum > totalPages) return null;

                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() =>
                      handlePageChange({} as React.MouseEvent<HTMLButtonElement>, pageNum)
                    }
                    className="min-w-[40px]"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handlePageChange({} as React.MouseEvent<HTMLButtonElement>, currentPage + 1)
              }
              disabled={currentPage >= totalPages}
            >
              Далее
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
