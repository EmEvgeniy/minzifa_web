import { eco_icon5 } from '@/assets/icons';
import { animal } from '@/assets/img';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export const Animal = () => {
  const t = useTranslations('eco');

  return (
    <section className="container py-[70px] flex flex-col gap-8 items-center">
      <Image src={eco_icon5} alt="icon" width={65} height={65} />
      <h6 className="text-[42px]">{t('animal.title')}</h6>
      <p className="text-[20px] text-center max-w-[80%]">{t('animal.sub_title')}</p>
      <div className="w-full flex gap-5 min-h-[400px] h-full">
        <Image
          src={animal}
          alt="panda"
          width={0}
          height={0}
          className="object-cover  h-full max-h-[400px] rounded-[16px] shadow-2xl w-1/2"
        />
        <div className="bg-[#BCCEC8] rounded-[16px]   flex flex-col justify-center p-5 gap-5 text-[18px] w-1/2">
          <p>{t('animal.text')}</p>
          <p>{t('animal.text2')}</p>
        </div>
      </div>
    </section>
  );
};
