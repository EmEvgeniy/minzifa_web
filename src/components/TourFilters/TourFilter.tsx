import dynamic from 'next/dynamic';
import { availableFilters } from './_types';
import { DestinationCard } from '../Home/Destinations/_types';
import { TourType } from '../Tours/MainSection/_types';

const FilterResetBtn = dynamic(() => import('@/components/TourFilters/FilterResetBtn'));
const FilterPriceSlider = dynamic(() => import('./FilterPriceSlider'));
const FilterDurationSlider = dynamic(() => import('./FilterDurationSlider'));
const FilterSeasons = dynamic(() => import('./FilterSeasons'));
const FilterHotels = dynamic(() => import('./FilterHotels'));
const FilterType = dynamic(() => import('./FilterType'));
const FilterTypes = dynamic(() => import('./FilterTypes'));
const FilterDestinations = dynamic(() => import('./FilterDestinations'));

interface FilterProps {
  showFilter?: availableFilters[];
  initDestinations?: DestinationCard[];
  initTourTypes?: TourType[];
}

export default function TourFilters({ showFilter, initDestinations, initTourTypes }: FilterProps) {
  return (
    <div className="max-w-[350px] w-full min-h-[700px] flex flex-col gap-5 items-start justify-start [@media(max-width:1024px)]:max-w-full">
      <FilterResetBtn />
      <div className="bg-white rounded-2xl w-full">
        {showFilter?.includes('price') && <FilterPriceSlider />}
        {showFilter?.includes('duration') && <FilterDurationSlider />}
        {showFilter?.includes('seasons') && <FilterSeasons />}
        {showFilter?.includes('hotels') && <FilterHotels />}
        {showFilter?.includes('tourType') && <FilterType />}
        {showFilter?.includes('tourTypes') && <FilterTypes initTourTypes={initTourTypes} />}
        {showFilter?.includes('destinations') && (
          <FilterDestinations initDestinations={initDestinations} />
        )}
      </div>
    </div>
  );
}
