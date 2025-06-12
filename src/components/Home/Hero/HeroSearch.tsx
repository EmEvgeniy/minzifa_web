import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { RiSearch2Line } from 'react-icons/ri';

export const HeroSearch = () => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="bg-white max-w-[320px] px-[5px] py-[11px] w-full flex items-center justify-between gap-1 rounded-[16px] mt-[1px] [@media(max-width:1024px)]:py-[5px] [@media(max-width:1024px)]:max-w-full">
      <RiSearch2Line className="text-[#16372DCC] h-[30px] w-[30px] [@media(max-width:1024px)]:w-[24px]" />
      <input
        placeholder={t('search')}
        className="text-[#16372DCC] w-full focus:outline-none text-[18px] [@media(max-width:1024px)]:text-[14px]"
      />
      <Link
        href={`/${locale}/tours`}
        className="bg-[#27A430] p-[9.8px] rounded-[16px] hover:bg-[#208B28] cursor-pointer transition-all active:scale-110 [@media(max-width:1024px)]:p-[10px] [@media(max-width:1024px)]:rounded-[12px]"
      >
        <RiSearch2Line className="w-[28px] h-[28px]  [@media(max-width:1024px)]:w-[20px]  [@media(max-width:1024px)]:h-[20px]" />
      </Link>
    </div>
  );
};
