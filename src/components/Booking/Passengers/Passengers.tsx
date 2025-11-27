'use client';

import { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { FieldErrors } from 'react-hook-form';
import { BookingFormType } from '@/validation/bookingFormSchema';
import { useEffect, useState } from 'react';
import { CustomAccordion, CustomAccordionDetails, CustomAccordionSummary } from '@/components/UI/CustomAccordion/CustomAccordion';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { Passenger } from './Passenger';
import IconUser from '@/assets/icons/booking/user.svg';

export default function Passengers({ bookingData, errors, control }: { bookingData: BookingFormType, errors: FieldErrors, control: Control<BookingFormType> }) {
  const t = useTranslations('Booking');
  const hints = t.raw('passenger.passenger_hint') as string[];

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
    <div className="flex flex-col gap-5">
      <h2 className="text-[#16372D] text-4xl max-[768px]:text-[24px] max-[768px]:text-center">
        {t('passenger.title')}
      </h2>

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
                    <span>{t('passenger.passenger')}</span>
                    <span>{index + 1}</span>
                  </p>
                </div>
              </CustomAccordionSummary>
              <CustomAccordionDetails className="h-full p-5">
                <Passenger bookingData={bookingData} index={index} hints={hints} errors={errors} control={control} />
              </CustomAccordionDetails>
            </div>
          ))}
        </CustomAccordion>
      </div>
    </div>
  );
}
