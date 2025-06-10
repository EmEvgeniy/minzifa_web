import { destination } from '@/assets/img';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export const Info = () => {
  const t = useTranslations();
  const statistic = t.raw('about.statistic') as { title: string; text: string }[];

  return (
    <section className="container py-[48px] flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
        <div className="md:col-span-1 text-[#16372D]">
          <h1 className="text-custom-green-900 mb-8 text-2xl leading-tight tracking-tight md:text-[42px]">
            {t('about.title_2')}
          </h1>
          <p className="text-custom-green-900 mb-6 text-lg flex flex-col gap-2">
            <span>{t('about.text_2')}</span>
            <span className="w-full h-[0.5px] bg-black" />
            <span>{t('about.text_3')}</span>
          </p>
        </div>
        <div className="sm:col-span-1 sm:mt-0 rounded-[16px] overflow-hidden">
          <Image
            className="rounded-one-six aspect-[4/3] w-full"
            src={destination}
            alt="peripherals"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {statistic.map((el, i) => (
          <div
            key={i}
            className={`${
              i <= 2 && 'border-r-[1px] border-gray-400 pr-[20px]'
            } flex flex-col items-start justify-start`}
          >
            <p className="text-[35px] font-semibold">{el.title}</p>
            <p className="text-[18px]">{el.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
