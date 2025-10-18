import React from 'react';
import { cn } from '@/utils/utils';

interface TourCardSkeletonProps {
  variant?: 'horizontal' | 'vertical' | 'grid';
  className?: string;
}

// Оптимизированный кастомный Skeleton компонент
const CustomSkeleton: React.FC<{
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
}> = ({ className = '', width = '100%', height = '100%', borderRadius = '0px' }) => (
  <div
    className={cn('animate-pulse bg-gray-200', className)}
    style={{
      width,
      height,
      borderRadius,
    }}
  />
);

/**
 * Skeleton компонент для карточек туров
 * Имитирует структуру карточки тура во время загрузки
 */
export const TourCardSkeleton: React.FC<TourCardSkeletonProps> = ({
  variant = 'horizontal',
  className,
}) => {
  if (variant === 'horizontal') {
    return (
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-[353px_1fr] w-full bg-white rounded-[16px] shadow-2xl overflow-hidden',
          className,
        )}
      >
        {/* Блок изображения */}
        <div className="relative w-full h-full md:h-full md:max-h-[254px] overflow-hidden">
          <CustomSkeleton className="md:max-h-[250px]" />
          {/* Бейдж типа тура поверх изображения */}
          <CustomSkeleton
            width={100}
            height={24}
            borderRadius="12px"
            className="absolute top-3 left-3"
          />
        </div>

        {/* Контент карточки */}
        <div className="w-full p-5 flex flex-col justify-between gap-4">
          {/* Название и блок цен */}
          <div className="flex flex-row items-start justify-between gap-4">
            <CustomSkeleton width="60%" height={32} />
            <div className="flex flex-row items-start gap-6 shrink-0">
              {/* Дни */}
              <div className="flex flex-col items-end gap-1">
                <CustomSkeleton width={40} height={16} />
                <CustomSkeleton width={30} height={24} />
              </div>
              {/* Разделитель */}
              <div className="w-px bg-gray-300 h-10" />
              {/* Цена */}
              <div className="flex flex-col items-end gap-1">
                <CustomSkeleton width={40} height={16} />
                <CustomSkeleton width={60} height={24} />
              </div>
            </div>
          </div>

          {/* Локация */}
          <div className="flex items-center gap-2">
            <CustomSkeleton width={32} height={32} borderRadius="50%" />
            <div className="flex flex-col gap-1">
              <CustomSkeleton width={80} height={16} />
              <CustomSkeleton width={150} height={14} />
            </div>
          </div>

          {/* Кнопка */}
          <CustomSkeleton width="100%" height={40} borderRadius="12px" />
        </div>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div
        className={cn(
          'w-full bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col h-full',
          className,
        )}
      >
        {/* Image Block */}
        <div className="relative w-full aspect-[4/3] flex-shrink-0">
          <CustomSkeleton className="w-full h-full" />
          {/* Бейдж типа тура поверх изображения */}
          <CustomSkeleton
            width={100}
            height={24}
            borderRadius="12px"
            className="absolute top-3 left-3"
          />
        </div>

        {/* Info Block */}
        <div className="p-4 flex flex-col justify-between flex-grow gap-3">
          {/* Дни и направления */}
          <div className="flex flex-col gap-2">
            {/* Дни и направление */}
            <div className="flex items-center gap-2">
              <CustomSkeleton width={60} height={18} />
              <CustomSkeleton width={20} height={18} />
              <CustomSkeleton width={100} height={18} />
            </div>
          </div>

          {/* Цена и кнопка */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CustomSkeleton width={50} height={16} />
              <CustomSkeleton width={80} height={24} />
            </div>
            <CustomSkeleton width={100} height={32} borderRadius="12px" />
          </div>
        </div>
      </div>
    );
  }

  // Grid variant (для мобильной сетки)
  return (
    <div
      className={cn(
        'w-full bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col',
        className,
      )}
    >
      {/* Image Block */}
      <div className="relative w-full aspect-[4/3] min-h-[200px]">
        <CustomSkeleton width="100%" height="100%" />
      </div>

      {/* Info Block */}
      <div className="p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CustomSkeleton width={60} height={18} />
            <CustomSkeleton width={40} height={18} />
          </div>
          <div className="flex items-center gap-2">
            <CustomSkeleton width={50} height={14} />
            <CustomSkeleton width={80} height={22} />
          </div>
        </div>
        <CustomSkeleton width={90} height={32} borderRadius="16px" />
      </div>
    </div>
  );
};

/**
 * Skeleton для списка карточек туров
 */
export const TourCardListSkeleton: React.FC<{
  count?: number;
  variant?: 'horizontal' | 'vertical' | 'grid';
  className?: string;
}> = ({ count = 5, variant = 'horizontal', className }) => {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <TourCardSkeleton key={index} variant={variant} />
      ))}
    </div>
  );
};

export default TourCardSkeleton;
