'use client';

import IconUser from '../../../assets/icons/booking/user.svg';
import IconShield from '../../../assets/icons/booking/Chield_check_light.svg';
import IconCalendar from '../../../assets/icons/booking/calendar.svg';
import IconLocation from '../../../assets/icons/booking/location.svg';
import IconAirDeparture from '../../../assets/icons/booking/air-departure.svg';
import IconAirLanding from '../../../assets/icons/booking/air-landing.svg';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import FormattedPrice from '@/components/UI/FormattedPrice/FormattedPrice';
import { Tour } from '@/components/Tour/_types';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import Button from '@/components/UI/Button/Button';
import { BookingFormType } from '@/validation/bookingFormSchema';
import { Checkbox } from '@/components/UI/Form/Checkbox/Checkbox';
import { useFormSubmit } from '@/hooks';
import { FormNameEnum } from '@/constants';

type BookingInfoProps = {
  bookingData: BookingFormType,
  tour: Tour,
  getToken: (formName: FormNameEnum) => Promise<void>,
  token: string
};

export default function BookingInfo({ bookingData, tour, getToken, token }: BookingInfoProps) {
  const t = useTranslations();
  const locale = useLocale();

  const { isSubmitting } = useFormSubmit();

  const handleRecaptcha = async () => await getToken(FormNameEnum.BOOKING);

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
        <div className="text-md">{t('Booking.booking_info.guarantee')}</div>
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
                {t('Booking.booking_info.days', { days: tour?.days || tour?.itineraries.length || 1 })}
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
                {t('Booking.booking_info.countries', { countries: tour?.destinations.length || 0 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-300" />

      <div className="space-y-2 text-sm">
        <p className="text-[22px] font-semibold">{t('Booking.booking_info.price_details')}</p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>
              <ImageWithFallback src={IconAirDeparture} alt="" />
            </span>{' '}
            {t('Booking.booking_info.start_trip')}
          </span>
          <span>{bookingData?.tour_start}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>
              <ImageWithFallback src={IconAirLanding} alt="" />
            </span>
            {t('Booking.booking_info.end_trip')}
          </span>
          <span>{bookingData?.tour_end}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>
              <ImageWithFallback src={IconUser} alt="" />
            </span>
            {t('Booking.booking_info.travellers')}
          </span>
          <span>{bookingData?.travellers_count}</span>
        </div>
      </div>

      <hr className="border-gray-300 max-[1024px]:hidden" />

      <div className="flex justify-between items-center max-[1024px]:hidden">
        <span className="text-xl">{t('Booking.booking_info.deposit')}</span>
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
        <Checkbox
          label={t.rich('confirm_form_text', {
            terms: (chunks) => (
              <Link
                href={`/${locale}/term-and-conditions-of-booking-tours`}
                className="text-[#009F65] hover:underline"
                target='_blank'
              >
                {chunks}
              </Link>
            ),
            privacy: (chunks) => (
              <Link href={`/${locale}/privacy-policy`} className="text-[#009F65] hover:underline" target='_blank'>
                {chunks}
              </Link>
            ),
          })}
          checked={!!token}
          onChange={handleRecaptcha}
          labelClassName='flex-wrap gap-x-1 text-sm'
        />
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        className='hidden lg:block w-full'
        disabled={isSubmitting || !token}
        form="booking-form"
      >
        {t('Booking.button')}
      </Button>
    </div>
  );
}

