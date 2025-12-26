'use client';

import { useFilterStore } from '@/store';
import Accordion from '@/components/UI/Accordion';
import { useRangeSlider } from '@/hooks/useRangeSlider';
import { RangeInputs } from '../UI/Form/RangeInputs/RangeInputs';
import { RangeSlider } from '../UI/Form/RangeSlider/RangeSlider';
import { useTranslations } from 'next-intl';
import { FaCalendarAlt } from 'react-icons/fa';

function FilterDurationSlider() {
  const t = useTranslations('allTours');
  const { durations, setDurations } = useFilterStore();

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
    handleTouchStart,
  } = useRangeSlider({
    values: durations,
    setValues: setDurations,
    minRange: 1,
    maxRange: 31,
    step: 1,
  });

  return (
    <Accordion title={t('filterDurationTitle')} defaultExpanded={true}>
      <div className="space-y-6">
        <RangeInputs
          minValue={minVal}
          maxValue={maxVal}
          onMinChange={(value) => handleInputChange(0, value)}
          onMaxChange={(value) => handleInputChange(1, value)}
          minLabel={t('from')}
          maxLabel={t('to')}
          icon={<FaCalendarAlt size={14} />}
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
          handleTouchStart={handleTouchStart}
        />
      </div>
    </Accordion>
  );
}

export default FilterDurationSlider;
