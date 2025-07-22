import dynamic from 'next/dynamic';
import { DefaultComponentsProps } from '@/types';
import { DestinationDataResponse, TourTypeDataResponse } from './_types';
import { getTranslations } from 'next-intl/server';
const FilterResetBtn = dynamic(() => import('./FilterResetBtn'));
const FilterPriceSlider = dynamic(() => import('./FilterPriceSlider'));
const FilterDurationSlider = dynamic(() => import('./FilterDurationSlider'));
const FilterSeasons = dynamic(() => import('./FilterSeasons'));
const FilterHotels = dynamic(() => import('./FilterHotels'));
const FilterTypes = dynamic(() => import('./FilterTypes'));
const FilterDestinations = dynamic(() => import('./FilterDestinations'));

export default async function Filter({ locale, showFilter }: DefaultComponentsProps) {
  const t = await getTranslations({ locale, namespace: 'all_tours' });
  const seasonData = t.raw('seasons') as { title: string; value: string }[];
  const hotelData = t.raw('hotels') as { title: string; value: string }[];
  const API_URL = 'https://api.minzifatravel.com/api/v1';
  const [tourTypesData, destinationsData]: [TourTypeDataResponse, DestinationDataResponse] =
    await Promise.all([
      fetch(`${API_URL}/types?all=true&locale=${locale}`, { next: { revalidate: 60 * 20 } }).then(
        (res) => res.json(),
      ),
      fetch(`${API_URL}/destinations?all=true&locale=${locale}`, {
        next: { revalidate: 60 * 20 },
      }).then((res) => res.json()),
    ]);

  return (
    <div className="max-w-[350px] w-full min-h-[700px] flex flex-col gap-5 items-start justify-start [@media(max-width:1024px)]:max-w-full">
      <FilterResetBtn title={t('f_top_btn')} />
      <div className="bg-white rounded-2xl w-full p-3 shadow-xl [@media(max-width:1024px)]:bg-transparent [@media(max-width:1024px)]:shadow-none [@media(max-width:1024px)]:p-0">
        {showFilter?.includes('price') && <FilterPriceSlider pl={t('pl')} pl2={t('from')} pl3={t('before')} />}
        {showFilter?.includes('duration') && <FilterDurationSlider pl={t('pl2')} pl2={t('from')} pl3={t('before')} />}
        {showFilter?.includes('seasons') && <FilterSeasons pl={t('pl3')} seasonData={seasonData} />}
        {showFilter?.includes('hotels') && <FilterHotels pl={t('pl4')} hotelData={hotelData} />}
        {showFilter?.includes('tourType') && <FilterTypes tourTypesData={tourTypesData} pl={t('pl5')} />}
        {showFilter?.includes('destinations') && <FilterDestinations destinationsData={destinationsData} pl2={t('find_destination')} pl={t('pl6')} />}
      </div>
    </div>
  );
}
