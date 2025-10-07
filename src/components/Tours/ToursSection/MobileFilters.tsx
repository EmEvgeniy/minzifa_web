'use client';

import dynamic from 'next/dynamic';
import { availableFilters } from '@/types/routing';
import FilterType from '@/components/filters/FilterType';
import { useFilterData } from '@/hooks/useFilterData';

const FilterResetBtn = dynamic(() => import('@/components/filters/FilterResetBtn'));
const FilterPriceSlider = dynamic(() => import('@/components/filters/FilterPriceSlider'));
const FilterDurationSlider = dynamic(() => import('@/components/filters/FilterDurationSlider'));
const FilterSeasons = dynamic(() => import('@/components/filters/FilterSeasons'));
const FilterHotels = dynamic(() => import('@/components/filters/FilterHotels'));
const FilterTypes = dynamic(() => import('@/components/filters/FilterTypes'));
const FilterDestinations = dynamic(() => import('@/components/filters/FilterDestinations'));

interface MobileFiltersProps {
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

export default function MobileFilters({
  showFilter = ['price', 'duration', 'seasons', 'hotels', 'tourType', 'destinations'],
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
}: MobileFiltersProps) {
  const { tourTypesData, destinationsData } = useFilterData({ locale: 'en' }); // TODO: Pass actual locale
  return (
    <div className="w-full min-h-[600px] flex flex-col gap-5 items-start justify-start bg-white">
      <FilterResetBtn title={translations.f_top_btn} />
      <div className="bg-white rounded-2xl w-full p-3 shadow-xl">
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
