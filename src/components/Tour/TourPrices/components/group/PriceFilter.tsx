'use client';

import { GroupPrice } from '@/components/Tour/_types';
import { cn } from '@/utils';
import { useEffect, useState } from 'react';
import { months } from '@/components/Tour/TourPrices/components/group/months';
import { useLocale } from 'next-intl';

type PriceFilterProps = {
  prices: GroupPrice[] | undefined;
  selectedMonth: string | null;
  setSelectedMonth: (month: string | null) => void;
  selectedYear: number | null;
  setSelectedYear: (year: number | null) => void;
};

export function PriceFilter({
  prices,
  selectedYear,
  selectedMonth,
  setSelectedMonth,
  setSelectedYear,
}: PriceFilterProps) {
  const locale = useLocale();

  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    if (!prices) return;
    const uniqueYears =
      prices &&
      Array.from(new Set(prices.map((price) => new Date(price.date_start).getFullYear())));
    if (!uniqueYears) return;
    setYears(uniqueYears);
    setSelectedYear(uniqueYears[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prices]);

  useEffect(() => {
    if (selectedYear !== null) {
      setSelectedMonth(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear]);

  return (
    <>
      <div className="flex flex-row gap-2">
        {years.map((year, index) => (
          <button
            onClick={() => setSelectedYear(year)}
            key={index}
            className={cn(
              selectedYear === year
                ? 'bg-[#16372D] text-[#CFDFD9]'
                : 'text-[#16372D] border border-[#16372D]',
              'text-base rounded-[5px] hover:bg-[#16372D] hover:text-[#CFDFD9] transition-all duration-300 px-4 py-2.5 cursor-pointer  max-[920px]:py-1.5  max-[920px]:px-2.3  max-[920px]:text-[12px]',
            )}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="flex flex-row gap-2  max-[920px]:overflow-x-scroll max-[550px]:pb-4">
        {months[locale].map((month: string, index: number) => {
          const now = new Date();
          const isCurrentYear = selectedYear === now.getFullYear();
          const isPastMonth = isCurrentYear && index < now.getMonth();

          return (
            <button
              onClick={() => setSelectedMonth(selectedMonth === month ? null : month)}
              key={index}
              disabled={isPastMonth}
              className={cn(
                'text-base rounded-[5px] transition-all duration-300 px-4 py-2.5 cursor-pointer max-[920px]:py-1.5  max-[920px]:px-2.3  max-[920px]:text-[12px]',
                selectedMonth === month
                  ? 'bg-[#16372D] text-[#CFDFD9]'
                  : 'text-[#16372D] border-[#16372D] hover:bg-[#16372D] hover:text-[#CFDFD9] border',
                isPastMonth &&
                'bg-[#F3F1F1] border-[#D8DADC] border text-[#A3A3A3] cursor-not-allowed hover:bg-[#F3F1F1] hover:text-[#A3A3A3]',
              )}
            >
              {month}
            </button>
          );
        })}
      </div>
    </>
  );
}
