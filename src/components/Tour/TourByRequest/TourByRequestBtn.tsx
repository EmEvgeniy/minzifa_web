'use client';

import { useLocale } from 'next-intl';
import { useTourPrivateModalStore } from '@/store/useTourPrivateModalStore';
import { Tour } from '../_types';

function TourByRequestBtn({ title, tour }: { title: string; tour?: Tour }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const locale = useLocale();
  const { open, setPriceOptions } = useTourPrivateModalStore();

  const handleClick = () => {
    if (tour?.prices) {
      // Создаем опции цен на основе данных тура
      const priceOptions = [];

      if (tour.prices.price_for_3_hotels) {
        priceOptions.push({
          value: '3_hotels',
          label: `3 звезды - ${tour.prices.price_for_3_hotels}${tour.prices.valute || 'UZS'}`,
        });
      }

      if (tour.prices.price_for_4_hotels) {
        priceOptions.push({
          value: '4_hotels',
          label: `4 звезды - ${tour.prices.price_for_4_hotels}${tour.prices.valute || 'UZS'}`,
        });
      }

      if (tour.prices.price_for_5_hotels) {
        priceOptions.push({
          value: '5_hotels',
          label: `5 звезд - ${tour.prices.price_for_5_hotels}${tour.prices.valute || 'UZS'}`,
        });
      }

      // Устанавливаем опции цен в стор
      setPriceOptions(priceOptions);
    }

    open();
  };
  return (
    <button
      onClick={handleClick}
      className="text-center w-full rounded-4xl bg-[#27A430] text-white p-4 cursor-pointer transition-all duration-300 hover:bg-[#208B28] max-[550px]:p-3 max-[550px]:text-[14px]"
    >
      {title}
    </button>
  );
}

export default TourByRequestBtn;
