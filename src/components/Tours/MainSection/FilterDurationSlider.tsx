'use client';
import { useFilterStore } from '@/store';
import { useRouter } from 'next/navigation';
import FilterAccordion from '@/components/UI/FilterAccordion';

function FilterDurationSlider({ pl, pl2, pl3 }: { pl: string; pl2: string; pl3: string }) {
  const router = useRouter();
  const { durations, setDurations, buildFilterQuery } = useFilterStore();

  const handleChangeDurations = (newValue: number[]) => {
    setDurations(newValue);
    router.replace(`?${buildFilterQuery().toString()}`, { scroll: false });
  };

  const handleInputChange = (index: number, value: string) => {
    const val = Number(value);
    if (!isNaN(val)) {
      const newDurations = [...durations];
      newDurations[index] = val;
      handleChangeDurations(newDurations);
    }
  };

  return (
    <FilterAccordion title={pl}>
      <div className="grid grid-cols-2 gap-2 border-2 border-gray-300 rounded-2xl p-0">
        <div className="flex flex-col">
          <span className="mt-1 px-3 text-[18px] text-gray-400">{pl2}</span>
          <input
            type="number"
            min={1}
            value={durations[0] || 1}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="block h-full text-[18px] w-full px-3 py-2 focus:border-[#27A430] focus:ring-[#27A430] focus:outline-none border-0"
          />
        </div>

        <div className="flex flex-col">
          <span className="mt-1 px-3 text-[18px] text-gray-400">{pl3}</span>
          <input
            type="number"
            min={1}
            value={durations[1] || 31}
            onChange={(e) => handleInputChange(1, e.target.value)}
            className="block h-full text-[18px] w-full px-3 py-2 focus:border-[#27A430] focus:ring-[#27A430] focus:outline-none border-0"
          />
        </div>
      </div>

      <div className="px-3 py-5">
        <div className="relative">
          <input
            type="range"
            min={1}
            max={31}
            value={durations[0] || 1}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <input
            type="range"
            min={1}
            max={31}
            value={durations[1] || 31}
            onChange={(e) => handleInputChange(1, e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider absolute top-0"
          />
        </div>

        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{durations[0] || 1} дней</span>
          <span>{durations[1] || 31} дней</span>
        </div>
      </div>
    </FilterAccordion>
  );
}

export default FilterDurationSlider;
