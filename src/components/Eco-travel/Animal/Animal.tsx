import { eco_icon5 } from '@/assets/icons';
import { animal } from '@/assets/img';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export const Animal = () => {
  const t = useTranslations('eco');

  return (
    <section className="container py-[70px] flex flex-col gap-8 items-center max-[768px]:gap-3 max-[768px]:py-[40px]">
      <Image src={eco_icon5} alt="icon" width={65} height={65} className="max-[768px]:w-[35px]" />
      <h6 className="text-[42px] max-[1024px]:text-[35px]">{t('animal.title')}</h6>
      <p className="text-[20px] text-center max-w-[80%] max-[768px]:text-[18px] max-[768px]:max-w-full">
        {t('animal.sub_title')}
      </p>
      <div className="w-full flex gap-5 min-h-[400px] h-full max-[768px]:pt-[30px] max-[768px]:flex-col">
        <Image
          src={animal}
          alt="panda"
          width={0}
          height={0}
          className="object-cover  h-full max-h-[400px] rounded-[16px] shadow-2xl w-1/2 max-[768px]:w-full"
        />
        <div className="bg-[#BCCEC8] rounded-[16px]   flex flex-col justify-center p-5 gap-5 text-[18px] w-1/2 max-[768px]:w-full max-[768px]:text-[16px]">
          <p>{t('animal.text')}</p>
          <p>{t('animal.text2')}</p>
        </div>
      </div>
    </section>
  );
};
