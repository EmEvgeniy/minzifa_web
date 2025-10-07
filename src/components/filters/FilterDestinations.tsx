'use client';
import { DestinationDataResponse } from '@/components/Tours/MainSection/_types';
import { useMemo, useState } from 'react';
import useDebouncedValue from '@/hooks/useDebouncedValue';
import { FaTimes, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useFilterStore } from '@/store';

const AccordionSummary = ({
  children,
  isExpanded,
  onClick,
}: {
  children: React.ReactNode;
  isExpanded: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between"
  >
    <p className="text-[18px] font-semibold">{children}</p>
    {isExpanded ? <FaChevronDown className="w-5 h-5" /> : <FaChevronRight className="w-5 h-5" />}
  </button>
);

const AccordionDetails = ({
  children,
  isExpanded,
}: {
  children: React.ReactNode;
  isExpanded: boolean;
}) => (
  <div
    className={`transition-all duration-300 overflow-hidden ${
      isExpanded ? 'max-h-[400px] opacity-100 mt-2' : 'max-h-0 opacity-0'
    }`}
  >
    {children}
  </div>
);

function FilterDestinations({
  destinationsData,
  pl,
  pl2,
}: {
  destinationsData: DestinationDataResponse;
  pl: string;
  pl2: string;
}) {
  const { destinations, setDestinations, buildFilterQuery } = useFilterStore();
  const [searchDestination, setSearchDestination] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const filteredDestinations = useMemo(() => {
    return Array.isArray(destinationsData)
      ? destinationsData.filter((el) =>
          el.name.toLowerCase().includes(searchDestination.toLowerCase()),
        )
      : [];
  }, [destinationsData, searchDestination]);

  const debouncedDestinations = useDebouncedValue(filteredDestinations, 300);

  const handleChangeDestinations = (value: string) => {
    setDestinations(value);
    router.replace(`?${buildFilterQuery().toString()}`, { scroll: false });
  };

  return (
    <div className="w-full">
      <AccordionSummary isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
        <p className="text-[18px] font-semibold">{pl}</p>
      </AccordionSummary>

      <AccordionDetails isExpanded={isExpanded}>
        <div className="w-full">
          <div className="relative flex items-center justify-center">
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 focus:border-gray-500 focus:ring-gray-500 focus:outline-none w-full"
              value={searchDestination}
              onChange={(e) => setSearchDestination(e.target.value)}
              placeholder={pl2}
            />
            {searchDestination && (
              <button
                className="absolute right-0 cursor-pointer p-2"
                onClick={() => setSearchDestination('')}
              >
                <FaTimes />
              </button>
            )}
          </div>
          <div className="flex flex-col overflow-y-scroll max-h-[300px]">
            {debouncedDestinations?.map((el) => (
              <label
                key={el.id}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={destinations.includes(el.slug)}
                  onChange={() => handleChangeDestinations(el.slug)}
                  className="w-4 h-4 text-[#27A430] bg-gray-100 border-gray-300 rounded focus:ring-[#27A430] focus:ring-2"
                />
                <span>{el.name}</span>
              </label>
            ))}
          </div>
        </div>
      </AccordionDetails>
    </div>
  );
}

export default FilterDestinations;
