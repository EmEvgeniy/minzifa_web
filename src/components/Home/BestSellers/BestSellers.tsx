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
            className="w-full max-w-[209px] text-center bg-[#16372D] text-white py-[15px] rounded-[16px] text-[16px] shadow-2xl hover:bg-[#194D3D] transition-all active:bg-[#16372D] [@media(max-width:1024px)]:max-w-[150px] [@media(max-width:550px)]:py-[8px]"
          >
            {t('best_sellers_btns')}
          </Link>
        }
      />
    </section>
  );
}
