'use client';

import { useRouter } from 'next/navigation';
import { useFilterStore } from '@/store';
import FilterAccordion from '@/components/UI/FilterAccordion';

function FilterPriceSlider({ pl, pl2, pl3 }: { pl: string; pl2: string; pl3: string }) {
  const { prices, setPrices, buildFilterQuery } = useFilterStore();
  const router = useRouter();

  const handleInputChange = (index: number, value: number) => {
    const newPrices: [number, number] = [...prices] as [number, number];

    value = Math.max(0, Math.min(value, 20000));

    if (index === 0 && value > newPrices[1]) {
      newPrices[0] = newPrices[1];
    } else if (index === 1 && value < newPrices[0]) {
      newPrices[1] = newPrices[0];
    } else {
      newPrices[index] = value;
    }

    setPrices(newPrices);
    router.replace(`?${buildFilterQuery().toString()}`, { scroll: false });
  };

  return (
    <FilterAccordion title={pl} filterKey="price-old">
      <div className="grid grid-cols-2 gap-2 border-2 border-gray-300 rounded-2xl p-0">
        <div className="flex flex-col">
          <span className="mt-1 px-3 text-[18px] text-gray-400">{pl2}</span>
          <input
            type="number"
            min={0}
            value={prices[0] || 0}
            onChange={(e) => handleInputChange(0, Number(e.target.value))}
            className="block h-full text-[18px] w-full px-3 py-2 focus:border-[#27A430] focus:ring-[#27A430] focus:outline-none border-0"
          />
        </div>

        <div className="flex flex-col">
          <span className="mt-1 px-3 text-[18px] text-gray-400">{pl3}</span>
          <input
            type="number"
            min={0}
            value={prices[1] || 20000}
            onChange={(e) => handleInputChange(1, Number(e.target.value))}
            className="block h-full text-[18px] w-full px-3 py-2 focus:border-[#27A430] focus:ring-[#27A430] focus:outline-none border-0"
          />
        </div>
      </div>

      <div className="px-3 py-5">
        <div className="relative">
          <input
            type="range"
            min={0}
            max={20000}
            value={prices[0] || 0}
            onChange={(e) => handleInputChange(0, Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <input
            type="range"
            min={0}
            max={20000}
            value={prices[1] || 20000}
            onChange={(e) => handleInputChange(1, Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider absolute top-0"
          />
        </div>

        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>${prices[0] || 0}</span>
          <span>${prices[1] || 20000}</span>
        </div>
      </div>
    </FilterAccordion>
  );
}

export default FilterPriceSlider;
