import { useTranslations } from 'next-intl';
import React from 'react';
import { Wrapper } from './Wrapper';

export const Articles = () => {
  const t = useTranslations('home');

  return (
    <section className="container pb-[70px]">
      <div className="flex flex-col gap-10">
        <h5 className="text-[42px]">{t('articles_title')}</h5>
        <Wrapper />
      </div>
    </section>
  );
};
