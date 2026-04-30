'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export const FooterRight = () => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className=" flex flex-col lg:items-end justify-between gap-3 w-full text-white">
      <div className="flex flex-row justify-between gap-6">
        <div className="text-base text-white flex flex-col gap-1">
          <span className="text-sm text-white/70 leading-100">Certificate</span> 00 67
          84
        </div>
        <div className="text-base text-white flex flex-col gap-1">
          <span className="text-sm text-white/70 leading-100">License</span> T-0087
        </div>
      </div>

      <div className="flex flex-row justify-between w-full gap-[30px]">
        <Link href={`${locale}/`} className="text-base text-white/70 underline leading-100">
          {t('common.terms')}
        </Link>
        <Link href={`${locale}/`} className="text-base text-white/70 underline leading-100">
          {t('common.privacyPolicy')}
        </Link>
        <Link href={`${locale}/`} className="text-base text-white/70 underline leading-100">
          {t('common.cockie')}
        </Link>
      </div>
    </div>
  );
};
