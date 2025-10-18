'use client';
import {
  CustomAccordion,
  CustomAccordionDetails,
  CustomAccordionSummary,
} from '@/components/UI/CustomAccordion/CustomAccordion';
import IconUser from '@/assets/icons/booking/user.svg';
import { Passenger } from './Passenger';
import { useBookingStore } from '@/store/bookingStore';
import { useEffect, useState } from 'react';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';

function PassengersInner({ passenger, hints }: { passenger: string; hints: string[] }) {
  const { bookingData } = useBookingStore((state) => state);

  const [passengerAccordionIndexes, setPassengerAccordionIndexes] = useState<number[] | undefined>(
    [],
  );

  useEffect(() => {
    if (!bookingData?.travellers_count) return;
    setPassengerAccordionIndexes(
      Array.from({ length: Number(bookingData?.travellers_count) }, (_, i) => i),
    );
  }, [bookingData?.travellers_count]);

  return (
    <div className="flex flex-col gap-5 rounded-2xl">
      <CustomAccordion
        expandedIndexes={passengerAccordionIndexes}
        onExpandedIndexesChange={setPassengerAccordionIndexes}
        className="bg-transparent p-0 rounded-none flex flex-col gap-5"
      >
        {Array.from({ length: Number(bookingData?.travellers_count) }).map((_, index) => (
          <div key={index}>
            <CustomAccordionSummary className="bg-white p-5 w-full flex flex-row gap-3 items-center text-base">
              <div className="flex items-center gap-4">
                <ImageWithFallback
                  src={IconUser}
                  width={100}
                  height={100}
                  alt="Minzifa Travel"
                  className="w-6 h-6"
                />
                <p className="flex items-center gap-1.5">
                  <span>{passenger}</span>
                  <span>{index + 1}</span>
                </p>
              </div>
            </CustomAccordionSummary>
            <CustomAccordionDetails className="h-full p-5 max-[1024px]:overflow-y-scroll">
              <Passenger index={index} hints={hints} />
            </CustomAccordionDetails>
          </div>
        ))}
      </CustomAccordion>
    </div>
  );
}

export default PassengersInner;
