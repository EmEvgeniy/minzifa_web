import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import { Wrapper } from './Wrapper';
import Link from 'next/link';
import { WrapperMobile } from './Wrapper.mobile';

export const Articles = () => {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="container pb-[70px] w-full">
      <div className="flex flex-col gap-10 items-start w-full">
        <h5 className="text-[42px] [@media(max-width:768px)]:text-[24px] ">
          {t('articles_title')}
        </h5>
        <Wrapper />
        <WrapperMobile />
        <Link
          href={`/${locale}/adventures`}
          className="bg-[#16372D] py-[18px] px-[40px] mx-auto text-white rounded-[16px] hover:bg-[#194D3D] transition-all [@media(max-width:768px)]:hidden block"
        >
          {t('article_btn')}
        </Link>
      </div>
    </section>
  );
};
