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
        <a href={contacts.phone[locale]} className="text-[24px] text-[#66B93E]">
          {contacts.phone[locale]}
        </a>
        <a href={`mailto:${contacts.email[locale]}`} className="text-[14px]">
          {contacts.email[locale]}
        </a>
        <SocialMedia />
      </div>
    </div>
  );
};
