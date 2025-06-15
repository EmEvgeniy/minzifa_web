import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { useTranslations } from 'next-intl';
import React from 'react';

export const Main = () => {
  const t = useTranslations();

  return (
    <section className="container pt-[150px] flex flex-col gap-5 pb-[70px] max-[768px]:pt-[100px] max-[550px]:pt-[100px]">
      <Breadcrumbs />
      <h1 className="text-[42px] max-[1024px]:text-[30px] max-[550px]:text-[24px] max-[550px]:font-semibold font-title">
        {t('terms_and_conditions_of_booking.title')}
      </h1>
      <div
        dangerouslySetInnerHTML={{ __html: t('terms_and_conditions_of_booking.text') || '' }}
        className="text-[18px] max-[550px]:text-[14px]"
      />
    </section>
  );
};
