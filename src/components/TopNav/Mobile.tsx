import { logo } from '@/assets/icons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { LangBtn } from '../UI';
import { useLocale } from 'next-intl';
import { MobileHeader } from './MobileHeader';

export const Mobile = () => {
  const locale = useLocale();

  return (
    <header className="bg-[#16372D] fixed top-0 w-full hidden [@media(max-width:1024px)]:flex py-2 container  items-center justify-between z-50">
      <Link href={`/${locale}`}>
        <Image src={logo} alt="logo" width={130} height={30} />
      </Link>
      <div className="flex items-center justify-end gap-1">
        <LangBtn />
        <MobileHeader />
      </div>
    </header>
  );
};
