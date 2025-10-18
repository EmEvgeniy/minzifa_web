import dynamic from 'next/dynamic';

import { getTranslations } from 'next-intl/server';
import { getApiUrl } from '@/utils/config';
import { BestSellersPackagesCardType } from '@/components/UI/BestSellersPackagesCard/_types';
const Wrapper = dynamic(() => import('./Wrapper'));

export default async function BestSellers({ locale }: { locale: string }) {
  const t = await getTranslations({ locale });

  let data: BestSellersPackagesCardType[] | null;
  try {
    data = await fetch(getApiUrl(`tours?main_page=1&locale=${locale}`), {
      next: { revalidate: 60 * 5 },
    }).then((res) => res.json());
  } catch {
    data = [];
  }

  return (
    <section className="container flex flex-col gap-5">
      <h3 className="text-[42px] [@media(max-width:768px)]:text-[24px]">{t('home.best_title')}</h3>
      <Wrapper data={data} locale={locale} />
    </section>
  );
}
