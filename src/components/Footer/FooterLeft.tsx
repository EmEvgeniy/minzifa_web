import React from 'react';
import { Logo } from '../UI';
import { useTranslations } from 'next-intl';
import { SocialMedia } from '../UI/SocialMedia';

export const FooterLeft = () => {
  const t = useTranslations('footer');
  return (
    <div className="flex flex-col gap-5 items-start justify-start">
      <Logo />
      <p className="flex flex-col gap-5 text-[16px]">
        <span>{t('text')}</span>
        <span>{t('text2')}</span>
        <span>{t('text3')}</span>
      </p>
      <div className="flex flex-col gap-3">
        <p className="text-[24px]">{t('title')}</p>
        <a href="tel:+998936203300" className="text-[24px] text-[#66B93E]">
          +998936203300
        </a>
        <a href="mailto:info@minzifatravel.com" className="text-[14px]">
          info@minzifatravel.com
        </a>
        <SocialMedia />
      </div>
    </div>
  );
};
