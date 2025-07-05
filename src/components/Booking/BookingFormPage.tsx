'use client';

import { BookingHeader } from './BookingHeader/BookingHeader';

import { Travellers } from './Travellers/Travellers';
import { Passengers } from './Passengers/Passengers';
import { RoomTypes } from './RoomTypes/RoomTypes';
import { BookingInfo } from './BookingInfo/BookingInfo';
import Loader from '../UI/Loader/Loader';
import { useBookingStore } from '@/store/bookingStore';
import { MobileBtn } from './MobileBtn';

export default function BookingFormPage() {
  const { bookingData } = useBookingStore((state) => state);

  if (!bookingData)
    return (
      <div className="container mt-[150px] min-h-[200px] flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <section className="relative pb-[0px]">
      <div className="container mt-[150px] flex flex-col gap-5 min-h-[200px] mb-10 max-[1024px]:mt-[90px]">
        <BookingHeader />

        <div className="flex items-start justify-between gap-5 relative max-[1024px]:flex-col-reverse">
          <div className="flex flex-col gap-10 h-full w-2/2">
            <Travellers />
            <RoomTypes />
            <Passengers />
          </div>

          <div className="h-screen max-[1024px]:w-full max-[1024px]:h-full">
            <BookingInfo />
          </div>
        </div>
      </div>

      <MobileBtn />
    </section>
  );
}
