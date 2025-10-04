'use client';

import { cn } from '@/utils/utils';
import { GroupPrice, Tour } from '../_types';
import { useLocale, useTranslations } from 'next-intl';
import Counter from '@/components/UI/Counter/Counter';
import TourBookingPrice from './TourBookingPrice';
import { FormattedPrice } from '@/components/UI/FormattedPrice/FormattedPrice';
import { useTourBooking } from './useTourBooking';
import ComfortOption from './ComfortOption';

interface TourBookingProps {
  prices: GroupPrice[] | undefined;
  className?: string;
  tour: Tour;
}

export default function TourBooking({ prices, className, tour }: TourBookingProps) {
  const t = useTranslations('Tour');
  const locale = useLocale();

  const {
    travellers,
    selectedPrice,
    totalPrice,
    setTravellers,
    setSelectedPrice,
    setTotalPrice,
    handleBooking,
    handlePrivateTourBooking,
    handleComfortBooking,
    handleFreeConsultation,
  } = useTourBooking({ prices, tour, locale });

  if (!prices) return null;

  return (
    <div className={cn(className, 'sticky top-36 ')}>
      <div className="bg-white rounded-2xl p-6 flex flex-col gap-5">
        <div className="text-base">
          {t('booking.from')}{' '}
          <FormattedPrice
            price={totalPrice}
            currency={selectedPrice?.valute}
            className="text-4xl font-semibold"
            as={'span'}
            minimumFractionDigits={0}
          />
        </div>
        <div className="text-base">{t('booking.per_tourist', { days: tour?.days || 1 })}</div>
        <TourBookingPrice
          locale={locale}
          travellers={travellers}
          prices={prices}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          setTotalPrice={setTotalPrice}
        />
        <Counter
          min={1}
          max={10}
          value={travellers}
          onChange={(value) => {
            setTravellers(value);
            if (selectedPrice) {
              setTotalPrice(selectedPrice.price_for_double * value);
            }
          }}
          className="border border-gray-300 rounded-2xl p-3"
          label={t('booking.travellers')}
        />

        <button
          onClick={() => {
            if (tour?.tour_type === 'individual') {
              handlePrivateTourBooking();
            } else {
              handleBooking();
            }
          }}
          className="text-center w-full rounded-4xl bg-[#27A430] text-white p-4 cursor-pointer transition-all duration-300 hover:bg-[#208B28]"
        >
          {tour?.tour_type === 'individual' ? t('by_request.button') : t('booking.button')}
        </button>

        {/* Free Consultation button for group tours */}
        {tour?.tour_type !== 'individual' && (
          <button
            onClick={handleFreeConsultation}
            className="text-center w-full rounded-4xl bg-[#16372D] text-white p-4 cursor-pointer transition-all duration-300 hover:opacity-90"
          >
            {t('free_consultation')}
          </button>
        )}

        {/* Individual tour comfort selector */}
        {tour?.tour_type === 'individual' && (
          <div className="flex flex-col gap-3">
            <div className="text-base font-semibold text-[#16372D]">{t('comfort.title')}</div>
            <ComfortOption
              label={t('comfort.moderate')}
              price={tour?.prices?.price_for_3_hotels}
              currency={tour?.prices?.valute || 'USD'}
              onSelect={() => handleComfortBooking()}
            />
            <ComfortOption
              label={t('comfort.enhanced')}
              price={tour?.prices?.price_for_4_hotels}
              currency={tour?.prices?.valute || 'USD'}
              onSelect={() => handleComfortBooking()}
            />
            <ComfortOption
              label={t('comfort.ultimate')}
              price={tour?.prices?.price_for_5_hotels}
              currency={tour?.prices?.valute || 'USD'}
              onSelect={() => handleComfortBooking()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
