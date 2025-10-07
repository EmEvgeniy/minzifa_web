'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useFilterStore } from '@/store';
import FilterAccordion from '@/components/UI/FilterAccordion';

function FilterDurationSlider({
  pl,
  pl2,
  pl3,
  days,
}: {
  pl: string;
  pl2: string;
  pl3: string;
  days?: string;
}) {
  const { durations, setDurations } = useFilterStore();
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const minThumbRef = useRef<HTMLDivElement>(null);
  const maxThumbRef = useRef<HTMLDivElement>(null);

  const minVal = durations[0] || 1;
  const maxVal = durations[1] || 31;

  const getPercent = (value: number) => ((value - 1) / (31 - 1)) * 100;

  const handleInputChange = useCallback(
    (index: number, value: number) => {
      const newDurations: [number, number] = [...durations] as [number, number];

      value = Math.max(1, Math.min(value, 31));

      if (index === 0 && value > newDurations[1]) {
        newDurations[0] = newDurations[1];
      } else if (index === 1 && value < newDurations[0]) {
        newDurations[1] = newDurations[0];
      } else {
        newDurations[index] = value;
      }

      setDurations(newDurations);
    },
    [durations, setDurations],
  );

  const handleSliderClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current || isDragging) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const sliderWidth = rect.width;
    const clickPercent = (clickX / sliderWidth) * 100;
    const clickValue = Math.round(1 + (clickPercent / 100) * (31 - 1));

    // Определяем, какой ползунок ближе к клику
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);
    const distanceToMin = Math.abs(clickPercent - minPercent);
    const distanceToMax = Math.abs(clickPercent - maxPercent);

    if (distanceToMin < distanceToMax) {
      handleInputChange(0, Math.min(clickValue, maxVal));
    } else {
      handleInputChange(1, Math.max(clickValue, minVal));
    }
  };

  const handleMouseDown = (thumb: 'min' | 'max') => (event: React.MouseEvent) => {
    setIsDragging(thumb);
    event.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const sliderX = event.clientX - rect.left;
      const sliderWidth = rect.width;
      const percent = Math.max(0, Math.min(100, (sliderX / sliderWidth) * 100));
      const value = Math.round(1 + (percent / 100) * (31 - 1));

      if (isDragging === 'min') {
        handleInputChange(0, Math.min(value, maxVal));
      } else if (isDragging === 'max') {
        handleInputChange(1, Math.max(value, minVal));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, minVal, maxVal, handleInputChange]);

  return (
    <FilterAccordion title={pl} filterKey="duration">
      <div className="grid grid-cols-2 gap-2 border-2 border-gray-300 rounded-2xl p-0">
        <div className="flex flex-col">
          <span className="mt-1 px-3 text-[18px] text-gray-400">{pl2}</span>
          <input
            type="number"
            min={1}
            value={minVal}
            onChange={(e) => handleInputChange(0, Number(e.target.value))}
            className="block h-full text-[18px] w-full px-3 py-2 focus:border-[#27A430] focus:ring-[#27A430] focus:outline-none border-0"
          />
        </div>

        <div className="flex flex-col">
          <span className="mt-1 px-3 text-[18px] text-gray-400">{pl3}</span>
          <input
            type="number"
            min={1}
            value={maxVal}
            onChange={(e) => handleInputChange(1, Number(e.target.value))}
            className="block h-full text-[18px] w-full px-3 py-2 focus:border-[#27A430] focus:ring-[#27A430] focus:outline-none border-0"
          />
        </div>
      </div>

      <div className="px-3 py-5">
        <div
          ref={sliderRef}
          className="dual-range-slider relative"
          onClick={handleSliderClick}
          style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
        >
          {/* Цветной трек между ползунками */}
          <div
            className="slider-track absolute top-0 h-full bg-[#10b981] rounded"
            style={{
              left: `${getPercent(minVal)}%`,
              width: `${getPercent(maxVal) - getPercent(minVal)}%`,
            }}
          />

          {/* Левый ползунок (мин) */}
          <div
            ref={minThumbRef}
            className="slider-thumb absolute"
            style={{ left: `${getPercent(minVal)}%` }}
            onMouseDown={handleMouseDown('min')}
          />

          {/* Правый ползунок (макс) */}
          <div
            ref={maxThumbRef}
            className="slider-thumb absolute"
            style={{ left: `${getPercent(maxVal)}%` }}
            onMouseDown={handleMouseDown('max')}
          />
        </div>

        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>
            {minVal} {days || 'дней'}
          </span>
          <span>
            {maxVal} {days || 'дней'}
          </span>
        </div>
      </div>
    </FilterAccordion>
  );
}

export default FilterDurationSlider;
