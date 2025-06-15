'use client';
import { FormattedPrice } from '@/components/UI/FormattedPrice/FormattedPrice';
import { useBookingStore } from '@/store/bookingStore';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

export const MobileBtn = () => {
  const t = useTranslations('Tour');
  const locale = useLocale();
  const { tour } = useBookingStore((state) => state);
  return (
    <div className="container  bg-[#16372D] sticky bottom-0 z-50 text-white py-5 w-full hidden items-center justify-between max-[920px]:flex gap-5">
      <div className="text-base w-full flex flex-col">
        {t('prices.pp')}{' '}
        <FormattedPrice
          price={tour?.prices[0]?.price_for_single}
          currency={tour?.prices[0]?.valute}
          className="text-[16px] font-semibold"
          as={'span'}
        />
      </div>
      <Link
        href={`/${locale}/booking/${tour?.slug}`}
        className="text-center w-full rounded-4xl bg-[#27A430] text-white px-4 py-2 max-w-[150px] cursor-pointer transition-all duration-300 hover:bg-[#208B28]"
      >
        {t('booking.button', { count: 1 })}
      </Link>
    </div>
  );
};
