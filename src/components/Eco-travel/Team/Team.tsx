import { useTranslations } from 'next-intl';
import React from 'react';

export const Team = () => {
  const t = useTranslations('eco');
  return (
    <section className="container py-[70px] flex flex-col gap-10 max-[1024px]:py-[50px] max-[500px]:gap-5">
      <h2 className="text-[42px] text-[#16372D] text-center max-[1024px]:text-[35px] max-[500px]:text-[24px]">
        {t('team.title')}
      </h2>
      <div className="w-full flex flex-col gap-5 text-[18px] text-center max-[500px]:text-[16px]">
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
