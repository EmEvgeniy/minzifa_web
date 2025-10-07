import { DefaultComponentsProps } from '@/types';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import ToursSection from '@/components/Tours/ToursSection/ToursSection';
import { getTranslations } from 'next-intl/server';

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
        <ToursSection
          locale={locale}
          showFilter={['price', 'duration', 'seasons', 'hotels', 'tourType', 'destinations']}
          seasonData={seasonData}
          hotelData={hotelData}
          types={types}
          menu={menu}
          translations={{
            showing: tAllTours('showing'),
            out: tAllTours('out'),
            nf: tAllTours('not_found'),
            days: tAllTours('days'),
            from: tAllTours('from'),
            location: tAllTours('location'),
            view_itinerary: tAllTours('view_itinerary'),
            byRequest: tAllTours('byRequest'),
            fromText: tAllTours('from'),
            f_top_btn: tAllTours('f_top_btn'),
            pl: tAllTours('pl'),
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
    </section>
  );
}
