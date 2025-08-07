import { getTranslations } from 'next-intl/server';
import { DefaultComponentsProps } from '@/types';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const Wrapper = dynamic(() => import('./Wrapper'));

export default async function BestSellers({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale });

  const res = await fetch(
    `https://api.minzifatravel.com/api/v1/tours?main_page=1&limit=12&page=1&perPage=12&locale=${locale}`,
    {
      next: { revalidate: 60 * 5 },
    },
  );
  const data = await res.json();

  return (
    <section className="container flex flex-col gap-5">
      <h3 className="text-[42px] [@media(max-width:768px)]:text-[24px]">{t('home.best_title')}</h3>
      <Wrapper
        data={data}
        locale={locale}
        days={t('all_tours.days')}
        from={t('all_tours.from')}
        location={t('all_tours.location')}
        view_itinerary={t('all_tours.view_itinerary')}
        byRequest={t('all_tours.byRequest')}
        btn={
          <Link
            href={`/${locale}/tours`}
            className="inline-flex items-center justify-center px-6 py-[14px] min-h-[48px] text-white bg-[#16372D] rounded-[16px] text-[16px] shadow-2xl hover:bg-[#194D3D] active:bg-[#16372D] transition-all"
          >
            {t('best_sellers_btns')}
          </Link>
        }
      />
    </section>
  );
}
