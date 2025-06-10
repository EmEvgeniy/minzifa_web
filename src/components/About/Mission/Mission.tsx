import { useTranslations } from 'next-intl';
import React from 'react';

export const Mission = () => {
  const t = useTranslations('about');
  return (
    <section className="container my-[70px] flex flex-col gap-8">
      <h4 className="text-[42px] text-[#16372D]">{t('mission_title')}</h4>
      <div className="grid grid-cols-2 gap-5 text-[18px] text-[#16372D]">
        <p>{t('mission_text')}</p>
        <p>{t('mission_text3')}</p>
        <p>{t('mission_text2')}</p>
        <p>{t('mission_text4')}</p>
      </div>
    </section>
  );
};
