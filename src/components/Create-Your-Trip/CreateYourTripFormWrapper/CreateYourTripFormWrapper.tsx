import { useTranslations } from 'next-intl';
import React from 'react';
import { FormTop } from './FormTop';

export const CreateYourTripFormWrapper = () => {
  const t = useTranslations('create-your-trip');

  return (
    <div className="relative z-30 min-h-[70svh] container text-white flex flex-col items-center py-[20%]">
      <h1 className="text-[56px]">{t('title')}</h1>
      <div className="w-full flex flex-col items-center gap-8 pt-[80px]">
        <FormTop />
      </div>
    </div>
  );
};
