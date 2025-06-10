import { about_hero, info } from '@/assets/img';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export const Hero = () => {
  const t = useTranslations();
  return (
    <section className="w-full relative min-h-[90svh] flex items-center justify-center">
      <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
      <Image src={about_hero} alt="hero_about" fill className="object-cover absolute top-0 z-10" />
      <div className="container relative z-30 flex flex-col items-center justify-center">
        <h1 className="mt-[100px] mb-10 max-w-2xl text-[56px] leading-none font-extrabold tracking-tight text-white md:text-center md:text-5xl xl:text-6xl">
          {t('about.title')}
        </h1>
        <p className="mb-6 max-w-2xl font-light text-white md:text-center md:text-lg lg:mb-8 lg:text-xl">
          {t('about.text')}
        </p>
        <div>
          <Image width={0} height={0} className="h-auto w-auto" src={info} alt="Logo" />
        </div>
      </div>
    </section>
  );
};
