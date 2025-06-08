import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

export const FooterMiddle = () => {
  const t = useTranslations('footer');
  const locale = useLocale();
  const menu = t.raw('Menu') as { title: string; link: string }[];
  const menu2 = t.raw('Useful_information') as { title: string; link: string }[];

  return (
    <div className="flex items-start justify-between gap-5">
      <div className="flex flex-col gap-5">
        <p className="text-[20px] font-semibold">{t('Menu_title')}</p>
        <nav className="flex flex-col gap-3 text-[16px] font-light">
          {menu.map((el) => (
            <Link href={`/${locale}/${el.link}`} key={el.link}>
              {el.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-[20px] font-semibold">{t('Useful_information_title')}</p>
        <nav className="flex flex-col gap-3 text-[16px] font-light">
          {menu2.map((el) => (
            <Link href={`/${locale}/${el.link}`} key={el.link}>
              {el.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
