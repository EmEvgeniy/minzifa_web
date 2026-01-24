'use client';
import Counter from '@/components/UI/Counter/Counter';
import { BookingFormType } from '@/validation/bookingFormSchema';
import { UseFormSetValue } from 'react-hook-form';

function TravellersCounter({ bookingData, setValue }: { bookingData: BookingFormType; setValue: UseFormSetValue<BookingFormType> }) {
  const handleCount = (value: number) => {
    setValue('travellers_count', value);
  };

  return (
    <Counter
      value={bookingData?.travellers_count as number}
      onChange={handleCount}
      label=""
      min={1}
      max={bookingData?.total_seats}
    />
  );
}

export default TravellersCounter;
