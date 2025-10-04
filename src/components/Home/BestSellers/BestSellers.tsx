import { getTranslations } from 'next-intl/server';
import { DefaultComponentsProps } from '@/types';
import dynamic from 'next/dynamic';
import { getApiUrl } from '@/utils/config';
import { ButtonLink } from '@/components/UI/Button/Button';
import { BestSellersPackagesCardType } from '@/components/UI/BestSellersPackagesCard/_types';
const Wrapper = dynamic(() => import('./Wrapper'));

export default async function BestSellers({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale });

  let data: BestSellersPackagesCardType[] | null;
  try {
    data = await fetch(getApiUrl(`tours?main_page=1&limit=12&page=1&perPage=12&locale=${locale}`), {
      next: { revalidate: 60 * 5 },
    }).then((res) => res.json());
  } catch {
    data = [];
  }

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
          <ButtonLink href="/tours" locale={locale}>
            {t('best_sellers_btns')}
          </ButtonLink>
        }
      />
    </section>
  );
}
