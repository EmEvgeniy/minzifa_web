import { info, lr } from '@/assets/img';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export const Info = () => {
  const t = useTranslations('home');
  return (
    <section className="container ">
      <div className="flex flex-col items-center justify-center gap-5 text-center px-[172px] my-[70px] bg-[#16372D1A] backdrop-blur-[3px]  py-[39px] rounded-[16px] [@media(max-width:1024px)]:px-[20px] relative w-full overflow-hidden">
        <Image
          src={lr}
          alt="lr"
          width={500}
          height={500}
          className="absolute top-0 left-[-300px] z-10 max-w-[100%] h-full pointer-events-none block object-cover"
        />
        <Image
          src={lr}
          alt="lr"
          width={500}
          height={500}
          className="absolute top-0 right-[-300px] z-10 rotate-180 max-w-[100%] h-full pointer-events-none block object-cover"
        />
        <h2 className="text-[42px] text-center max-w-[70%] [@media(max-width:1024px)]:max-w-full">
          {t('info_title')}
        </h2>
        <p className="text-[18px]">{t('info_text')}</p>
        <Image src={info} alt="info_img" width={611} height={97} className="object-cover" />
      </div>
    </section>
  );
};
