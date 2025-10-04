import { about_hero, TravelChoice_White } from '@/assets/img';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import { DefaultComponentsProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import React from 'react';

export default async function Hero({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale });

  return (
    <section className="w-full relative min-h-[90svh] flex items-center justify-center max-[1024px]:min-h-[70svh]">
      <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
      <Image
        src={about_hero}
        alt="hero_about"
        fill
        className="object-cover absolute top-0 z-10"
        loading="lazy"
      />
      <div className="container absolute z-30 top-35 max-[1024px]:top-25 w-full">
        <Breadcrumbs
          mainStyle="text-white "
          listClasses="text-white"
          locale={locale}
          link={{ link: '', title: t('breadcrumbs.about') }}
        />
      </div>
      <div className="container relative z-30 flex flex-col items-center justify-center">
        <h1 className="mt-[100px] mb-10 max-w-2xl text-[56px] leading-none font-extrabold tracking-tight text-white md:text-center  max-[1024px]:text-[35px] max-[768px]:text-[30px] font-title">
          {t('about.title')}
        </h1>
        <p className="mb-6 max-w-2xl font-light text-white md:text-center md:text-lg lg:mb-8 lg:text-xl max-[550px]:text-[18px] max-[1024px]:text-center">
          {t('about.text')}
        </p>
        <div>
          <Image
            width={0}
            height={0}
            className="h-auto w-auto"
            src={TravelChoice_White}
            alt="Logo"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
