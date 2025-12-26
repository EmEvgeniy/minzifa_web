'use client';

import dynamic from 'next/dynamic';
import { Tour } from '../_types';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { PrivatePriceIcon } from '@/assets/img';
import { useTranslations } from 'next-intl';

const GroupPricesForm = dynamic(() => import('./GroupPricesForm'));
const PrivatePriceForm = dynamic(() => import('./PrivatePriceForm'));

interface TourBookingWrapperProps {
  tour: Tour;
}

export default function TourBookingWrapper({ tour }: TourBookingWrapperProps) {
  const t = useTranslations('tourDetail');
  return tour.tour_type === 'group' ? (
    <GroupPricesForm tour={tour} />
  ) : (
    <div className={'flex flex-col gap-2'}>
      <div className="bg-white p-4 rounded-2xl flex items-center gap-3 justify-center text-base font-semibold">
        <ImageWithFallback
          src={PrivatePriceIcon}
          width={100}
          height={100}
          className="w-6 h-6"
          alt={tour?.seo_metadata.title}
        />
        {t('privateTour.perTourist', { days: tour?.days })}
      </div>
      <PrivatePriceForm tour={tour} />
    </div>
  );
}
