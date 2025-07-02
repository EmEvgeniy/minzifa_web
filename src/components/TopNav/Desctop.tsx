'use client';

import React, { useMemo } from 'react';
import { LangBtn, Logo } from '../UI';
import { useLocale, useTranslations } from 'next-intl';
import { NavItemType } from './_types';
import { IoLogoWhatsapp } from 'react-icons/io';
import { NavWrapper } from './NavWrapper';
import { Nav } from './Nav';
import Link from 'next/link';
import { contacts } from '@/store/contacts';

export const Desctop = () => {
  const t = useTranslations();
  const navItems = t.raw('navigation.nav') as NavItemType[];
  const lang = t.raw('lang') as string[];
  const locale = useLocale();

  const whatsappLink = useMemo(() => {
    const wa = contacts?.social_media?.find((item) => item.name === 'WhatsApp');
    return wa?.url?.[locale] || '#';
  }, [locale]);

  return (
    <header className="container w-full fixed top-10  left-1/2 -translate-x-1/2 [@media(max-width:1024px)]:hidden flex items-center justify-between  gap-5 z-50">
      <div className="bg-[rgba(22,55,45,0.7)] backdrop-blur-[6px] w-full py-5 px-5 rounded-[20px] flex items-center justify-between">
        <Logo />
        <NavWrapper>
          <Nav menu={navItems} />
        </NavWrapper>
      </div>

      <LangBtn langs={lang} />
      <Link
        href={whatsappLink}
        target="_blank"
        prefetch={false}
        className="flex items-center justify-center gap-5 rounded-full bg-[#66B93E]  px-10 [@media(max-width:1250px)]:px-5  py-[21px] text-white transition hover:bg-green-600 shadow-2xl"
      >
        <IoLogoWhatsapp size={24} />
        <span className="text-[18px] font-semibold">Whatsapp</span>
      </Link>
    </header>
  );
};
