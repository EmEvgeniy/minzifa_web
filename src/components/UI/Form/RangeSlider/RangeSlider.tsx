import React, { RefObject } from 'react';

interface RangeSliderProps {
  minVal: number;
  maxVal: number;
  getPercent: (value: number) => number;
  sliderRef: RefObject<HTMLDivElement | null>;
  minThumbRef: RefObject<HTMLDivElement | null>;
  maxThumbRef: RefObject<HTMLDivElement | null>;
  isDragging: 'min' | 'max' | null;
  handleSliderClick: (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
  handleMouseDown: (thumb: 'min' | 'max') => (e: React.MouseEvent<HTMLDivElement>) => void;
  handleTouchStart: (thumb: 'min' | 'max') => (e: React.TouchEvent<HTMLDivElement>) => void;
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
  handleTouchStart,
}) => {
  return (
    <div className="px-2">
      <div
        ref={sliderRef}
        className="dual-range-slider relative h-2 bg-gray-200 rounded-full cursor-pointer"
        onClick={handleSliderClick}
        onTouchEnd={handleSliderClick}
        style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
      >
        {/* Цветной трек между ползунками */}
        <div
          className="absolute top-0 h-full rounded-full shadow-sm bg-[#27A430]"
          style={{
            left: `${getPercent(minVal)}%`,
            width: `${getPercent(maxVal) - getPercent(minVal)}%`,
          }}
        />

        {/* Левый ползунок (мин) */}
        <div
          ref={minThumbRef}
          className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 w-4.5 h-4.5 bg-[#27A430]"
          style={{ left: `${getPercent(minVal)}%` }}
          onMouseDown={handleMouseDown('min')}
          onTouchStart={handleTouchStart('min')}
        />

        {/* Правый ползунок (макс) */}
        <div
          ref={maxThumbRef}
          className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 w-4.5 h-4.5 bg-[#27A430]"
          style={{ left: `${getPercent(maxVal)}%` }}
          onMouseDown={handleMouseDown('max')}
          onTouchStart={handleTouchStart('max')}
        />
      </div>
    </div>
  );
};

export { RangeSlider };
