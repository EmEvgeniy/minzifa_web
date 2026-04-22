'use client';

import FormattedPrice from '@/components/UI/FormattedPrice/FormattedPrice';
import { Tour } from '../_types';
import { useGroupTourBooking } from '@/hooks/useGroupTourBooking';
import { useTranslations } from 'next-intl';
import Button from '@/components/UI/Button/Button';
import { usePrivateTourFormStore } from '@/store/privateTourFormStore';
import { useAuthStore } from '@/store/useAuthStore';

export default function MobileBtn({ locale, tour }: { locale: string; tour: Tour }) {
  const t = useTranslations('tourDetail');

  const { selectedPrice, totalPrice, handleBooking } = useGroupTourBooking({ tour, locale });

  const { setPopup } = usePrivateTourFormStore();
  const { isAuthenticated, setAuthPopup } = useAuthStore();

  const isGroup = tour?.tour_type === 'group';

  const price = isGroup
    ? (totalPrice || selectedPrice?.price_for_double || tour?.prices?.data?.[0]?.price_for_double)
    : (tour?.prices?.price_for_3_hotels || tour?.prices?.price_for_4_hotels || tour?.prices?.price_for_5_hotels);

  const handleClick = () => {
    if (!isAuthenticated) {
      setAuthPopup(true);
      return;
    }
    if (isGroup) {
      handleBooking();
    } else {
      setPopup(true);
    }
  };

  return (
    <div className="container  bg-[#16372D] sticky bottom-0 z-50 text-white py-5 w-full hidden items-center justify-between max-[920px]:flex gap-5">
      <div className="text-base w-full flex flex-col">
        {!!price && (
          <FormattedPrice
            price={price}
            currency={tour?.prices?.valute || 'UZS'}
            className="text-[16px] font-semibold"
            as={'span'}
          />
        )}
        {t('booking.per_person')}
      </div>
      <Button
        color='primary'
        className='w-full'
        onClick={handleClick}
      >
        {isGroup ? t('booking.button', { count: 1 }) : t('privateTour.freeConsultation')}
      </Button>
    </div>
  );
}
