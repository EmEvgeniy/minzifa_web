import Link from 'next/link';
import React, { FC } from 'react';
import { BreadcrumbsType } from './_types';
import { useTranslations } from 'next-intl';

export const Breadcrumbs: FC<BreadcrumbsType> = ({ link, link2, color, className = '' }) => {
  const t = useTranslations('breadcrumbs');
  return (
    <div
      className={`flex items-center justify-start gap-2 text-[18px] ${
        color ? 'text-white' : 'text-[#16372D]'
      } font-semibold ${className !== '' && className}`}
    >
      <Link href={'/'} className=" text-[16px]">
        {t('home')}
      </Link>
      <span className=" text-[16px]">/</span>
      {link.title && !link2 ? (
        <p className=" text-[16px]">{link.title}</p>
      ) : (
        <Link href={link.link} className=" text-[16px]">
          {link.title}
        </Link>
      )}
      {link2 && <span className=" text-[16px]">/</span>}
      {link2 && <p className=" text-[16px] ">{link2.title}</p>}
    </div>
  );
};
