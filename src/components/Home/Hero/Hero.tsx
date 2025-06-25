import { useTranslations } from 'next-intl';
import React from 'react';
import { HeroSearch } from './HeroSearch';
import { HeroVideoBg } from './HeroVideoBg';

export const Hero = () => {
  const t = useTranslations('home');
  return (
    <section className="w-full h-[80svh] relative flex items-center justify-center bg-[#16372D] [@media(max-width:1024px)]:h-[80vh] [@media(max-width:768px)]:h-screen">
      <div className="w-full absolute top-0 h-full bg-[rgba(0,0,0,0.35)] backdrop-blur-[1px] z-20" />
      <HeroVideoBg />
      <div className="container relative z-30 text-white flex flex-col items-center justify-center gap-5 [@media(max-width:1024px)]:items-start">
        <h1 className="text-[48px] font-semibold text-center [@media(max-width:1024px)]:text-[34px] [@media(max-width:1024px)]:text-left font-title">
          {t('title')}
        </h1>
        <p className="max-w-[50%] text-center text-[18px] font-light [@media(max-width:1024px)]:text-[15px] [@media(max-width:1024px)]:max-w-full [@media(max-width:1024px)]:text-left">
          {t('subTitle')}
        </p>
        <HeroSearch />
      </div>
    </section>
  );
};
