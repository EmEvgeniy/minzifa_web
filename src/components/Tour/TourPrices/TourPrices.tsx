'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Price } from '../_types';
import { useEffect, useState } from 'react';
import { cn, date_end, formatted_date } from '@/utils/utils';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingStore } from '@/store/bookingStore';
import { useRouter } from 'next/navigation';
import { TourDescTopCard } from './TourDescTopCard';
import { TourMobileCard } from './TourMobileCard';

const months: { [key in 'en' | 'ru']: string[] } = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ru: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
};

export const TourPrices = () => {
  const t = useTranslations('Tour');
  const locale = useLocale() as 'en' | 'ru';

  const router = useRouter();

  const { tour, setBookingData } = useBookingStore((state) => state);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [years, setYears] = useState<number[]>([]);

  const [limit, setLimit] = useState(5);

  useEffect(() => {
    if (!tour?.prices) return;
    const uniqueYears = Array.from(
      new Set(tour?.prices.map((price) => new Date(price.date_start).getFullYear())),
    );
    setYears(uniqueYears);
    setSelectedYear(uniqueYears[0]);
  }, [tour?.prices]);

  useEffect(() => {
    if (selectedYear !== null) {
      setSelectedMonth(null);
    }
  }, [selectedYear]);

  if (!tour?.prices) return;

  const filteredPrices = tour?.prices.filter((price) => {
    const date = new Date(price.date_start);
    const yearMatches = selectedYear === null || date.getFullYear() === selectedYear;
    const monthMatches =
      selectedMonth === null || date.getMonth() === months[locale].indexOf(selectedMonth);
    return yearMatches && monthMatches;
  });

  const handleBookingData = (
    selectedPrice: Price | undefined,
    totalPrice: number,
    travellers: string,
  ) => {
    if (!tour || !selectedPrice) return;
    setBookingData({
      adults: 1,
      childrens: 0,
      passengers: [],
      tour_name: tour.name,
      tour_start: formatted_date(selectedPrice.date_start, locale),
      tour_end: date_end(selectedPrice.date_start, locale, tour.days),
      travellers_count: String(travellers),
      tour_price: selectedPrice.price_for_double,
      deposit: totalPrice * 0.15,
      total_price: totalPrice,
      payment_type: 'cash',
      payment_status: 'pending',
      single_price: selectedPrice.price_for_single,
      currency: selectedPrice.valute,
      total_seats: selectedPrice.tour_total_seats,
    });
    router.push(`/${locale}/booking/${tour?.slug}`);
  };

  return (
    filteredPrices.length > 0 && (
      <section className="flex flex-col gap-5 max-[550px]:gap-3">
        <h2 className="text-4xl font-semibold  max-[920px]:text-[24px]">{t('prices.title')}</h2>

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
          {months[locale].map((month, index) => {
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

        <div className="bg-[#E2FFF4] p-5 rounded-2xl flex flex-row gap-2.5 items-center text-lg self-end max-[920px]:p-3 max-[920px]:text-[14px] max-[920px]:gap-1.5 max-[550px]:w-full max-[550px]:p-2">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.9909 24.3666C20.3303 24.3666 24.7374 19.9595 24.7374 14.6296C24.7374 9.29966 20.3209 4.89258 14.9815 4.89258C9.65158 4.89258 5.25391 9.29966 5.25391 14.6296C5.25391 19.9595 9.66099 24.3666 14.9909 24.3666ZM14.9909 22.4268C10.6686 22.4268 7.21261 18.9519 7.21261 14.6296C7.21261 10.3073 10.6686 6.84187 14.9815 6.84187C19.3039 6.84187 22.7787 10.3073 22.7881 14.6296C22.7975 18.9519 19.3133 22.4268 14.9909 22.4268ZM14.9815 16.1928C15.4994 16.1928 15.8008 15.9009 15.8102 15.3547L15.9515 10.8252C15.9703 10.2696 15.5559 9.86468 14.9721 9.86468C14.3883 9.86468 13.9833 10.2602 14.0022 10.8158L14.134 15.3547C14.1528 15.8915 14.4542 16.1928 14.9815 16.1928ZM14.9815 19.3192C15.5936 19.3192 16.0927 18.8766 16.0927 18.2739C16.0927 17.6807 15.603 17.2381 14.9815 17.2381C14.3694 17.2381 13.8703 17.6807 13.8703 18.2739C13.8703 18.8672 14.3788 19.3192 14.9815 19.3192Z"
              fill="#111111"
            />
          </svg>
          {t('prices.info')}
        </div>

        <div className="flex flex-col gap-2.5 max-[920px]:gap-8">
          <div className="bg-[#F3F1F1] rounded-2xl p-6 grid grid-cols-4 items-center gap-5 max-[920px]:hidden">
            <p>{t('prices.dates')}</p>
            <p>{t('prices.number')}</p>
            <p>{t('prices.pp')}</p>
          </div>
          {filteredPrices.length > 0 ? (
            <>
              <AnimatePresence initial={false}>
                {filteredPrices.slice(0, limit).map((price, index) => (
                  <div key={index}>
                    <TourDescTopCard
                      price={price}
                      index={index}
                      tour={tour}
                      handleBookingData={handleBookingData}
                    />
                    <TourMobileCard
                      price={price}
                      index={index}
                      tour={tour}
                      handleBookingData={handleBookingData}
                    />
                  </div>
                ))}
              </AnimatePresence>
              {filteredPrices.length > 0 && filteredPrices.length >= limit && (
                <button
                  className="cursor-pointer px-5 py-3 transition-all duration-300 bg-[#ECEEED] hover:bg-[#E8E8E8] border border-[#DCDCDC] text-black rounded-full flex items-center justify-center gap-2.5 self-center"
                  onClick={() =>
                    limit === filteredPrices.length ? setLimit(3) : setLimit(filteredPrices.length)
                  }
                >
                  {t(
                    limit === filteredPrices.length
                      ? 'prices.hide_all_dates'
                      : 'prices.show_all_dates',
                  )}
                  {limit === filteredPrices.length ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              )}
            </>
          ) : (
            <AnimatePresence initial={false}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-6 grid grid-cols-4 items-center gap-5"
              >
                {t('prices.no_results')}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    )
  );
};
