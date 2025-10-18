'use client';

import dynamic from 'next/dynamic';
import FilterType from '@/components/TourFilters/FilterType';
import { availableFilters } from './_types';

const FilterResetBtn = dynamic(() => import('@/components/TourFilters/FilterResetBtn'));
const FilterPriceSlider = dynamic(() => import('@/components/TourFilters/FilterPriceSlider'));
const FilterDurationSlider = dynamic(() => import('@/components/TourFilters/FilterDurationSlider'));
const FilterSeasons = dynamic(() => import('@/components/TourFilters/FilterSeasons'));
const FilterHotels = dynamic(() => import('@/components/TourFilters/FilterHotels'));
const FilterTypes = dynamic(() => import('@/components/TourFilters/FilterTypes'));
const FilterDestinations = dynamic(() => import('@/components/TourFilters/FilterDestinations'));

interface MobileFiltersProps {
  showFilter?: availableFilters[];
}

export default function MobileTourFilters({ showFilter }: MobileFiltersProps) {
  return (
    <div className="w-full min-h-[600px] flex flex-col gap-5 items-start justify-start bg-white">
      <FilterResetBtn />
      <div className="bg-white rounded-2xl w-full p-3 shadow-xl">
        {showFilter?.includes('price') && <FilterPriceSlider />}
        {showFilter?.includes('duration') && <FilterDurationSlider />}
        {showFilter?.includes('seasons') && <FilterSeasons />}
        {showFilter?.includes('hotels') && <FilterHotels />}
        {showFilter?.includes('tourType') && <FilterType />}
        {showFilter?.includes('tourTypes') && <FilterTypes />}
        {showFilter?.includes('destinations') && <FilterDestinations />}
      </div>
    </div>
  );
}
