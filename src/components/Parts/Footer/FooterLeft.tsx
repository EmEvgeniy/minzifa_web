import { contacts } from '@/store/contacts';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import Logo from '../../UI/Logo/Logo';
import SocialMedia from '../../UI/SocialMedia/SocialMedia';

export default async function FooterLeft({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'footer' });

  return (
    <div className="flex flex-col gap-3 items-start justify-start">
      <Logo locale={locale} className="w-[230px]" />
      <p className="flex flex-col gap-5 text-[16px]">
        <span>{t('text')}</span>
        <span>{t('text2')}</span>
        <span>{t('text3')}</span>
      </p>
      <div className="flex flex-col gap-3">
        <p className="text-[24px]">{t('title')}</p>
        <Link href={contacts?.phone[locale]?.url} className="text-[24px] text-[#66B93E]">
          {contacts?.phone[locale]?.name}
        </Link>
        <Link href={contacts?.email[locale]?.url} className="text-[14px]">
          {contacts?.email[locale]?.name}
        </Link>
        <SocialMedia />
      </div>
    </div>
  );
}
