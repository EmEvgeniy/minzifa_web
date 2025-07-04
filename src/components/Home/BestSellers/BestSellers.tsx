import { getLocale, getTranslations } from 'next-intl/server';
import { Wrapper } from './Wrapper';

export default async function BestSellers() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'home' });

  const res = await fetch(
    `https://api.minzifatravel.com/api/v1/tours?main_page=1&limit=12&page=1&perPage=12&locale=${locale}`,
    {
      next: { revalidate: 60 },
    },
  );
  const data = await res.json();

  return (
    <section className="container flex flex-col gap-5">
      <h3 className="text-[42px] [@media(max-width:768px)]:text-[24px]">{t('best_title')}</h3>
      <Wrapper data={data} />
    </section>
  );
}
