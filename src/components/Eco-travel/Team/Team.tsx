import { useTranslations } from 'next-intl';
import React from 'react';

export const Team = () => {
  const t = useTranslations('eco');
  return (
    <section className="container py-[70px] flex flex-col gap-10">
      <h2 className="text-[42px] text-[#16372D] text-center">{t('team.title')}</h2>
      <div className="w-full flex flex-col gap-5 text-[18px] text-center">
        <p>{t('team.text')}</p>
        <p>{t('team.text2')}</p>
        <p>{t('team.text3')}</p>
        <p>{t('team.text4')}</p>
        <p>{t('team.text5')}</p>
        <p>{t('team.text6')}</p>
      </div>
    </section>
  );
};
