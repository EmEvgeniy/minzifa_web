'use client';

import FormattedPrice from '@/components/UI/FormattedPrice/FormattedPrice';
import { useLocale, useTranslations } from 'next-intl';
import { Tour } from '../_types';
import { useGroupTourBooking } from '@/hooks/useGroupTourBooking';
import TourBookingPrice from './TourBookingPrice';
import Counter from '@/components/UI/Counter/Counter';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import IconInfo from '../../../assets/icons/booking/exclamationmark.circle.svg';
import Button from '@/components/UI/Button/Button';
import { usePrivateTourFormStore } from '@/store/privateTourFormStore';
import { useAuthStore } from '@/store/useAuthStore';
import { FaInfoCircle } from 'react-icons/fa';

type GroupPricesFormProps = {
  tour: Tour;
};

const GroupPricesForm = ({ tour }: GroupPricesFormProps) => {
  const t = useTranslations('tourDetail');
  const locale = useLocale();

  const prices = tour?.prices;

  const {
    travellers,
    selectedPrice,
    totalPrice,
    setTravellers,
    setSelectedPrice,
    setTotalPrice,
    handleBooking,
  } = useGroupTourBooking({ tour, locale });

  const { setPopup: setIsOpen } = usePrivateTourFormStore();
  const { isAuthenticated, setAuthPopup } = useAuthStore();

  const handleBookClick = () => {
    if (!isAuthenticated) {
      setAuthPopup(true);
      return;
    }
    handleBooking();
  };

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-5">
      <div className="text-base">
        <FormattedPrice
          price={totalPrice}
          currency={tour?.prices?.valute}
          className="text-3xl font-semibold"
          as={'span'}
          minimumFractionDigits={0}
          suffix={t('prices.pp')}
        />
      </div>

      {!!tour?.prices?.price_basis_label && <div className="text-sm flex gap-3 text-gray-700"><FaInfoCircle className="w-5 h-5" /> {tour?.prices?.price_basis_label}</div>}

      <TourBookingPrice
        locale={locale}
        travellers={travellers}
        prices={prices?.data}
        valute={prices?.valute}
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
        onClick={handleBookClick}
        className="text-center w-full rounded-4xl bg-[#27A430] text-white p-4 cursor-pointer transition-all duration-300 hover:bg-[#208B28]"
      >
        {tour?.tour_type === 'individual' ? t('by_request.button') : t('booking.button')}
      </button>
      <hr className="border border-gray-200" />
      <Button
        onClick={() => isAuthenticated ? setIsOpen(true) : setAuthPopup(true)}
        type="button"
        color="link"
        className="flex items-center text-green-700 hover:text-green-800"
      >
        {t('booking.private_btn')}
        <ImageWithFallback
          src={IconInfo}
          alt="info"
          width={24}
          height={24}
          className="w-5 h-5 md:w-6 md:h-6"
        />
      </Button>
    </div>
  );
};

export default GroupPricesForm;
