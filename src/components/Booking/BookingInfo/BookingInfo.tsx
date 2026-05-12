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
import Loader from '@/components/UI/Loader/Loader';
import { FaCreditCard, FaUniversity, FaMoneyBillWave } from 'react-icons/fa';

type BookingInfoProps = {
  bookingData: BookingFormType;
  tour: Tour;
  setValue?: (name: 'payment_type', value: string) => void;
  isSubmitting?: boolean;
  token: string;
  handleRecaptcha: () => Promise<void>;
};

export default function BookingInfo({
  bookingData,
  tour,
  setValue,
  isSubmitting: isFormSubmitting,
  token,
  handleRecaptcha,
}: BookingInfoProps) {
  const t = useTranslations('booking');
  const tGlobal = useTranslations();
  const locale = useLocale();

  const { isSubmitting: hookIsSubmitting } = useFormSubmit();
  const isLoading = isFormSubmitting || hookIsSubmitting;

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
        <div className="text-md">{t('bookingInfo.guarantee')}</div>
      </div>
      <hr className="border-gray-300" />
      <div className="grid grid-cols-1 md:grid-cols-[124px_1fr] gap-3 space-y-2">
        <ImageWithFallback
          width={300}
          height={300}
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
                {t('bookingInfo.days', { days: tour?.days || tour?.itineraries.length || 1 })}
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
                {t('bookingInfo.countries', { countries: tour?.destinations.length || 0 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-300" />

      <div className="space-y-2 text-sm">
        <p className="text-[22px] font-semibold">{t('bookingInfo.priceDetails')}</p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>
              <ImageWithFallback src={IconAirDeparture} alt="" />
            </span>{' '}
            {t('bookingInfo.startTrip')}
          </span>
          <span>{bookingData?.tour_start}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>
              <ImageWithFallback src={IconAirLanding} alt="" />
            </span>
            {t('bookingInfo.endTrip')}
          </span>
          <span>{bookingData?.tour_end}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>
              <ImageWithFallback src={IconUser} alt="" />
            </span>
            {t('bookingInfo.travellers')}
          </span>
          <span>{bookingData?.travellers_count}</span>
        </div>
      </div>

      <hr className="border-gray-300 max-[1024px]:hidden" />

      <div className="flex justify-between items-center max-[1024px]:hidden">
        <span className="text-xl">{t('bookingInfo.deposit')}</span>
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

      {/* Payment method selection */}
      <div className="space-y-2.5">
        <p className="text-sm font-semibold text-[#16372D] uppercase tracking-wide">
          {t('bookingInfo.paymentMethod')}
        </p>

        {(
          [
            {
              value: 'online',
              Icon: FaCreditCard,
              label: t('bookingInfo.onlinePayment'),
              hint: t('bookingInfo.onlinePaymentHint'),
            },
            {
              value: 'bank',
              Icon: FaUniversity,
              label: t('bookingInfo.bankPayment'),
              hint: t('bookingInfo.bankPaymentHint'),
            },
            {
              value: 'on_spot',
              Icon: FaMoneyBillWave,
              label: t('bookingInfo.onSpotPayment'),
              hint: t('bookingInfo.onSpotPaymentHint'),
            },
          ] as const
        ).map(({ value, Icon, label, hint }) => {
          const isSelected =
            value === 'online'
              ? !bookingData?.payment_type || bookingData.payment_type === 'online'
              : bookingData?.payment_type === value;

          return (
            <label
              key={value}
              className={`flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer transition-all duration-200 border ${
                isSelected
                  ? 'border-[#27A430] bg-[#C5DCD3]/30'
                  : 'border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="payment_type"
                value={value}
                checked={isSelected}
                onChange={() => setValue?.('payment_type', value)}
                className="hidden"
              />

              {/* Icon */}
              <span
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 ${
                  isSelected ? 'bg-[#27A430]' : 'bg-gray-200/80'
                }`}
              >
                <Icon size={16} className={isSelected ? 'text-white' : 'text-gray-500'} />
              </span>

              {/* Text */}
              <span className="flex flex-col flex-1 min-w-0">
                <span
                  className={`text-sm font-medium leading-tight transition-colors duration-200 ${
                    isSelected ? 'text-[#16372D]' : 'text-gray-700'
                  }`}
                >
                  {label}
                </span>
                <span className="text-xs text-gray-400 mt-0.5 leading-tight">{hint}</span>
              </span>

              {/* Radio indicator */}
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                  isSelected ? 'border-[#27A430]' : 'border-gray-300'
                }`}
              >
                {isSelected && <span className="w-2 h-2 rounded-full bg-[#27A430]" />}
              </span>
            </label>
          );
        })}
      </div>

      <hr className="border-gray-300 my-4" />

      {/* Terms and conditions */}
      <div className="text-sm max-[1024px]:hidden">
        <Checkbox
          label={tGlobal.rich('common.termsAcceptance', {
            terms: (chunks) => (
              <Link
                href={`/${locale}/term-and-conditions-of-booking-tours`}
                className="text-[#009F65] hover:underline"
                target="_blank"
              >
                {chunks}
              </Link>
            ),
            privacy: (chunks) => (
              <Link
                href={`/${locale}/privacy-policy`}
                className="text-[#009F65] hover:underline"
                target="_blank"
              >
                {chunks}
              </Link>
            ),
          })}
          checked={!!token}
          onChange={() => handleRecaptcha()}
          labelClassName="flex-wrap gap-x-1 text-sm hover:text-gray-700"
        />
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        className="hidden lg:block w-full"
        disabled={!token || isLoading}
        form="booking-form"
      >
        {isLoading ? <Loader /> : t('button')}
      </Button>
    </div>
  );
}
