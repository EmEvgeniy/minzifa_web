import { useTranslations } from 'next-intl';
import React from 'react';
import { Wrapper } from './Wrapper';

export const Adventure = () => {
  const t = useTranslations('home');

  return (
    <section className="container my-[70px] flex flex-col gap-5">
      <h5 className="text-[42px]">{t('adventure_title')}</h5>
      <Wrapper />
    </section>
  );
};
