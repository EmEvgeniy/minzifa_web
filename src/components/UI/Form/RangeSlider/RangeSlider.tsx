import React, { RefObject } from 'react';

interface RangeSliderProps {
  minVal: number;
  maxVal: number;
  getPercent: (value: number) => number;
  sliderRef: RefObject<HTMLDivElement | null>;
  minThumbRef: RefObject<HTMLDivElement | null>;
  maxThumbRef: RefObject<HTMLDivElement | null>;
  isDragging: 'min' | 'max' | null;
  handleSliderClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseDown: (thumb: 'min' | 'max') => (e: React.MouseEvent<HTMLDivElement>) => void;
  variant?: 'price' | 'duration';
  showLabels?: boolean;
  suffix?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  minVal,
  maxVal,
  getPercent,
  sliderRef,
  minThumbRef,
  maxThumbRef,
  isDragging,
  handleSliderClick,
  handleMouseDown,
  variant = 'price',
  showLabels = false,
  suffix = '',
}) => {
  return (
    <div className="px-2">
      <div
        ref={sliderRef}
        className="dual-range-slider relative h-2 bg-gray-200 rounded-full cursor-pointer"
        onClick={handleSliderClick}
        style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
      >
        {/* Цветной трек между ползунками */}
        <div
          className={`absolute top-0 h-full rounded-full shadow-sm ${
            variant === 'price' ? 'bg-[#27A430]' : 'bg-gradient-to-r from-[#27A430] to-[#10b981]'
          }`}
          style={{
            left: `${getPercent(minVal)}%`,
            width: `${getPercent(maxVal) - getPercent(minVal)}%`,
          }}
        />

        {/* Левый ползунок (мин) */}
        <div
          ref={minThumbRef}
          className={`absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
            variant === 'price'
              ? 'w-4.5 h-4.5 bg-[#27A430]'
              : 'w-6 h-6 bg-white border-3 border-[#27A430]'
          }`}
          style={{ left: `${getPercent(minVal)}%` }}
          onMouseDown={handleMouseDown('min')}
        >
          {variant === 'duration' && (
            <div className="w-full h-full bg-[#27A430] rounded-full scale-50"></div>
          )}
        </div>

        {/* Правый ползунок (макс) */}
        <div
          ref={maxThumbRef}
          className={`absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
            variant === 'price'
              ? 'w-4.5 h-4.5 bg-[#27A430]'
              : 'w-6 h-6 bg-white border-3 border-[#27A430]'
          }`}
          style={{ left: `${getPercent(maxVal)}%` }}
          onMouseDown={handleMouseDown('max')}
        >
          {variant === 'duration' && (
            <div className="w-full h-full bg-[#27A430] rounded-full scale-50"></div>
          )}
        </div>
      </div>

      {showLabels && variant === 'duration' && (
        <div className="flex justify-between text-sm font-semibold text-gray-600 mt-4">
          <span className="px-2 py-1 bg-gray-100 rounded-md">
            {minVal} {suffix}
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded-md">
            {maxVal} {suffix}
          </span>
        </div>
      )}
    </div>
  );
};

export { RangeSlider };
