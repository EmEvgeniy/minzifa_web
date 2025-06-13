import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { useTranslations } from 'next-intl';
import React from 'react';

export const Main = () => {
  const t = useTranslations();

  return (
    <section className="container pt-[12%] h-full">
      <Breadcrumbs />
      <div className="w-full h-full flex flex-col items-start gap-5 pt-[30px]">
        <h1 className="text-[56px] font-semibold">{t('hotel-booking-rules.title')}</h1>
        <p className="text-[24px] font-semibold">{t('hotel-booking-rules.sub_title')}</p>
        <p className="text-[18px] ">{t('hotel-booking-rules.text')}</p>
        <p className="text-[24px] font-semibold">{t('hotel-booking-rules.sub_title2')}</p>
        <p className="text-[18px] ">{t('hotel-booking-rules.text2')}</p>
        <p className="text-[24px] font-semibold">{t('hotel-booking-rules.sub_title3')}</p>
        <p className="text-[18px] ">{t('hotel-booking-rules.text3')}</p>
        <p className="text-[24px] font-semibold">{t('hotel-booking-rules.sub_title4')}</p>
        <p className="text-[18px] ">{t('hotel-booking-rules.text4')}</p>
      </div>
    </section>
  );
};
