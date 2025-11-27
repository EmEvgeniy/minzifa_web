'use client';

import { UseFormSetValue } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import RoomTypesInner from './RoomTypesInner';
import { BookingFormType } from '@/validation/bookingFormSchema';

export default function RoomTypes({ bookingData, setValue }: { bookingData: BookingFormType; setValue: UseFormSetValue<BookingFormType> }) {
  const t = useTranslations('Booking');
  const roomTypes = t.raw('roomTypes') as {
    title: string;
    standart: string;
    standart_hint: string;
    single: string;
    single_hint: string;
    pt: string;
  };

  return (
    <div className="flex flex-col gap-5 col-span-2 max-[550px]:col-span-1">
      <h2 className="text-[#16372D] text-3xl max-[768px]:text-[24px] max-[768px]:text-center">
        {t('roomTypes.title')}
      </h2>
      <RoomTypesInner bookingData={bookingData} title={roomTypes} setValue={setValue} />
    </div>
  );
}
