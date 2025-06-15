import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { useTranslations } from 'next-intl';
import React from 'react';

export const Main = () => {
  const t = useTranslations();

  return (
    <section className="container pt-[150px] h-full max-[768px]:py-[100px]">
      <Breadcrumbs />
      <div className="w-full h-full flex flex-col items-start gap-5 pt-[30px]">
        <h1 className="text-[56px] font-semibold max-[1024px]:text-[35px] max-[768px]:text-[28px] max-[768px]:font-semibold">
          {t('hotel-booking-rules.title')}
        </h1>
        <p className="text-[24px] font-semibold max-[768px]:text-[18px] max-[768px]:font-semibold">
          {t('hotel-booking-rules.sub_title')}
        </p>
        <p className="text-[18px] max-[768px]:text-[14px]">{t('hotel-booking-rules.text')}</p>
        <p className="text-[24px] font-semibold max-[768px]:text-[18px] max-[768px]:font-semibold">
          {t('hotel-booking-rules.sub_title2')}
        </p>
        <p className="text-[18px] max-[768px]:text-[14px]">{t('hotel-booking-rules.text2')}</p>
        <p className="text-[24px] font-semibold max-[768px]:text-[18px] max-[768px]:font-semibold">
          {t('hotel-booking-rules.sub_title3')}
        </p>
        <p className="text-[18px] max-[768px]:text-[14px]">{t('hotel-booking-rules.text3')}</p>
        <p className="text-[24px] font-semibold max-[768px]:text-[18px] max-[768px]:font-semibold">
          {t('hotel-booking-rules.sub_title4')}
        </p>
        <p className="text-[18px] max-[768px]:text-[14px]">{t('hotel-booking-rules.text4')}</p>
      </div>
    </section>
  );
};
