'use client';

import { BookingFormType } from '@/validation/bookingFormSchema';
import { UseFormSetValue } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
const TravellersCounter = dynamic(() => import('./TravellersCounter'));

export default function Travellers({ bookingData, setValue }: { bookingData: BookingFormType; setValue: UseFormSetValue<BookingFormType> }) {
  const t = useTranslations('booking');

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-[#16372D] col-span-1 mb-4 text-3xl md:col-span-2 max-[768px]:text-[24px] max-[768px]:text-center">
        {t('travellers.title')}
      </h2>
      <div className="grid grid-cols-1">
        <div className="rounded-2xl flex items-center justify-between bg-white p-5">
          <span className="text-lg font-normal">{t('travellers.person')}</span>
          <TravellersCounter bookingData={bookingData} setValue={setValue} />
        </div>
      </div>
    </div>
  );
}
