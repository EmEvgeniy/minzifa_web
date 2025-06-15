import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { useTranslations } from 'next-intl';
import React from 'react';

export const Main = () => {
  const t = useTranslations();

  return (
    <section className="container py-[150px] flex flex-col gap-5 max-[768px]:py-[100px]">
      <Breadcrumbs />
      <h1 className="text-[42px] max-[768px]:text-[30px] max-[550px]:text-[24px] font-title">
        {t('privacy.title')}
      </h1>
      <div
        dangerouslySetInnerHTML={{ __html: t('privacy.text') || '' }}
        className="text-[18px] max-[550px]:text-[14px]"
      />
    </section>
  );
};
