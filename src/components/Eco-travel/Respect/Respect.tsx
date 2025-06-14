import { eco_icon2 } from '@/assets/icons';
import { respect } from '@/assets/img';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export const Respect = () => {
  const t = useTranslations('eco');

  return (
    <section className="container flex flex-col gap-5 items-center justify-center h-full py-[70px] max-[768px]:py-[40px] max-[768px]:gap-3">
      <Image
        src={eco_icon2}
        alt="icon"
        width={65}
        height={65}
        className="max-[1024px]:w-[40px] max-[500px]:w-[35px]"
      />
      <h5 className="text-[42px] max-w-[70%] text-center max-[1024px]:max-w-full max-[1024px]:text-[30px] max-[500px]:text-[24px]">
        {t('env.title')}
      </h5>
      <p className="text-[24px] max-w-[70%] text-center max-[1024px]:max-w-full max-[768px]:text-[18px]">
        {t('env.sub_title')}
      </p>
      <div className="w-full flex gap-5 min-h-[400px] h-full max-[768px]:flex-col-reverse max-[768px]:pt-[30px]">
        <div className="bg-[#BCCEC8] rounded-[16px]   flex flex-col justify-between p-5 gap-5 text-[18px] w-1/2 max-[768px]:w-full max-[500px]:text-[16px]">
          <p>{t('env.text')}</p>
          <p>{t('env.text2')}</p>
          <p>{t('env.text3')}</p>
        </div>

        <Image
          src={respect}
          alt="respect"
          width={0}
          height={0}
          className="object-cover  h-full max-h-[400px] rounded-[16px] shadow-2xl w-1/2 max-[768px]:w-full"
        />
      </div>
    </section>
  );
};
