'use client';
import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { FormattedPrice } from '@/components/UI/FormattedPrice/FormattedPrice';
import { GroupPrice, Tour } from '../_types';
import { useLocale, useTranslations } from 'next-intl';
import { date_end } from '@/utils/utils';
import Image from 'next/image';
import { airplane } from '@/assets/icons';

type TourDescTopCardType = {
  price: GroupPrice;
  index: number;
  tour: Tour;
  handleBookingData: (
    selectedPrice: GroupPrice | undefined,
    totalPrice: number,
    travellers: string,
  ) => void;
};

export const TourMobileCard: FC<TourDescTopCardType> = ({
  price,
  index,
  tour,
  handleBookingData,
}) => {
  const t = useTranslations('Tour');
  const locale = useLocale();
  return (
    <motion.div
      key={price.date_start + index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="hidden grid-cols-1 items-center gap-1 max-[920px]:grid"
    >
      <div className="bg-white p-3 rounded-[16px] min-h-[100px] flex flex-col items-center justify-center">
        {price.is_best_price ||
          (index === 2 && (
            <p className="text-sm text-[#16372D] bg-[#87EEC7] text-center p-2 rounded-[16px]">
              {t('prices.best_price')}
            </p>
          ))}
        {price.is_best_price || (index === 2 && <hr className="border-gray-200 w-full my-2" />)}
        <div className="flex items-center justify-between gap-2 w-full">
          <p className="flex flex-col">
            <span className="text-gray-400 text-[12px]">{locale == 'en' ? 'Start' : 'Начало'}</span>
            <span>{price.date_start}</span>
          </p>
          <Image src={airplane} alt="icon" width={70} height={70} />
          <p className="flex flex-col">
            <span className="text-gray-400 text-[12px]">{locale == 'en' ? 'Finish' : 'Конец'}</span>
            <span>{date_end(price.date_start, locale, tour?.days)}</span>
          </p>
        </div>
      </div>
      <div className="bg-white p-3 rounded-[16px] min-h-[150px] gap-3 flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full">
          <p className="flex flex-col">
            <span className="text-gray-400 text-[12px]">
              {locale == 'en' ? 'Number of people' : 'Кол-во людей'}
            </span>
            <span>{t('prices.seats', { count: price.tour_total_seats })}</span>
          </p>
          <p className="flex flex-col">
            <span className="line-through text-[14px] text-[#333333]/50">
              <FormattedPrice price={price.sale_price} currency={price.valute} />
            </span>
            <span className="text-[#333333] text-[18px] font-semibold">
              <FormattedPrice price={price.price_for_double} currency={price.valute} />
            </span>
          </p>
        </div>
        <button
          onClick={() => handleBookingData(price, price.price_for_double, String(1))}
          className="w-full rounded-4xl bg-[#27A430] text-white p-2 cursor-pointer text-[14px] transition-all duration-300 hover:bg-[#208B28]"
        >
          {t('booking.button', { count: 1 })}
        </button>
      </div>
    </motion.div>
  );
};
