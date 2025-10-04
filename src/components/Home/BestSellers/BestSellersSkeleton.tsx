// Кастомный компонент Skeleton
const CustomSkeleton: React.FC<{
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  backgroundColor?: string;
}> = ({
  className = '',
  width = '100%',
  height = '100%',
  borderRadius = '0px',
  backgroundColor = '#E5E7EB',
}) => (
  <div
    className={`animate-pulse ${className}`}
    style={{
      width,
      height,
      borderRadius,
      backgroundColor,
    }}
  />
);

interface BestSellersSkeletonProps {
  count?: number;
}

/**
 * Skeleton компонент для карточек Best Sellers
 * Имитирует структуру карточки Best Sellers во время загрузки
 */
export const BestSellersSkeleton: React.FC<BestSellersSkeletonProps> = ({ count = 4 }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full overflow-visible mb-5">
        <div className="flex gap-4">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className="w-full max-w-[280px] bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col h-full"
            >
              {/* Image Block */}
              <div className="relative w-full aspect-[3/4] flex-shrink-0">
                <CustomSkeleton
                  className="w-full h-full"
                  borderRadius="16px 16px 0 0"
                  backgroundColor="#E5E7EB"
                />

                {/* Бейдж типа тура */}
                <CustomSkeleton
                  width={80}
                  height={24}
                  borderRadius="12px"
                  backgroundColor="rgba(255, 255, 255, 0.7)"
                  className="absolute top-3 left-3"
                />

                {/* Название тура */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                  <CustomSkeleton
                    width="80%"
                    height={24}
                    backgroundColor="rgba(255, 255, 255, 0.3)"
                  />
                </div>
              </div>

              {/* Info Block */}
              <div className="p-4 flex flex-col justify-between flex-grow gap-3">
                {/* Дни и направления */}
                <div className="flex flex-col gap-2">
                  <CustomSkeleton width="60%" height={20} backgroundColor="#E5E7EB" />
                </div>

                {/* Цена и кнопка */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CustomSkeleton width="40%" height={18} backgroundColor="#E5E7EB" />
                    <CustomSkeleton width="50%" height={24} backgroundColor="#E5E7EB" />
                  </div>

                  <CustomSkeleton
                    width={120}
                    height={32}
                    borderRadius="20px"
                    backgroundColor="#E5E7EB"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-wrap items-center justify-between gap-3">
        <div className="flex-shrink">
          <CustomSkeleton width={150} height={40} borderRadius="8px" backgroundColor="#E5E7EB" />
        </div>
        <div className="flex-shrink flex gap-2">
          <CustomSkeleton width={40} height={40} borderRadius="50%" backgroundColor="#E5E7EB" />
          <CustomSkeleton width={40} height={40} borderRadius="50%" backgroundColor="#E5E7EB" />
        </div>
      </div>
    </div>
  );
};

export default BestSellersSkeleton;
