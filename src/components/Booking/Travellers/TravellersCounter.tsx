'use client';
import Counter from '@/components/UI/Counter/Counter';
import { useBookingStore } from '@/store/bookingStore';

function TravellersCounter() {
  const { bookingData, setBookingData } = useBookingStore((state) => state);

  const handleCount = (value: number) => {
    const tour_price = bookingData?.tour_price as number;

    setBookingData({
      ...bookingData,
      room_types: {
        standart: 1,
        single: 0,
      },
      travellers_count: value,
      deposit: tour_price * 0.15 * Number(value),
      total_price: tour_price * Number(value),
    });
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
