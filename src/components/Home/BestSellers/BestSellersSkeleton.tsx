import React from 'react';
import { Skeleton } from '@/components/UI/Skeleton';

interface BestSellersSkeletonProps {
  count?: number;
}

export const BestSellersSkeleton: React.FC<BestSellersSkeletonProps> = ({ count = 4 }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full overflow-visible mb-5">
        <div className="flex gap-4">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="flex-[0_0_81%] sm:flex-[0_0_50%] md:flex-[0_0_27.78%]">
              <div className="bg-white rounded-t-[12px] rounded-b-[16px] overflow-hidden shadow-xl flex flex-col h-full">
                {/* Image Block */}
                <div className="relative w-full h-[200px] lg:h-[270px] shrink-0">
                  <Skeleton
                    className="w-full h-full rounded-t-[12px]"
                    variant="rectangular"
                  />

                  {/* Badge */}
                  <Skeleton
                    className="absolute top-3 left-3"
                    width={80}
                    height={28}
                  />
                </div>

                {/* Info Block */}
                <div className="px-4 py-6 gap-6 flex flex-col justify-between grow lg:p-4 lg:gap-3">
                  <div className="flex flex-col gap-2">
                    <Skeleton
                      className="h-5 w-[40%]"
                      variant="text"
                    />
                    <Skeleton
                      className="h-6 w-[90%]"
                      variant="text"
                    />
                  </div>
                  <div className="flex flex-col items-end self-end gap-1">
                    <Skeleton
                      className="h-4 w-14"
                      variant="text"
                    />
                    <Skeleton
                      className="h-7 w-24"
                      variant="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellersSkeleton;
