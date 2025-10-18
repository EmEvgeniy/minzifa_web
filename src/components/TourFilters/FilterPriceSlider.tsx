'use client';

import { useFilterStore } from '@/store';
import Accordion from '@/components/UI/Accordion';
import { useRangeSlider } from '@/hooks/useRangeSlider';
import { RangeInputs } from '../UI/Form/RangeInputs/RangeInputs';
import { RangeSlider } from '../UI/Form/RangeSlider/RangeSlider';
import { useTranslations } from 'next-intl';
import { FaDollarSign } from 'react-icons/fa6';

function FilterPriceSlider() {
  const t = useTranslations('all_tours');

  const { prices, setPrices, expandedFilters, setExpandedFilter } = useFilterStore();

  const accordionKey = 'price';
  const isExpanded = expandedFilters[accordionKey] ?? true;

  const {
    isDragging,
    sliderRef,
    minThumbRef,
    maxThumbRef,
    minVal,
    maxVal,
    getPercent,
    handleInputChange,
    handleSliderClick,
    handleMouseDown,
  } = useRangeSlider({
    values: prices,
    setValues: setPrices,
    minRange: 0,
    maxRange: 20000,
    step: 1,
  });

  return (
    <Accordion
      title={t('filter_price_title')}
      isExpanded={isExpanded}
      onToggle={(expanded) => setExpandedFilter(accordionKey, expanded)}
    >
      <div className="space-y-6">
        <RangeInputs
          minValue={minVal}
          maxValue={maxVal}
          onMinChange={(value) => handleInputChange(0, value)}
          onMaxChange={(value) => handleInputChange(1, value)}
          minLabel={t('from')}
          maxLabel={t('to')}
          icon={<FaDollarSign size={14} />}
        />

        <RangeSlider
          minVal={minVal}
          maxVal={maxVal}
          getPercent={getPercent}
          sliderRef={sliderRef}
          minThumbRef={minThumbRef}
          maxThumbRef={maxThumbRef}
          isDragging={isDragging}
          handleSliderClick={handleSliderClick}
          handleMouseDown={handleMouseDown}
          variant="price"
        />
      </div>
    </Accordion>
  );
}

export default FilterPriceSlider;
