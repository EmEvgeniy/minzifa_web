'use client';

import { cn, date_end } from '@/utils/utils';
import { Price } from '../_types';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { FormattedPrice } from '@/components/UI/FormattedPrice/FormattedPrice';
import { Dropdown, DropdownDetails, DropdownSummary } from '@/components/UI/Dropdown/Dropdown';
import Counter from '@/components/UI/Counter/Counter';
import { useBookingStore } from '@/store/bookingStore';
import { useRouter } from 'next/navigation';
import IconCalendar from '../../../assets/icons/booking/calendar.svg';
import Image from 'next/image';

interface TourBookingProps {
  prices: Price[] | undefined;
  className?: string;
}

export const TourBooking = ({ prices, className }: TourBookingProps) => {
  const t = useTranslations('Tour');
  const locale = useLocale();

  const router = useRouter();

  const [travellers, setTravellers] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState<Price | undefined>(undefined);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { tour, setBookingData } = useBookingStore((state) => state);

  const handleBookingData = (
    selectedPrice: Price | undefined,
    totalPrice: number,
    travellers: string,
  ) => {
    if (!tour || !selectedPrice) return;
    setBookingData({
      passengers: [],
      adults: 1,
      childrens: 1,
      tour_name: tour.name,
      tour_start: selectedPrice.date_start,
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
          />
        </div>
        <div className="text-base">{t('booking.per_tourist', { days: tour?.days || 1 })}</div>

        <Dropdown>
          <DropdownSummary className="flex flex-row justify-between items-center gap-1.5 border border-gray-300 rounded-2xl p-3 relative cursor-pointer">
            {() => (
              <div className="flex flex-row items-center gap-2">
                <Image src={IconCalendar} width={24} height={24} alt="calendar" />
                <div>{selectedPrice?.date_start}</div>
              </div>
            )}
          </DropdownSummary>
          <DropdownDetails>
            {({ isOpen, toggle }) => (
              <div className="flex flex-col overflow-hidden overflow-y-auto max-h-[300px]">
                {prices.length > 0 &&
                  prices.map((price) => (
                    <div
                      key={price.date_start}
                      onClick={() => {
                        setSelectedPrice(price);
                        setTotalPrice(price.price_for_double * travellers);
                        toggle(!isOpen);
                      }}
                      className="px-5 py-3 flex flex-row justify-between items-center gap-1.5 hover:bg-gray-100 cursor-pointer"
                    >
                      <div>{price.date_start}</div>
                      <div className="text-[#27A430]">
                        <FormattedPrice price={price.price_for_double} currency={price.valute} />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </DropdownDetails>
        </Dropdown>

        <Counter
          min={1}
          max={10}
          value={travellers}
          onChange={(value) => {
            setTravellers(value);
            setTotalPrice((selectedPrice?.price_for_double || 0) * value);
          }}
          className="border border-gray-300 rounded-2xl p-3"
        />

        <button
          onClick={() => handleBookingData(selectedPrice, totalPrice, String(travellers))}
          className="text-center w-full rounded-4xl bg-[#27A430] text-white p-4 cursor-pointer transition-all duration-300 hover:bg-[#208B28]"
        >
          {t('booking.button', { count: travellers })}
        </button>
      </div>
    </div>
  );
};
