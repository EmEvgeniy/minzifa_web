import { car, eco_icon3, guide, heart, location } from '@/assets/icons';
import { eco_block } from '@/assets/img';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { MobileSlider } from './MobileSlider';

export const Environment = () => {
  const t = useTranslations('eco');
  const block = t.raw('environment.block') as { title: string; text: string }[];

  return (
    <section className="relative bg-[#16372D] w-full h-full py-[40px]">
      <Image src={eco_block} alt="environment" fill className=" object-cover absolute top-0" />
      <div className="container h-full py-[40px] relative z-20 text-white flex flex-col items-center gap-8 max-[500px]:gap-5">
        <Image
          src={eco_icon3}
          alt="icon"
          width={65}
          height={65}
          className="max-[1024px]:w-[40px]"
        />
        <h5 className="text-[42px] text-center max-w-[70%] flex flex-col items-center max-[1024px]:text-[35px] max-[1024px]:max-w-full max-[500px]:text-[24px]">
          <span>{t('environment.title')}</span>
          <span>{t('environment.title2')}</span>
        </h5>
        <p className="text-[20px] max-w-[70%] text-center max-[500px]:text-[16px] max-[500px]:max-w-full">
          {t('environment.sub_title')}
        </p>
        <div className="grid grid-cols-2 w-full h-full gap-5 pt-[30px] max-[500px]:hidden">
          {block.map((el, i) => (
            <div
              key={i}
              className="bg-[#FFFFFFCC] opacity-80 backdrop-blur-[6px] w-full h-full rounded-[16px] shadow-2xl p-5 flex flex-col items-center gap-5 text-[#16372D] text-center"
            >
              <Image
                src={i == 0 ? car : i == 1 ? heart : i == 2 ? guide : location}
                alt="icon2"
                width={50}
                height={50}
                className="w-[50px] h-[50px]"
              />
              <p className="text-[20px]">{el.title}</p>
              <p className="text-[16px]">{el.text}</p>
            </div>
          ))}
        </div>
        <MobileSlider />
      </div>
    </section>
  );
};
