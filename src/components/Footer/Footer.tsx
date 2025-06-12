import React from 'react';
import { FooterLeft } from './FooterLeft';
import { FooterMiddle } from './FooterMiddle';
import { FooterRight } from './FooterRight';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export const Footer = () => {
  const t = useTranslations('footer');
  const pl = t.raw('pl') as { link: string; title: string };
  const locale = useLocale();
  return (
    <footer className="bg-[#16372D] w-full">
      <div className="max-w-[1650px] w-full px-[15px] py-[30px] text-white flex flex-col gap-10 mx-auto">
        <div className="grid grid-cols-3 w-full gap-10 [@media(max-width:1024px)]:grid-cols-2 [@media(max-width:550px)]:grid-cols-1">
          <FooterLeft />
          <FooterMiddle />
          <FooterRight />
        </div>
        <p className="text-[14px] text-center">
          © 2014-2025 Minzifa Travel. All rights reserved. `Unique Travel` FE by Minzifa Travel.{' '}
          <br /> 70 Eshoni Pir Street, Bukhara 200118, Bukhara, Uzbekistan. |{' '}
          <Link href={`/${locale}/privacy-policy`}>{pl.title}</Link>
        </p>
      </div>
    </footer>
  );
};
