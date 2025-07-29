'use client';

import { cn, date_end, formatted_date } from '@/utils/utils';
import { Price, Tour } from '../_types';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { FormattedPrice } from '@/components/UI/FormattedPrice/FormattedPrice';
import Counter from '@/components/UI/Counter/Counter';
import { useBookingStore } from '@/store/bookingStore';
import { useRouter } from 'next/navigation';
import TourBookingPrice from './TourBookingPrice';

interface TourBookingProps {
  prices: Price[] | undefined;
  className?: string;
  tour: Tour;
}

export default function TourBooking({ prices, className, tour }: TourBookingProps) {
  const t = useTranslations('Tour');
  const locale = useLocale();

  const router = useRouter();

  const [travellers, setTravellers] = useState<number>(1);
  const [selectedPrice, setSelectedPrice] = useState<Price | undefined>(undefined);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { setBookingData } = useBookingStore((state) => state);

  const handleBookingData = (
    selectedPrice: Price | undefined,
    totalPrice: number,
    travellers: number,
  ) => {
    if (!tour || !selectedPrice) return;
    setBookingData({
      passengers: [],
      tour_name: tour.name,
      tour_start: formatted_date(selectedPrice.date_start, locale),
      tour_end: date_end(selectedPrice.date_start, locale, tour.days || tour?.itineraries.length),
      travellers_count: travellers,
      tour_price: selectedPrice.price_for_double,
      deposit: totalPrice * 0.15,
      total_price: totalPrice,
      payment_type: 'cash',
      payment_status: 'pending',
      single_price: selectedPrice.price_for_single,
      currency: selectedPrice.valute,
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
      currency: selectedPrice.valute,
      total_seats: selectedPrice.tour_total_seats.toString(),
    });
    router.push(`/${locale}/booking/${tour?.slug}?${params.toString()}`);
  };

  useEffect(() => {
    if (!prices) return;
    setSelectedPrice(prices[0]);
    setTotalPrice(prices[0]?.price_for_double);
  }, [prices]);

  if (!prices) return null;

  return (
    <div className={cn(className, 'sticky top-36 ')}>
      <div className="bg-white rounded-2xl p-6 flex flex-col gap-5">
        <div className="text-base">
          {t('booking.from')}{' '}
          <FormattedPrice
            price={totalPrice}
            currency={selectedPrice?.valute}
            className="text-4xl font-semibold"
            as={'span'}
            minimumFractionDigits={0}
          />
        </div>
        <div className="text-base">{t('booking.per_tourist', { days: tour?.days || 1 })}</div>
        <TourBookingPrice
          setTotalPrice={setTotalPrice}
          locale={locale}
          travellers={travellers}
          prices={prices}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
        />
        <Counter
          min={1}
          max={10}
          value={travellers}
          onChange={(value) => {
            setTravellers(value);
            setTotalPrice((selectedPrice?.price_for_double || 0) * value);
          }}
          className="border border-gray-300 rounded-2xl p-3"
          label={t('booking.travellers')}
        />

        <button
          onClick={() => handleBookingData(selectedPrice, totalPrice, travellers)}
          className="text-center w-full rounded-4xl bg-[#27A430] text-white p-4 cursor-pointer transition-all duration-300 hover:bg-[#208B28]"
        >
          {t('booking.button')}
        </button>
      </div>
    </div>
  );
}
