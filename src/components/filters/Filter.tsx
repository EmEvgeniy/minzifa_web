'use client';
import dynamic from 'next/dynamic';
import { availableFilters, DefaultComponentsProps } from '@/types';
import FilterType from './FilterType';
import { useFilterData } from '@/hooks/useFilterData';

const FilterResetBtn = dynamic(() => import('./FilterResetBtn'));
const FilterPriceSlider = dynamic(() => import('./FilterPriceSlider'));
const FilterDurationSlider = dynamic(() => import('./FilterDurationSlider'));
const FilterSeasons = dynamic(() => import('./FilterSeasons'));
const FilterHotels = dynamic(() => import('./FilterHotels'));
const FilterTypes = dynamic(() => import('./FilterTypes'));
const FilterDestinations = dynamic(() => import('./FilterDestinations'));

interface FilterProps extends DefaultComponentsProps {
  showFilter?: availableFilters[];
  seasonData?: { title: string; value: string }[];
  hotelData?: { title: string; value: string }[];
  types?: { title: string; value: string }[];
  translations?: {
    f_top_btn: string;
    pl: string;
    from: string;
    before: string;
    pl2: string;
    pl3: string;
    pl4: string;
    pl5: string;
    pl6: string;
    pl7: string;
    find_destination: string;
  };
}

export default function Filter({
  locale,
  showFilter,
  seasonData = [],
  hotelData = [],
  types = [],
  translations = {
    f_top_btn: 'Reset',
    pl: 'Price',
    from: 'From',
    before: 'Before',
    pl2: 'Duration',
    pl3: 'Seasons',
    pl4: 'Hotels',
    pl5: 'Tour Types',
    pl6: 'Destinations',
    pl7: 'Tour Type',
    find_destination: 'Find destination',
  },
}: FilterProps) {
  const { tourTypesData, destinationsData } = useFilterData({ locale });

  return (
    <div className="max-w-[350px] w-full min-h-[700px] flex flex-col gap-5 items-start justify-start [@media(max-width:1024px)]:max-w-full">
      <FilterResetBtn title={translations.f_top_btn} />
      <div className="bg-white rounded-2xl w-full p-3 shadow-xl [@media(max-width:1024px)]:bg-transparent [@media(max-width:1024px)]:shadow-none [@media(max-width:1024px)]:p-0">
        {showFilter?.includes('price') && (
          <FilterPriceSlider
            pl={translations.pl}
            pl2={translations.from}
            pl3={translations.before}
          />
        )}
        {showFilter?.includes('duration') && (
          <FilterDurationSlider
            pl={translations.pl2}
            pl2={translations.from}
            pl3={translations.before}
          />
        )}
        {showFilter?.includes('seasons') && seasonData && (
          <FilterSeasons pl={translations.pl3} seasonData={seasonData} />
        )}
        {showFilter?.includes('hotels') && hotelData && (
          <FilterHotels pl={translations.pl4} hotelData={hotelData} />
        )}
        {showFilter?.includes('tourType') && types && (
          <FilterType tourTypeData={types} pl={translations.pl7} />
        )}
        {showFilter?.includes('tourTypes') && (
          <FilterTypes tourTypesData={tourTypesData ?? []} pl={translations.pl5} />
        )}
        {showFilter?.includes('destinations') && (
          <FilterDestinations
            destinationsData={destinationsData ?? []}
            pl2={translations.find_destination}
            pl={translations.pl6}
          />
        )}
      </div>
    </div>
  );
}
