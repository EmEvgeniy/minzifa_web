import React, { FC, RefObject } from 'react';
import { FooterLeft } from './FooterLeft';
import { FooterMiddle } from './FooterMiddle';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

type FooterType = {
  ref: RefObject<HTMLDivElement | null>;
};

export const Footer: FC<FooterType> = ({ ref }) => {
  const t = useTranslations('footer');
  const pl = t.raw('pl') as { link: string; title: string };
  const locale = useLocale();
  return (
    <footer className="bg-[#16372D] w-full" ref={ref}>
      <div className="max-w-[1300px] w-full px-[20px] py-[30px] text-white flex flex-col gap-10 mx-auto">
        <div className="grid grid-cols-2 w-full gap-10 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1">
          <FooterLeft />
          <FooterMiddle />
          {/* <FooterRight /> */}
        </div>
        <p className="text-[14px] text-center max-[550px]:text-[11px]">
          © 2014-{new Date().getFullYear()} Minzifa Travel. All rights reserved. `Unique Travel` FE
          by Minzifa Travel. <br /> 70 Eshoni Pir Street, Bukhara 200118, Bukhara, Uzbekistan. |{' '}
          <Link href={`/${locale}/privacy-policy`}>{pl.title}</Link>
        </p>
      </div>
    </footer>
  );
};
