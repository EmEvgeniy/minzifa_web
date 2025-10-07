'use client';
import { TourTypeDataResponse } from '@/components/Tours/MainSection/_types';
import { useRouter } from 'next/navigation';
import { useFilterStore } from '@/store';
import { useState } from 'react';

function FilterTypes({ tourTypesData, pl }: { tourTypesData: TourTypeDataResponse; pl: string }) {
  const router = useRouter();
  const { tourTypes, setTourTypes, buildFilterQuery } = useFilterStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChangeTypes = (value: string) => {
    setTourTypes(value);
    router.replace(`?${buildFilterQuery().toString()}`, { scroll: false });
  };

  // Оптимизированный кастомный аккордеон
  const CustomAccordion = () => (
    <div className="border-b border-gray-200">
      <button
        type="button"
        className="w-full text-left py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <p className="text-[18px] font-semibold">{pl}</p>
        <svg
          className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="pb-4">
          <div className="flex flex-col max-h-[300px] overflow-y-auto">
            {tourTypesData.length &&
              tourTypesData?.map((el) => (
                <label
                  key={el.id}
                  className="flex items-center gap-3 py-2 px-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={tourTypes.includes(el.name)}
                    onChange={() => handleChangeTypes(el.name)}
                    className="w-4 h-4 text-[#27A430] focus:ring-[#27A430] rounded"
                  />
                  <span className="text-sm text-gray-700">{el.name}</span>
                </label>
              ))}
          </div>
        </div>
      )}
    </div>
  );

  return <CustomAccordion />;
}

export default FilterTypes;
