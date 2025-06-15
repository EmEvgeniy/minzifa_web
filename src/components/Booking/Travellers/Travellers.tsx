'use client';

import Counter from '@/components/UI/Counter/Counter';
import { useBookingStore } from '@/store/bookingStore';
import { useTranslations } from 'next-intl';

export const Travellers = () => {
  const t = useTranslations('Booking');
  const { bookingData, setBookingData } = useBookingStore((state) => state);

  const handleCount = (value: number) => {
    const tour_price = bookingData?.tour_price as number;

    setBookingData({
      ...bookingData,
      room_types: {},
      adults: value,
      deposit: tour_price * 0.15 * Number(bookingData.travellers_count),
      total_price: tour_price * Number(bookingData.travellers_count),
    });
  };
  const handleCount2 = (value: number) => {
    const tour_price = bookingData?.tour_price as number;

    setBookingData({
      ...bookingData,
      room_types: {},
      childrens: value,
      deposit: tour_price * 0.15 * Number(bookingData.travellers_count),
      total_price: tour_price * Number(bookingData.travellers_count),
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-[#16372D] col-span-1 mb-4 text-3xl md:col-span-2 max-[768px]:text-[24px] max-[768px]:text-center">
        {t('travellers.title')}
      </h2>
      <div className="grid grid-cols-1">
        <div className="rounded-2xl flex items-center justify-between bg-white p-5">
          <span className="text-lg font-normal">{t('travellers.person')}</span>
          <Counter
            value={bookingData?.adults as number}
            onChange={handleCount}
            label=""
            max={bookingData?.total_seats}
          />
        </div>
        <div className="rounded-2xl flex items-center justify-between bg-white p-5">
          <span className="text-lg font-normal">{t('travellers.child')}</span>
          <Counter
            value={bookingData?.childrens as number}
            onChange={handleCount2}
            label=""
            max={bookingData?.total_seats}
          />
        </div>
      </div>
    </div>
  );
};
