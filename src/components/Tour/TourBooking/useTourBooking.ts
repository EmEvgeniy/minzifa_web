import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GroupPrice, Tour } from '../_types';
import { useBookingStore } from '@/store/bookingStore';
import { useTourPrivateModalStore } from '@/store/useTourPrivateModalStore';
import {
  createBookingData,
  createBookingParams,
  createPrivateTourPriceOptions,
  createComfortOptions,
} from './bookingUtils';

export interface UseTourBookingProps {
  prices: GroupPrice[] | undefined;
  tour: Tour;
  locale: string;
}

export interface UseTourBookingReturn {
  travellers: number;
  selectedPrice: GroupPrice | undefined;
  totalPrice: number;
  setTravellers: (value: number) => void;
  setSelectedPrice: (price: GroupPrice) => void;
  setTotalPrice: (value: number) => void;
  handleBooking: () => void;
  handlePrivateTourBooking: () => void;
  handleComfortBooking: () => void;
  handleFreeConsultation: () => void;
}

/**
 * Кастомный хук для управления бизнес-логикой бронирования тура
 */
export const useTourBooking = ({
  prices,
  tour,
  locale,
}: UseTourBookingProps): UseTourBookingReturn => {
  const router = useRouter();
  const { open, setPriceOptions } = useTourPrivateModalStore();
  const { setBookingData } = useBookingStore((state) => state);

  const [travellers, setTravellers] = useState<number>(1);
  const [selectedPrice, setSelectedPrice] = useState<GroupPrice | undefined>(undefined);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Установка начальной цены при загрузке цен
  useEffect(() => {
    if (!prices) return;
    setSelectedPrice(prices[0]);
    setTotalPrice(prices[0]?.price_for_double);
  }, [prices]);

  // Обновление общей цены при изменении количества путешественников или выбранной цены
  useEffect(() => {
    if (selectedPrice) {
      setTotalPrice(selectedPrice.price_for_double * travellers);
    }
  }, [selectedPrice, travellers]);

  /**
   * Обработка бронирования группового тура
   */
  const handleBooking = () => {
    if (!tour || !selectedPrice) return;

    const bookingData = createBookingData(tour, selectedPrice, totalPrice, travellers, locale);
    setBookingData(bookingData);

    const params = createBookingParams(tour, selectedPrice, totalPrice, travellers, locale);
    router.push(`/${locale}/booking/${tour?.slug}?${params.toString()}`);
  };

  /**
   * Обработка бронирования приватного тура
   */
  const handlePrivateTourBooking = () => {
    const priceOptions = createPrivateTourPriceOptions(prices || [], locale);
    setPriceOptions(priceOptions);
    open();
  };

  /**
   * Обработка бронирования с выбором комфорта для индивидуального тура
   */
  const handleComfortBooking = () => {
    const comfortOptions = createComfortOptions(tour);
    setPriceOptions(comfortOptions);
    open();
  };

  /**
   * Обработка бесплатной консультации для группового тура
   */
  const handleFreeConsultation = () => {
    open();
  };

  /**
   * Установка выбранной цены (используется компонентом TourBookingPrice)
   */
  const handleSetSelectedPrice = (price: GroupPrice) => {
    setSelectedPrice(price);
  };

  /**
   * Установка количества путешественников (используется компонентом Counter)
   */
  const handleSetTravellers = (value: number) => {
    setTravellers(value);
  };

  return {
    travellers,
    selectedPrice,
    totalPrice,
    setTravellers: handleSetTravellers,
    setSelectedPrice: handleSetSelectedPrice,
    setTotalPrice,
    handleBooking,
    handlePrivateTourBooking,
    handleComfortBooking,
    handleFreeConsultation,
  };
};
