import { lr } from '@/assets/img';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export const Mission = () => {
  const t = useTranslations('eco');

  return (
    <section className="bg-[#16372D] w-full min-h-[385px] relative h-full mb-[70px] overflow-hidden">
      <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
      <Image
        src={lr}
        alt="lr"
        width={450}
        height={300}
        className=" object-cover absolute top-0 left-[-20%] z-10"
      />
      <Image
        src={lr}
        alt="lr"
        width={700}
        height={300}
        className=" object-cover absolute rotate-180 top-[-15%] right-[-20%] z-10"
      />
      <div className="container relative z-30 text-white py-[70px] flex flex-col items-center justify-center gap-10">
        <h2 className="text-[42px] text-center">{t('mission.title')}</h2>
        <p className="text-[18px] text-center flex flex-col gap-5">
          <span>{t('mission.text')}</span>
          <span>{t('mission.text2')}</span>
        </p>
      </div>
    </section>
  );
};
