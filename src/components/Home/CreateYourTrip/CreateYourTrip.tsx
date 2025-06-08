import { cyt } from '@/assets/img';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const CreateYourTrip = () => {
  const t = useTranslations('home');
  return (
    <section className="w-full relative">
      <div className="absolute inset-0 bg-[#16372DB2] w-full h-full opacity-70 z-10" />
      <Image
        src={cyt}
        alt="create_your_trip"
        fill
        className="absolute top-0 w-full object-cover z-0"
      />
      <div className="container py-[188px] relative z-20 text-white flex flex-col items-center justify-center gap-5 ">
        <h6 className="text-[42px]">{t('create_your_trip_title')}</h6>
        <p className="text-[16px] max-w-[30%] text-center">{t('create_your_trip_sub_title')}</p>
        <Link
          className="bg-[#27A430] hover:bg-[#208B28] transition-all  text-white   text-center py-[20px] text-[16px] rounded-[16px] shadow-2xl mt-[20px] w-full max-w-[420px]"
          href={'/'}
        >
          {t('create_your_trip_btn')}
        </Link>
      </div>
    </section>
  );
};
