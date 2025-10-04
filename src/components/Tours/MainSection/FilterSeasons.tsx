'use client';
import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useFilterStore } from '@/store';

function FilterSeasons({
  pl,
  seasonData,
}: {
  pl: string;
  seasonData: { title: string; value: string }[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const { seasons, setSeasons, buildFilterQuery } = useFilterStore();

  const handleChangeSeasons = (value: string) => {
    setSeasons(value);
    router.replace(`?${buildFilterQuery().toString()}`, { scroll: false });
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between"
      >
        <p className="text-[18px] font-semibold">{pl}</p>
        {isExpanded ? (
          <FaChevronDown className="w-5 h-5" />
        ) : (
          <FaChevronRight className="w-5 h-5" />
        )}
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? 'max-h-[400px] opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col">
          {seasonData.map((el) => (
            <label
              key={el.value}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={seasons.includes(el.value)}
                onChange={() => handleChangeSeasons(el.value)}
                className="w-4 h-4 text-[#27A430] bg-gray-100 border-gray-300 rounded focus:ring-[#27A430] focus:ring-2"
              />
              <span>{el.title}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-200 mt-2" />
    </div>
  );
}

export default FilterSeasons;
