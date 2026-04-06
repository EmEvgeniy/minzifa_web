'use client';
import React, { FC } from 'react';
import { motion } from 'framer-motion';
import FormattedPrice from '@/components/UI/FormattedPrice/FormattedPrice';
import { GroupPrice } from '../../../_types';
import { useLocale, useTranslations } from 'next-intl';
import { date_end, formatted_date } from '@/utils/utils';

type TourDesktopCardType = {
  price: GroupPrice;
  index: number;
  days: number;
  valute: string;
  handleBookingData: (
    selectedPrice: GroupPrice | undefined,
    totalPrice: number,
    travellers: string,
  ) => void;
};

export const TourDesktopCard: FC<TourDesktopCardType> = ({
  price,
  index,
  days,
  valute,
  handleBookingData,
}) => {
  const t = useTranslations('tourDetail');
  const locale = useLocale();
  const soldOut = price.tour_total_seats <= 0;

  return (
    <motion.div
      key={price.date_start + index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      title={soldOut ? t('prices.unavailable_hint') : undefined}
      className={`rounded-2xl p-6 grid grid-cols-4 items-center gap-5 max-[920px]:hidden ${
        soldOut
          ? 'border border-dashed border-neutral-300 bg-neutral-50 text-neutral-600'
          : 'bg-white'
      }`}
    >
      <p className={`flex flex-col gap-2.5 ${soldOut ? 'opacity-80' : ''}`}>
        {formatted_date(price.date_start, locale)}
        <span>{date_end(price.date_start, locale, days)}</span>
      </p>
      <p className={soldOut ? 'text-neutral-500' : ''}>
        {t('prices.seats', { count: price.tour_total_seats })}
      </p>
      <div className={`flex flex-col items-start gap-2.5 ${soldOut ? 'opacity-75' : ''}`}>
        {price.is_best_price ? (
          <p className="text-sm text-[#16372D] bg-[#87EEC7] rounded-lg p-2.5">
            {t('prices.best_price')}
          </p>
        ) : null}
        <div className="flex flex-row gap-2.5 items-end w-full">
          <p className="text-[#333333] text-3xl font-semibold">
            <FormattedPrice price={price.price_for_double} currency={valute} />
          </p>
          <p className="line-through text-base text-[#333333]/50">
            <FormattedPrice price={price.sale_price} currency={valute} />
          </p>
        </div>
      </div>
      {soldOut ? (
        <p className="w-full text-center font-semibold text-neutral-500 py-4 select-none">
          {t('prices.sold_out')}
        </p>
      ) : (
        <button
          type="button"
          onClick={() => handleBookingData(price, price.price_for_double, String(1))}
          className="w-full rounded-4xl bg-[#27A430] text-white p-4 cursor-pointer transition-all duration-300 hover:bg-[#208B28]"
        >
          {t('booking.button', { count: 1 })}
        </button>
      )}
    </motion.div>
  );
};
