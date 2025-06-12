import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { useTranslations } from 'next-intl';
import React from 'react';

export const Main = () => {
  const t = useTranslations();

  return (
    <section className="container pt-[10%] flex flex-col gap-5 pb-[70px]">
      <Breadcrumbs link={{ link: '', title: t('breadcrumbs.terms_and_conditions_of_booking') }} />
      <h1 className="text-[42px]">{t('terms_and_conditions_of_booking.title')}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: t('terms_and_conditions_of_booking.text') || '' }}
        className="text-[18px]"
      />
    </section>
  );
};
