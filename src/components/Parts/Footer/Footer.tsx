import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import FooterLeft from './FooterLeft';
import FooterMiddle from './FooterMiddle';
import { FooterRight } from './FooterRight';

export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const pl = t.raw('pl') as { link: string; title: string };

  return (
    <footer className="bg-[#16372D] w-full">
      <div className="max-w-[1300px] w-full px-[20px] py-[30px] text-white flex flex-col gap-10 mx-auto">
        <div className="grid grid-cols-3 w-full gap-10 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1">
          <FooterLeft locale={locale} />
          <FooterMiddle locale={locale} />
          <FooterRight />
        </div>
        <p className="text-sm text-center max-[550px]:text-[11px]">
          © 2014-{new Date().getFullYear()} Minzifa Travel. All rights reserved. `Unique Travel` FE
          by Minzifa Travel. <br /> 53 Eshoni Pir Street, Bukhara 200118, Bukhara, Uzbekistan. |{' '}
          <Link href={`/${locale}/privacy-policy`}>{pl.title}</Link>
        </p>
      </div>
    </footer>
  );
}
