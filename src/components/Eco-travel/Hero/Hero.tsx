import { eco_icon } from '@/assets/icons';
import { eco_bg } from '@/assets/img';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export const Hero = () => {
  const t = useTranslations('eco');
  return (
    <section className="min-h-[90svh] w-full relative bg-[#16372D] flex items-center justify-center">
      <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
      <Image src={eco_bg} alt="eco_bg" fill className=" object-cover absolute top-0 z-10" />
      <div className="container relative z-30 flex flex-col items-center justify-center gap-5">
        <Image src={eco_icon} alt="eco-icon" width={65} height={65} />
        <h1 className="text-white text-[56px] flex flex-col text-center">
          <span>{t('title')}</span>
          <span>{t('title2')}</span>
        </h1>
      </div>
    </section>
  );
};
