import { useTranslations } from 'next-intl';
import React from 'react';
import { Wrapper } from './Wrapper';

export default function BestSellers() {
  const t = useTranslations('home');
  return (
    <section className="container flex flex-col gap-5">
      <h3 className="text-[42px] [@media(max-width:768px)]:text-[24px]">{t('best_title')}</h3>
      <Wrapper />
    </section>
  );
}
