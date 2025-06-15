'use client';
import { usePostMutation } from '@/api/post.api';
import { useSnackStore } from '@/components/UI/CustomSnackBar/store';
import { FormattedPrice } from '@/components/UI/FormattedPrice/FormattedPrice';
import { BookingTourData, useBookingStore } from '@/store/bookingStore';
import { useLocale, useTranslations } from 'next-intl';
import React, { useCallback } from 'react';

export const MobileBtn = () => {
  const t = useTranslations('Booking');
  const { bookingData } = useBookingStore((state) => state);
  const locale = useLocale();

  const { setMessage, setError } = useSnackStore((state) => state);

  const { mutate, isPending } = usePostMutation<BookingTourData, BookingTourData>(
    ['subscribe-booking'],
    () => {
      setMessage(locale == 'en' ? 'Your tour was booked!' : 'Ваш тур был забронирован!');
    },
    () => {
      setError(locale == 'en' ? 'Some error was happened' : 'Произошла ошибка');
    },
  );

  const handleSubmit = useCallback(() => {
    if (!isPending) {
      mutate({
        obj: bookingData,
        http: 'forms/booking',
      });
    }
  }, [bookingData, isPending, mutate]);

  return (
    <div className="sticky bottom-0 bg-[#16372D] max-[1024px]:block hidden">
      <div className="container flex items-center justify-between p-5 text-white gap-5">
        <div className="flex justify-start items-start w-2/2 flex-col">
          <span className="text-[14px] text-gray-400">Total (USD)</span>
          <FormattedPrice
            price={bookingData?.total_price ?? 0}
            currency={bookingData?.currency}
            className="text-xl"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={false}
          className="text-center text-[14px] max-w-[200px]  w-full rounded-4xl disabled:bg-[#DDDDDD] disabled:cursor-not-allowed bg-[#27A430] text-white p-2 cursor-pointer transition-all duration-300 hover:bg-[#208B28]"
        >
          {t('button', { count: bookingData?.travellers_count ?? 1 })}
        </button>
      </div>
    </div>
  );
};
