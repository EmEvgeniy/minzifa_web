'use client';

import { useTranslations } from 'next-intl';
import { Include } from '../_types';
import dynamic from 'next/dynamic';

import IconInfo from '../../../assets/icons/booking/exclamationmark.circle.svg';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';

const TourIncludesInner = dynamic(() => import('./TourIncludesInner'));

export default function TourIncludes({ includes }: { includes: Include[] | undefined; }) {
  const t = useTranslations('tourDetail');
  const categories = t.raw('includes.categories') as {
    accommodation: string;
    meals: string;
    transfer: string;
    tickets: string;
    guide: string;
    additional_service: string;
    airway_tickets: string;
    'off-plan meals': string;
    visa: string;
    insurance: string;
    personal_expenses: string;
  };

  if (!includes) return null;

  return (
    <div className="flex flex-col gap-5 md:col-start-1 mb-5">
      <h2 className="text-4xl font-semibold text-black max-[920px]:text-[30px] max-[550px]:text-[24px]">
        {t('includes.title')}
      </h2>
      <TourIncludesInner
        includes={includes}
        pl={t('includes.include')}
        pl2={t('includes.exclude')}
        pl3={categories}
      />
      <div className="bg-[#E2FFF4] p-5 rounded-2xl flex flex-row gap-2.5 items-center text-lg max-[920px]:text-[12px] max-[550px]:p-2.5 max-[550px]:text-[12px]">
        <ImageWithFallback
          src={IconInfo}
          alt="info"
          width={30}
          height={30}
          className="w-5 h-5 md:w-7.5 md:h-7.5"
        />
        <span>{t('includes.hint')}</span>
      </div>
    </div>
  );
}
