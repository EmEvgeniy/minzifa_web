import { allTours } from '@/assets/img';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export const Hero = () => {
  const t = useTranslations('all_tours');
  return (
    <section className="w-full min-h-[90svh] relative flex items-center justify-center">
      <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
      <Image src={allTours} alt="all_tours" fill className="absolute top-0 z-10 object-cover" />
      <div className="container relative z-30 h-full">
        <div className="text-white flex items-center justify-center w-full h-full">
          <h1 className="text-[56px]">{t('title')}</h1>
        </div>
      </div>
    </section>
  );
};
