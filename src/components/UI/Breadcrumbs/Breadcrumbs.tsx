import Link from 'next/link';
import React, { FC } from 'react';
import { BreadcrumbsType } from './_types';
import { useTranslations } from 'next-intl';

export const Breadcrumbs: FC<BreadcrumbsType> = ({ link, link2 }) => {
  const t = useTranslations('breadcrumbs');
  return (
    <div className="flex items-center justify-start gap-2 text-[18px] text-[#16372D] font-semibold">
      <Link href={'/'}>{t('home')}</Link>
      <span>/</span>
      {link.title && !link2 ? <p>{link.title}</p> : <Link href={link.link}>{link.title}</Link>}
      {link2 && <span>/</span>}
      {link2 && <Link href={link2.link}>{link2.title}</Link>}
    </div>
  );
};
