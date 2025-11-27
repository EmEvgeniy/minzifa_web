import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function FooterMiddle({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const menu = t.raw('Menu') as { title: string; link: string }[];
  const menu2 = t.raw('Useful_information') as { title: string; link: string }[];

  return (
    <div className="flex items-start justify-between gap-5 max-[550px]:flex-col">
      <div className="flex flex-col gap-3">
        <p className="text-[20px] font-semibold">{t('Menu_title')}</p>
        <nav className="flex flex-col gap-3 text-[16px] font-light max-w-[200px]">
          {menu.map((el) => (
            <Link href={`/${locale}/${el.link}`} key={el.link}>
              {el.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-[20px] font-semibold">{t('Useful_information_title')}</p>
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
