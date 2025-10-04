import { DefaultComponentsProps } from '@/types';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import ToursView from './ToursView';
import { getTranslations } from 'next-intl/server';
import Filter from './Filter';

export default async function MainSection({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale });
  const tAllTours = await getTranslations({ locale, namespace: 'all_tours' });
  const menu = tAllTours.raw('sort') as { title: string; value: string }[];
  const seasonData = tAllTours.raw('seasons') as { title: string; value: string }[];
  const hotelData = tAllTours.raw('hotels') as { title: string; value: string }[];
  const types = tAllTours.raw('types') as { title: string; value: string }[];

  return (
    <section className="container w-full h-full min-h-[70svh]">
      <div className="w-full flex flex-col gap-5 py-[30px]">
        <Breadcrumbs locale={locale} link={{ link: '', title: t('breadcrumbs.all_tours') }} />
        <div className="w-full grid max-[1024px]:grid-cols-1 grid-cols-[300px_1fr] items-start justify-between gap-7">
          <div className="block [@media(max-width:1024px)]:hidden">
            <Filter
              locale={locale}
              showFilter={['price', 'duration', 'seasons', 'hotels', 'tourType', 'destinations']}
              seasonData={seasonData}
              hotelData={hotelData}
              types={types}
              translations={{
                f_top_btn: tAllTours('f_top_btn'),
                pl: tAllTours('pl'),
                from: tAllTours('from'),
                before: tAllTours('before'),
                pl2: tAllTours('pl2'),
                pl3: tAllTours('pl3'),
                pl4: tAllTours('pl4'),
                pl5: tAllTours('pl5'),
                pl6: tAllTours('pl6'),
                pl7: tAllTours('pl7'),
                find_destination: tAllTours('find_destination'),
              }}
            />
          </div>
          <ToursView
            locale={locale}
            menu={menu}
            showing={tAllTours('showing')}
            out={tAllTours('out')}
            nf={tAllTours('not_found')}
            days={tAllTours('days')}
            from={tAllTours('from')}
            location={tAllTours('location')}
            view_itinerary={tAllTours('view_itinerary')}
            byRequest={tAllTours('byRequest')}
          />
        </div>
      </div>
    </section>
  );
}
