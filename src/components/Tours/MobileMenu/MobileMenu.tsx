import MobileDrawler from './MobileDrawler';
import { DefaultComponentsProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import MobileBtn from './MobileBtn';
import MobileFilters from '../ToursSection/MobileFilters';

export default async function MobileMenu({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale });
  const tAllTours = await getTranslations({ locale, namespace: 'all_tours' });
  const seasonData = tAllTours.raw('seasons') as { title: string; value: string }[];
  const hotelData = tAllTours.raw('hotels') as { title: string; value: string }[];
  const types = tAllTours.raw('types') as { title: string; value: string }[];

  return (
    <div className="max-[1024px]:block hidden">
      <MobileBtn btn={t('Filters')} />
      <MobileDrawler
        btn={t('Filters')}
        elem={
          <MobileFilters
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
        }
      />
    </div>
  );
}
