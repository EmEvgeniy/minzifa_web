'use client';

import Button from '@/components/UI/Button/Button';
import FormattedPrice from '@/components/UI/FormattedPrice/FormattedPrice';
import { useFormSubmit, useRecaptcha } from '@/hooks';
import { BookingFormType } from '@/validation/bookingFormSchema';
import { useTranslations } from 'next-intl';

export default function MobileBtn({ bookingData }: { bookingData: BookingFormType }) {
  const t = useTranslations('Booking');

  const { isSubmitting } = useFormSubmit();

  const { token } = useRecaptcha();

  return (
    <div className="sticky bottom-0 bg-[#16372D] max-[1024px]:block hidden">
      <div className="container flex items-center justify-between p-5 text-white gap-5">
        <div className="flex justify-start items-start w-2/2 flex-col">
          <span className="text-[14px] text-gray-400">
            {t('booking_info.total')} (USD)
          </span>
          <FormattedPrice
            price={bookingData?.total_price}
            currency={bookingData?.currency}
            className="text-xl"
          />
        </div>

        <Button
          form="booking-form"
          type="submit"
          className="w-full"
          disabled={isSubmitting || !token}
        >
          <span>{t('button')}</span>
        </Button>
      </div>
    </div>
  );
}
