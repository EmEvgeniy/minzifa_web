import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Универсальный хук для управления двусторонним слайдером диапазона значений
 *
 * Поддерживает перетаскивание ползунков, клики по треку, ввод значений в поля
 * и автоматическое позиционирование элементов слайдера.
 *
 * @example
 * ```tsx
 * // Для ценового диапазона (0-20000)
 * const { minVal, maxVal, sliderRef, minThumbRef, maxThumbRef, ...handlers } = useRangeSlider({
 *   values: prices,
 *   setValues: setPrices,
 *   minRange: 0,
 *   maxRange: 20000,
 *   step: 1
 * });
 *
 * // Для длительности тура (1-31 день)
 * const { minVal, maxVal, sliderRef, minThumbRef, maxThumbRef, ...handlers } = useRangeSlider({
 *   values: durations,
 *   setValues: setDurations,
 *   minRange: 1,
 *   maxRange: 31,
 *   step: 1
 * });
 * ```
 *
 * @example
 * ```tsx
 * // Использование в JSX
 * <div ref={sliderRef} onClick={handleSliderClick}>
 *   <div ref={minThumbRef} onMouseDown={handleMouseDown('min')}>
 *     {minVal}
 *   </div>
 *   <div ref={maxThumbRef} onMouseDown={handleMouseDown('max')}>
 *     {maxVal}
 *   </div>
 * </div>
 * ```
 */
interface UseRangeSliderProps {
  /** Текущие значения диапазона [мин, макс] */
  values: number[];
  /** Функция для обновления значений диапазона */
  setValues: (values: number[]) => void;
  /** Минимальное значение диапазона (по умолчанию: 0) */
  minRange?: number;
  /** Максимальное значение диапазона (по умолчанию: 20000) */
  maxRange?: number;
  /** Шаг округления значений (по умолчанию: 1) */
  step?: number;
}

interface UseRangeSliderReturn {
  /** Текущее состояние перетаскивания ('min', 'max' или null) */
  isDragging: 'min' | 'max' | null;
  /** Реф для контейнера слайдера */
  sliderRef: React.RefObject<HTMLDivElement | null>;
  /** Реф для минимального ползунка */
  minThumbRef: React.RefObject<HTMLDivElement | null>;
  /** Реф для максимального ползунка */
  maxThumbRef: React.RefObject<HTMLDivElement | null>;
  /** Текущее минимальное значение */
  minVal: number;
  /** Текущее максимальное значение */
  maxVal: number;
  /** Функция для расчета позиции в процентах */
  getPercent: (value: number) => number;
  /** Обработчик изменения значения в поле ввода */
  handleInputChange: (index: number, value: number) => void;
  /** Обработчик клика по треку слайдера */
  handleSliderClick: (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => void;
  /** Обработчик начала перетаскивания ползунка мышью */
  handleMouseDown: (thumb: 'min' | 'max') => (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Обработчик начала перетаскивания ползунка тачем */
  handleTouchStart: (thumb: 'min' | 'max') => (event: React.TouchEvent<HTMLDivElement>) => void;
}

/**
 * Хук для работы с диапазоном значений.
 *
 * @param values - Текущие значения диапазона [мин, макс].
 * @param setValues - Функция для обновления значений диапазона.
 * @param minRange - Минимальное значение диапазона (по умолчанию: 0).
 * @param maxRange - Максимальное значение диапазона (по умолчанию: 20000).
 * @param step - Шаг округления значений (по умолчанию: 1).
 *
 * @returns Объект с свойствами:
 *   - isDragging - Текущее состояние перетаскивания ('min', 'max' или null).
 *   - sliderRef - Реф для контейнера слайдера.
 *   - minThumbRef - Реф для минимального ползунка.
 *   - maxThumbRef - Реф для максимального ползунка.
 *   - minVal - Текущее минимальное значение.
 *   - maxVal - Текущее максимальное значение.
 *   - getPercent - Функция для расчета позиции в процентах.
 *   - handleInputChange - Обработчик изменения значения в поле ввода.
 *   - handleSliderClick - Обработчик клика по треку слайдера.
 *   - handleMouseDown - Обработчик начала перетаскивания ползунка.
 */
export const useRangeSlider = ({
  values,
  setValues,
  minRange = 0,
  maxRange = 20000,
  step = 1,
}: UseRangeSliderProps): UseRangeSliderReturn => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const minThumbRef = useRef<HTMLDivElement>(null);
  const maxThumbRef = useRef<HTMLDivElement>(null);

  const minVal = values[0] || minRange;
  const maxVal = values[1] || maxRange;

  const getPercent = useCallback(
    (value: number) => {
      const clampedValue = Math.max(minRange, Math.min(value, maxRange));
      return ((clampedValue - minRange) / (maxRange - minRange)) * 100;
    },
    [minRange, maxRange],
  );

  const handleInputChange = useCallback(
    (index: number, value: number) => {
      const newValues: [number, number] = [...values] as [number, number];

      value = Math.max(minRange, Math.min(value, maxRange));
      value = Math.round(value / step) * step; // округляем до шага

      if (index === 0 && value > newValues[1]) {
        newValues[0] = newValues[1];
      } else if (index === 1 && value < newValues[0]) {
        newValues[1] = newValues[0];
      } else {
        newValues[index] = value;
      }

      setValues(newValues);
    },
    [values, setValues, minRange, maxRange, step],
  );

  const handleSliderClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (!sliderRef.current || isDragging) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clickX = clientX - rect.left;
      const sliderWidth = rect.width;
      const clickPercent = (clickX / sliderWidth) * 100;
      const clickValue = minRange + (clickPercent / 100) * (maxRange - minRange);
      const roundedClickValue = Math.round(clickValue / step) * step;

      // Определяем, какой ползунок ближе к клику
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);
      const distanceToMin = Math.abs(clickPercent - minPercent);
      const distanceToMax = Math.abs(clickPercent - maxPercent);

      if (distanceToMin < distanceToMax) {
        handleInputChange(0, Math.min(roundedClickValue, maxVal));
      } else {
        handleInputChange(1, Math.max(roundedClickValue, minVal));
      }
    },
    [isDragging, minVal, maxVal, minRange, maxRange, step, getPercent, handleInputChange],
  );

  const handleMouseDown = useCallback(
    (thumb: 'min' | 'max') => (event: React.MouseEvent) => {
      setIsDragging(thumb);
      event.preventDefault();
    },
    [],
  );

  const handleTouchStart = useCallback(
    (thumb: 'min' | 'max') => (event: React.TouchEvent) => {
      setIsDragging(thumb);
      event.preventDefault();
    },
    [],
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const sliderX = event.clientX - rect.left;
      const sliderWidth = rect.width;
      const percent = Math.max(0, Math.min(100, (sliderX / sliderWidth) * 100));
      const value = minRange + (percent / 100) * (maxRange - minRange);
      const roundedValue = Math.round(value / step) * step;

      if (isDragging === 'min') {
        handleInputChange(0, Math.min(roundedValue, maxVal));
      } else if (isDragging === 'max') {
        handleInputChange(1, Math.max(roundedValue, minVal));
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const sliderX = event.touches[0].clientX - rect.left;
      const sliderWidth = rect.width;
      const percent = Math.max(0, Math.min(100, (sliderX / sliderWidth) * 100));
      const value = minRange + (percent / 100) * (maxRange - minRange);
      const roundedValue = Math.round(value / step) * step;

      if (isDragging === 'min') {
        handleInputChange(0, Math.min(roundedValue, maxVal));
      } else if (isDragging === 'max') {
        handleInputChange(1, Math.max(roundedValue, minVal));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    const handleTouchEnd = () => {
      setIsDragging(null);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, minVal, maxVal, minRange, maxRange, step, handleInputChange]);

  return {
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
  };
};
