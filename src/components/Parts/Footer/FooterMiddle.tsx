import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function FooterMiddle({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const menu = t.raw('menu') as { title: string; link: string }[];
  const menu2 = t.raw('usefulInformation') as { title: string; link: string }[];

  return (
    <div className="flex items-start justify-between lg:justify-start gap-11 text-white">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-white/70 leading-100">{t('menuTitle')}</p>
        <nav className="flex flex-col gap-3 text-[16px] font-light max-w-[200px]">
          {menu.map((el) => (
            <Link href={`/${locale}/${el.link}`} key={el.link}>
              {el.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-sm text-white/70 leading-100">{t('usefulInformationTitle')}</p>
        <nav className="flex flex-col gap-3 text-[16px] font-light max-w-[200px]">
          {menu2.map((el) => (
            <Link href={`/${locale}/${el.link}`} key={el.link}>
              {el.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
