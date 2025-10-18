'use client';
import { usePostMutation } from '@/api/post.api';
import { useSnackStore } from '@/components/UI/CustomSnackBar/store';
import FormattedPrice from '@/components/UI/FormattedPrice/FormattedPrice';
import { BookingTourData, useBookingStore } from '@/store/bookingStore';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function MobileBtn({ locale, btn }: { locale: string; btn: string }) {
  const { bookingData, setBookingData, setSendData } = useBookingStore((state) => state);
  const searchParams = useSearchParams();
  const { setMessage, setError } = useSnackStore((state) => state);

  useEffect(() => {
    setBookingData({
      tour_name: searchParams.get('tour_name') || '',
      tour_start: searchParams.get('tour_start') || '',
      tour_end: searchParams.get('tour_end') || '',
      travellers_count: Number(searchParams.get('travellers_count')) || 1,
      tour_price: Number(searchParams.get('tour_price')) || 1,
      deposit: Number(searchParams.get('deposit')) || 0,
      total_price: Number(searchParams.get('total_price')) || 0,
      payment_type: 'cash',
      payment_status: 'pending',
      single_price: Number(searchParams.get('single_price')) || 0,
      currency: searchParams.get('currency') || 'USD',
      total_seats: Number(searchParams.get('total_seats')) || 1,
    });
  }, [searchParams, setBookingData]);

  const { mutate, isPending } = usePostMutation<BookingTourData, BookingTourData>(
    ['subscribe-booking'],
    () => {
      setMessage(locale == 'en' ? 'Your tour was booked!' : 'Ваш тур был забронирован!');
    },
    () => {
      setError(locale == 'en' ? 'Some error was happened' : 'Произошла ошибка');
    },
  );

  const isAllPassengersValid = (bookingData.passengers ?? []).every((p) => {
    return (
      p.first_name?.trim() &&
      p.last_name?.trim() &&
      p.salutation?.trim() &&
      p.email?.trim() &&
      p.phone?.trim() &&
      p.gender?.trim() &&
      p.main_address?.address?.trim()
    );
  });

  const handleSubmit = useCallback(() => {
    if (!isAllPassengersValid) {
      setSendData(false);
      return;
    }

    if (!isPending) {
      mutate({
        obj: bookingData,
        endpoint: 'forms/booking',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingData, isPending, mutate, isAllPassengersValid]);

  return (
    <div className="sticky bottom-0 bg-[#16372D] max-[1024px]:block hidden">
      <div className="container flex items-center justify-between p-5 text-white gap-5">
        <div className="flex justify-start items-start w-2/2 flex-col">
          <span className="text-[14px] text-gray-400">
            {locale === 'ru' ? 'Общая' : 'Total'} (USD)
          </span>
          <FormattedPrice
            price={bookingData?.total_price ?? 0}
            currency={bookingData?.currency}
            className="text-xl"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={
            (!!(Number(bookingData.travellers_count) > 0) &&
              (bookingData.passengers?.length ?? 0) <= 0) ||
            !isAllPassengersValid
          }
          className="text-center text-[14px] max-w-[200px]  w-full rounded-4xl disabled:bg-[#DDDDDD] disabled:cursor-not-allowed bg-[#27A430] text-white p-2 cursor-pointer transition-all duration-300 hover:bg-[#208B28]"
        >
          <span>{btn}</span> - <span>{bookingData?.travellers_count}</span>
        </button>
      </div>
    </div>
  );
}
