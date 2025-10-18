import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GroupPrice, Tour } from '@/components/Tour/_types';
import { useBookingStore } from '@/store/bookingStore';
import { createBookingData, createBookingParams } from '@/components/Tour/TourBooking/bookingUtils';

interface UseGroupTourBookingProps {
  tour: Tour;
  locale: string;
}

export const useGroupTourBooking = ({ tour, locale }: UseGroupTourBookingProps) => {
  const prices = tour?.prices;

  const router = useRouter();
  const { setBookingData } = useBookingStore((s) => s);

  const [travellers, setTravellers] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState<GroupPrice | undefined>();
  const [totalPrice, setTotalPrice] = useState(0);

  // 1️⃣ Выбираем первую доступную дату
  useEffect(() => {
    if (!prices?.data?.length) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const availablePrices = prices.data.filter((p) => {
      const date = new Date(p.date_start);
      date.setHours(0, 0, 0, 0);
      return date >= today;
    });

    const firstAvailable = availablePrices[0] || prices.data[0];

    setSelectedPrice(firstAvailable);
    setTotalPrice(firstAvailable.price_for_double);
  }, [prices]);

  // 2️⃣ Пересчёт цены при изменении количества путешественников
  useEffect(() => {
    if (selectedPrice) {
      setTotalPrice(selectedPrice.price_for_double * travellers);
    }
  }, [selectedPrice, travellers]);

  // 3️⃣ Обработка бронирования
  const handleBooking = () => {
    if (!tour || !selectedPrice) return;

    const bookingData = createBookingData(tour, selectedPrice, totalPrice, travellers, locale);
    setBookingData(bookingData);

    const params = createBookingParams(tour, selectedPrice, totalPrice, travellers, locale);
    router.push(`/${locale}/booking/${tour.slug}?${params.toString()}`);
  };

  return {
    travellers,
    selectedPrice,
    totalPrice,
    setTravellers,
    setSelectedPrice,
    setTotalPrice,
    handleBooking,
  };
};
