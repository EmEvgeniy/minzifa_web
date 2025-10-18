'use client';

import IconUser from '../../../assets/icons/booking/user.svg';
import IconShield from '../../../assets/icons/booking/Chield_check_light.svg';
import IconCalendar from '../../../assets/icons/booking/calendar.svg';
import IconLocation from '../../../assets/icons/booking/location.svg';
import IconAirDeparture from '../../../assets/icons/booking/air-departure.svg';
import IconAirLanding from '../../../assets/icons/booking/air-landing.svg';

import { useLocale, useTranslations } from 'next-intl';
import { BookingTourData, useBookingStore } from '@/store/bookingStore';
import Link from 'next/link';
import FormattedPrice from '@/components/UI/FormattedPrice/FormattedPrice';
import { useCallback, useEffect, useState } from 'react';
import { useSnackStore } from '@/components/UI/CustomSnackBar/store';
import { usePostMutation } from '@/api/post.api';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tour } from '@/components/Tour/_types';
import { useMetricsStore } from '@/store/useMetricsStore';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';

export default function BookingInfo({ tour }: { tour: Tour }) {
  const t = useTranslations('Booking');
  const locale = useLocale();

  const router = useRouter();
  const searchParams = useSearchParams();

  const [isChecked, setIsChecked] = useState(false);

  const { bookingData, setBookingData, setSendData } = useBookingStore((state) => state);
  const { metrics } = useMetricsStore();
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
      router.push(`/${locale}/thank-you`);
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

    if (!isPending && isChecked && bookingData) {
      mutate({
        obj: {
          ...bookingData,
          ...metrics,
          travellers_count: (bookingData.travellers_count ?? 0).toString(),
          tour_price: (bookingData.tour_price ?? 0).toString(),
          single_price: (bookingData.single_price ?? 0).toString(),
          deposit: (bookingData.deposit ?? 0).toString(),
          total_price: (bookingData.total_price ?? 0).toString(),
        },
        endpoint: 'forms/booking',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingData, isPending, mutate, isChecked, isAllPassengersValid]);

  return (
    <div className="sticky top-[150px] rounded-2xl space-y-4 bg-white p-5 shadow-xl max-[1024px]:relative max-[1024px]:top-0">
      <hr className="border-gray-300" />

      <div className="bg-[#87EEC7] text-center text-sm rounded-lg px-2.5 py-5 flex flex-row items-center justify-center gap-2">
        <ImageWithFallback
          src={IconShield}
          alt="icon"
          width={24}
          height={24}
          loading={'lazy'}
          className="w-6 h-6"
        />
        <div className="text-md">{t('booking_info.guarantee')}</div>
      </div>
      <hr className="border-gray-300" />
      <div className="grid grid-cols-1 md:grid-cols-[124px_1fr] gap-3 space-y-2">
        <ImageWithFallback
          width={124}
          height={124}
          src={tour?.gallery?.[0]?.file ?? 'https://placehold.co/124x124?text=Minzifa Travel'}
          alt={tour?.gallery?.[0]?.alt_text ?? tour?.name ?? 'Minzifa Travel'}
          className="rounded-xl aspect-square h-auto w-[124px] object-cover"
        />
        <div>
          <div className="text-xs text-gray-500">{tour?.destinations[0].name}</div>
          <h2 className="text-lg leading-snug">{tour?.name}</h2>
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span>
                <ImageWithFallback
                  width={100}
                  height={100}
                  src={IconCalendar}
                  alt="Minzifa Travel"
                  className="w-full h-full object-contain"
                />
              </span>
              <span>
                {t('booking_info.days', { days: tour?.days || tour?.itineraries.length || 1 })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span>
                <ImageWithFallback
                  width={100}
                  height={100}
                  src={IconLocation}
                  alt="Minzifa Travel"
                  className="w-full h-full object-contain"
                />
              </span>{' '}
              <span>
                {t('booking_info.countries', { countries: tour?.destinations.length || 0 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-300" />

      <div className="space-y-2 text-sm">
        <p className="text-[22px] font-semibold">{t('booking_info.price_details')}</p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>
              <ImageWithFallback src={IconAirDeparture} alt="" />
            </span>{' '}
            {t('booking_info.start_trip')}
          </span>
          <span>{bookingData?.tour_start}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>
              <ImageWithFallback src={IconAirLanding} alt="" />
            </span>
            {t('booking_info.end_trip')}
          </span>
          <span>{bookingData?.tour_end}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>
              <ImageWithFallback src={IconUser} alt="" />
            </span>
            {t('booking_info.travellers')}
          </span>
          <span>{bookingData?.travellers_count}</span>
        </div>
      </div>

      <hr className="border-gray-300 max-[1024px]:hidden" />

      <div className="flex justify-between items-center max-[1024px]:hidden">
        <span className="text-xl">{t('booking_info.deposit')}</span>
        <FormattedPrice
          price={bookingData?.deposit ?? 0}
          currency={bookingData?.currency || 'USD'}
          className="text-xl"
        />
      </div>

      <hr className="border-gray-300 my-4 max-[1024px]:hidden" />

      <div className="flex justify-between items-center max-[1024px]:hidden">
        <span className="text-lg">Total (USD)</span>
        <FormattedPrice
          price={bookingData?.total_price ?? 0}
          currency={bookingData?.currency || 'USD'}
          className="text-3xl"
        />
      </div>

      <hr className="border-gray-300 my-4 max-[1024px]:hidden" />

      {/* Terms and conditions */}
      <div className="text-sm max-[1024px]:hidden">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            className="mt-1"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <span className="block">
            {t.rich('booking_info.accept', {
              terms: (chunks) => (
                <Link
                  href={`/${locale}/terms-and-conditions`}
                  className="text-[#009F65] hover:underline"
                >
                  {chunks}
                </Link>
              ),
              privacy: (chunks) => (
                <Link href={`/${locale}/privacy-policy`} className="text-[#009F65] hover:underline">
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
      </div>
      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={
          !isChecked || !isAllPassengersValid || (bookingData.passengers?.length ?? 0) === 0
        }
        className="text-center w-full rounded-4xl disabled:bg-[#DDDDDD] disabled:cursor-not-allowed bg-[#27A430] text-white p-4 cursor-pointer transition-all duration-300 hover:bg-[#208B28] max-[1024px]:hidden"
      >
        {t('button', { count: bookingData?.travellers_count ?? 1 })}
      </button>
    </div>
  );
}
