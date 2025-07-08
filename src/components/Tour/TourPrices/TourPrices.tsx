'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Price, Tour } from '../_types';
import { useState } from 'react';
import { date_end, formatted_date } from '@/utils/utils';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingStore } from '@/store/bookingStore';
import { useRouter } from 'next/navigation';
import { TourDescTopCard } from './TourDescTopCard';
import { TourMobileCard } from './TourMobileCard';

import IconCalendar from '../../../assets/icons/booking/calendar.svg';
import Image from 'next/image';

// const months: { [key in 'en' | 'ru']: string[] } = {
//   en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//   ru: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
// };

export default function TourPrices({ tour }: { tour: Tour }) {
  const t = useTranslations('Tour');
  const locale = useLocale() as 'en' | 'ru';

  const router = useRouter();

  const { setBookingData } = useBookingStore((state) => state);

  // const [selectedYear, setSelectedYear] = useState<number | null>(null);
  // const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  // const [years, setYears] = useState<number[]>([]);

  const [limit, setLimit] = useState(5);

  // useEffect(() => {
  //   if (!tour?.prices) return;
  //   const uniqueYears = Array.from(
  //     new Set(tour?.prices.map((price) => new Date(price.date_start).getFullYear())),
  //   );
  //   setYears(uniqueYears);
  //   setSelectedYear(uniqueYears[0]);
  // }, [tour?.prices]);

  // useEffect(() => {
  //   if (selectedYear !== null) {
  //     setSelectedMonth(null);
  //   }
  // }, [selectedYear]);

  if (!tour?.prices) return;

  // const filteredPrices = tour?.prices.filter((price) => {
  //   const date = new Date(price.date_start);
  //   const yearMatches = selectedYear === null || date.getFullYear() === selectedYear;
  //   const monthMatches =
  //     selectedMonth === null || date.getMonth() === months[locale].indexOf(selectedMonth);
  //   return yearMatches && monthMatches;
  // });

  const handleBookingData = (
    selectedPrice: Price | undefined,
    totalPrice: number,
    travellers: string,
  ) => {
    if (!tour || !selectedPrice) return;
    setBookingData({
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
    tour.prices.length > 0 && (
      <section className="flex flex-col gap-5 max-[550px]:gap-3">
        <h2 className="text-4xl font-semibold  max-[920px]:text-[24px]">{t('prices.title')}</h2>
        {/* 
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
        </div> */}

        <div className="bg-[#E2FFF4] p-5 rounded-2xl flex flex-row gap-2.5 items-center text-lg self-end max-[920px]:p-3 max-[920px]:text-[14px] max-[920px]:gap-1.5 max-[550px]:w-full max-[550px]:p-2">
          <Image src={IconCalendar} alt="" />
          {t('prices.info')}
        </div>

        <div className="flex flex-col gap-2.5 max-[920px]:gap-8">
          <div className="bg-[#F3F1F1] rounded-2xl p-6 grid grid-cols-4 items-center gap-5 max-[920px]:hidden">
            <p>{t('prices.dates')}</p>
            <p>{t('prices.number')}</p>
            <p>{t('prices.pp')}</p>
          </div>
          {tour.prices.length > 0 ? (
            <>
              <AnimatePresence initial={false}>
                {tour.prices.slice(0, limit).map((price, index) => (
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
              {tour.prices.length > 0 && tour.prices.length >= limit && (
                <button
                  className="cursor-pointer px-5 py-3 transition-all duration-300 bg-[#ECEEED] hover:bg-[#E8E8E8] border border-[#DCDCDC] text-black rounded-full flex items-center justify-center gap-2.5 self-center"
                  onClick={() =>
                    limit === tour.prices.length ? setLimit(3) : setLimit(tour.prices.length)
                  }
                >
                  {t(
                    limit === tour.prices.length
                      ? 'prices.hide_all_dates'
                      : 'prices.show_all_dates',
                  )}
                  {limit === tour.prices.length ? <FaChevronUp /> : <FaChevronDown />}
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
}
