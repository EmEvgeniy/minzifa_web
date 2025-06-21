'use client';

import React from 'react';
import { Logo, SocialMedia } from '../UI';
import { useLocale, useTranslations } from 'next-intl';
import { contacts } from '@/store/contacts';

export const FooterLeft = () => {
  const t = useTranslations('footer');
  const locale = useLocale();

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
        <a href={contacts.phone[locale].url} className="text-[24px] text-[#66B93E]">
          {contacts.phone[locale].name}
        </a>
        <a href={contacts.email[locale].url} className="text-[14px]">
          {contacts.email[locale].name}
        </a>
        <SocialMedia />
      </div>
    </div>
  );
};
