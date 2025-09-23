'use client';
import { Itinerary } from '../_types';
import { useItineraryStore } from './store';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

type TourItineraryBtnProps = {
  closed: string;
  expanded: string;
  itineraries: Itinerary[];
};

function TourItineraryBtn({ closed, expanded, itineraries }: TourItineraryBtnProps) {
  const { handleToggleAll, isAllExpanded } = useItineraryStore((s) => s);

  return (
    <button
      className="flex flex-row gap-2 items-center hover:underline cursor-pointer text-[14px] max-[550px]:text-[12px] max-[550px]:gap-1"
      onClick={() => handleToggleAll(itineraries)}
    >
      {isAllExpanded ? (
        <>
          {closed} <FaChevronUp />
        </>
      ) : (
        <>
          {expanded} <FaChevronDown />
        </>
      )}
    </button>
  );
}

export default TourItineraryBtn;
