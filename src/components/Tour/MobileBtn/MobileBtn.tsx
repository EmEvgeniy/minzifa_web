'use client';

import FormattedPrice from '@/components/UI/FormattedPrice/FormattedPrice';
import { Tour } from '../_types';
import { useGroupTourBooking } from '@/hooks/useGroupTourBooking';
import { useTranslations } from 'next-intl';
import Button from '@/components/UI/Button/Button';
import { usePrivateTourFormStore } from '@/store/privateTourFormStore';

export default function MobileBtn({ locale, tour }: { locale: string; tour: Tour }) {
  const t = useTranslations('Tour');

  const { selectedPrice, handleBooking } = useGroupTourBooking({ tour, locale });

  const { setPopup } = usePrivateTourFormStore();

  const price =
    tour?.tour_type === 'group'
      ? selectedPrice?.price_for_double
      : tour?.prices?.price_for_3_hotels;

  return (
    <div className="container  bg-[#16372D] sticky bottom-0 z-50 text-white py-5 w-full hidden items-center justify-between max-[920px]:flex gap-5">
      <div className="text-base w-full flex flex-col">
        <FormattedPrice
          price={price}
          currency={tour?.prices?.valute || 'UZS'}
          className="text-[16px] font-semibold"
          as={'span'}
        />
        {t('booking.per_person')}
      </div>
      <Button
        to={`/${locale}/booking/${tour?.slug}`}
        color='primary'
        className='w-full'
        onClick={tour?.tour_type === 'group' ? () => handleBooking() : () => setPopup(true)}
      >
        {t('booking.button', { count: 1 })}
      </Button>
    </div>
  );
}
