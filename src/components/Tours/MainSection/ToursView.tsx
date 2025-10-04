'use client';
import dynamic from 'next/dynamic';
import BestSellersPackagesCard from '@/components/UI/BestSellersPackagesCard/BestSellersPackagesCard';
import HorizontalTourCard from '../HorizontalTourCard';
import { TourCardListSkeleton } from '@/components/UI/TourCardSkeleton/TourCardSkeleton';
import { useToursView } from '@/hooks/useToursView';

const TourViewBtn = dynamic(() => import('./TourViewBtn'));

type Props = {
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
  const { tours, isLoading, totalPages, currentPage, handlePageChange, ref } = useToursView({
    locale,
  });

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
          {!isLoading && tours?.data?.length ? (
            tours?.data?.map((el) => (
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
          ) : (
            <TourCardListSkeleton count={8} variant="horizontal" />
          )}
        </div>

        {/* Мобильная сетка — BestSellersPackagesCard */}
        <div className="grid grid-cols-1 gap-5 w-full lg:hidden">
          {!isLoading && tours?.data.length ? (
            tours.data.map((el) => (
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
          ) : (
            <TourCardListSkeleton count={8} variant="grid" />
          )}
        </div>

        {totalPages && totalPages > 1 ? (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              type="button"
              onClick={() => handlePageChange({} as React.MouseEvent<HTMLButtonElement>, 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Первая
            </button>

            <button
              type="button"
              onClick={() =>
                handlePageChange({} as React.MouseEvent<HTMLButtonElement>, currentPage - 1)
              }
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Предыдущая
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages, currentPage - 2 + i));
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() =>
                      handlePageChange({} as React.MouseEvent<HTMLButtonElement>, pageNum)
                    }
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      pageNum === currentPage
                        ? 'bg-[#27A430] text-white'
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() =>
                handlePageChange({} as React.MouseEvent<HTMLButtonElement>, currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Следующая
            </button>

            <button
              type="button"
              onClick={() =>
                handlePageChange({} as React.MouseEvent<HTMLButtonElement>, totalPages)
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Последняя
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
