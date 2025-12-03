'use client';

import dynamic from 'next/dynamic';
import { Hotel } from '../_types';
import { useTranslations } from 'next-intl';
const TourAccomodationInner = dynamic(() => import('./TourAccomodationInner'));

export default function TourAccomodation({ hotels }: { hotels: Hotel[] | undefined; }) {
  const t = useTranslations('Tour');

  if (!hotels || hotels.length === 0) return null;

  return (
    <div className="flex flex-col gap-5 md:col-start-1 my-4 md:my-0">
      <h2 className="text-4xl font-semibold text-black mb-5 max-[920px]:text-[30px] max-[550px]:text-[24px] max-[550px]:mb-3">
        {t('hotel.title')}
      </h2>
      <TourAccomodationInner hotels={hotels} />
    </div>
  );
}
