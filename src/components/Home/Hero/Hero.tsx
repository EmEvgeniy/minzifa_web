import { hero } from '@/assets/img';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { HeroSearch } from './HeroSearch';

export const Hero = () => {
  const t = useTranslations('home');
  return (
    <section className="w-full h-[90svh] relative flex items-center justify-center bg-[#16372D] [@media(max-width:1024px)]:h-[50vh]">
      <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
      <Image
        src={hero}
        alt="hero_img"
        loading="lazy"
        fill
        className="w-full h-full absolute top-0 object-cover z-10"
      />
      <div className="container relative z-30 text-white flex flex-col items-center justify-center gap-5">
        <h1 className="font-title text-[56px] text-center max-w-4xl">{t('title')}</h1>
        <p className="max-w-[50%] text-center text-[24px] font-normal">{t('subTitle')}</p>
        <HeroSearch />
      </div>
    </section>
  );
};
