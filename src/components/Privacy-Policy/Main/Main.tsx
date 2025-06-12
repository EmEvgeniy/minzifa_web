import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { useTranslations } from 'next-intl';
import React from 'react';

export const Main = () => {
  const t = useTranslations();

  return (
    <section className="container py-[10%] flex flex-col gap-5">
      <Breadcrumbs link={{ link: '', title: t('breadcrumbs.privacy') }} />
      <h1 className="text-[42px]">{t('privacy.title')}</h1>
      <div dangerouslySetInnerHTML={{ __html: t('privacy.text') || '' }} className="text-[18px]" />
    </section>
  );
};
