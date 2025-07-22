import { DefaultComponentsProps } from '@/types';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import ToursView from './ToursView';
import { getTranslations } from 'next-intl/server';
import Filter from './Filter';

export default async function MainSection({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale });
  const menu = t.raw('all_tours.sort') as { title: string; value: string }[];
  const res = await fetch(
    `https://api.minzifatravel.com/api/v1/tours?limit=5&page=1&perPage=5&locale=${locale}`,
    {
      next: { revalidate: 60 * 10 },
    },
  );
  const initialTours = await res.json();

  return (
    <section className="container w-full h-full min-h-[70svh]">
      <div className="w-full flex flex-col gap-5 py-[30px]">
        <Breadcrumbs locale={locale} link={{ link: '', title: t('breadcrumbs.all_tours') }} />
        <div className="w-full grid max-[1024px]:grid-cols-1 grid-cols-[300px_1fr] items-start justify-between gap-7">
          <div className="block [@media(max-width:1024px)]:hidden">
            <Filter locale={locale} showFilter={['price', 'duration', 'seasons', 'hotels', 'tourType', 'destinations']} />
          </div>
          <ToursView
            tourData={initialTours}
            locale={locale}
            menu={menu}
            showing={t('all_tours.showing')}
            out={t('all_tours.out')}
            nf={t('all_tours.not_found')}
            days={t('all_tours.days')}
            from={t('all_tours.from')}
            location={t('all_tours.location')}
            view_itinerary={t('all_tours.view_itinerary')}
            byRequest={t('all_tours.byRequest')}
          />
        </div>
      </div>
    </section>
  );
}
