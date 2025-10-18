'use client';

import { GroupPrice, Tour } from '@/components/Tour/_types';
import { useLocale, useTranslations } from 'next-intl';
import { PriceFilter } from '@/components/Tour/TourPrices/components/group/PriceFilter';
import { date_end, formatted_date } from '@/utils';
import { useState } from 'react';
import { useBookingStore } from '@/store';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import IconInfo from '../../../assets/icons/booking/exclamationmark.circle.svg';
import { months } from '@/components/Tour/TourPrices/components/group/months';
import { TourDesktopCard } from './components/group/TourDesktopCard';
import { TourMobileCard } from './components/group/TourMobileCard';

export default function TourGroupPrices({ tour }: { tour: Tour }) {
  const t = useTranslations('Tour');
  const locale = useLocale();

  const router = useRouter();

  const valute = tour?.prices?.valute;

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const { setBookingData } = useBookingStore((state) => state);

  const filteredPrices = tour?.prices?.data?.filter((price) => {
    const date = new Date(price.date_start);
    const yearMatches = selectedYear === null || date.getFullYear() === selectedYear;
    const monthMatches =
      selectedMonth === null || date.getMonth() === months[locale].indexOf(selectedMonth);
    return yearMatches && monthMatches;
  });

  const [limit, setLimit] = useState(5);

  const handleBookingData = (
    selectedPrice: GroupPrice | undefined,
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
      currency: valute,
      total_seats: selectedPrice.tour_total_seats,
    });
    const params = new URLSearchParams({
      tour_name: tour.name,
      tour_start: formatted_date(selectedPrice.date_start, locale),
      tour_end: date_end(selectedPrice.date_start, locale, tour.days || tour?.itineraries.length),
      travellers_count: travellers.toString(),
      tour_price: selectedPrice.price_for_double.toString(),
      deposit: (totalPrice * 0.15).toString(),
      total_price: totalPrice.toString(),
      payment_type: 'cash',
      payment_status: 'pending',
      single_price: selectedPrice.price_for_single.toString(),
      currency: valute,
      total_seats: selectedPrice.tour_total_seats.toString(),
    });
    router.push(`/${locale}/booking/${tour?.slug}?${params.toString()}`);
  };

  return (
    <section className="flex flex-col gap-5 max-[550px]:gap-3">
      <h2 className="text-4xl font-semibold  max-[920px]:text-[24px]">{t('prices.title')}</h2>
      <PriceFilter
        prices={tour?.prices?.data}
        selectedMonth={selectedMonth}
        setSelectedYear={setSelectedYear}
        selectedYear={selectedYear}
        setSelectedMonth={setSelectedMonth}
      />

      <div className="bg-[#E2FFF4] p-5 rounded-2xl flex flex-row gap-2.5 items-center text-lg self-end max-[920px]:p-3 max-[920px]:text-[14px] max-[920px]:gap-1.5 max-[550px]:w-full max-[550px]:p-2">
        <ImageWithFallback
          src={IconInfo}
          alt="info"
          width={24}
          height={24}
          className="w-5 h-5 md:w-6 md:h-6"
        />
        {t('prices.info')}
      </div>

      <div className="flex flex-col gap-2.5 max-[920px]:gap-8">
        <div className="bg-[#F3F1F1] rounded-2xl p-6 grid grid-cols-4 items-center gap-5 max-[920px]:hidden">
          <p>{t('prices.dates')}</p>
          <p>{t('prices.number')}</p>
          <p>{t('prices.pp')}</p>
        </div>
        {filteredPrices ? (
          <>
            <AnimatePresence initial={false}>
              {filteredPrices.slice(0, limit).map((price, index) => (
                <div key={index}>
                  <TourDesktopCard
                    price={price}
                    valute={valute}
                    index={index}
                    days={tour?.days}
                    handleBookingData={handleBookingData}
                  />
                  <TourMobileCard
                    price={price}
                    valute={valute}
                    index={index}
                    days={tour?.days}
                    handleBookingData={handleBookingData}
                  />
                </div>
              ))}
            </AnimatePresence>
            {tour.prices.data && tour.prices.data.length >= limit && (
              <button
                className="cursor-pointer px-5 py-3 transition-all duration-300 bg-[#ECEEED] hover:bg-[#E8E8E8] border border-[#DCDCDC] text-black rounded-full flex items-center justify-center gap-2.5 self-center"
                onClick={() =>
                  limit === tour.prices.data!.length
                    ? setLimit(5)
                    : setLimit(tour.prices.data!.length)
                }
              >
                {t(
                  limit === tour.prices.data?.length
                    ? 'prices.hide_all_dates'
                    : 'prices.show_all_dates',
                )}
                {limit === tour.prices.data?.length ? <FaChevronUp /> : <FaChevronDown />}
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
  );
}
