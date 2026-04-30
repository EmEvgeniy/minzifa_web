'use client';

import { Tour } from '@/components/Tour/_types';
import { useFormSubmit } from '@/hooks';
import { axiosInstance } from '@/utils/axios';
import { useAuthStore, useMetricsStore } from '@/store';
import { useSnackStore } from '@/store/useSnackStore';
import { bookingFormSchema, BookingFormType } from '@/validation/bookingFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import Travellers from '../Travellers/Travellers';
import RoomTypes from '../RoomTypes/RoomTypes';
import Passengers from '../Passengers/Passengers';
import BookingInfo from '../BookingInfo/BookingInfo';
import BookingSubmit from '../BookingSubmit/BookingSubmit';
import MobileStickyPrice from '../MobileStickyPrice/MobileStickyPrice';
import { FormNameEnum } from '@/constants';
import dayjs from 'dayjs';

type FormWrapperProps = {
  locale: string;
  tourData: Tour;
};

export default function FormWrapper({ locale, tourData }: FormWrapperProps) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { user, isAuthenticated } = useAuthStore();
  const { metrics } = useMetricsStore();
  const { setMessage, setError } = useSnackStore();

  const defaultPassengers =
    user?.name || user?.email || user?.phone
      ? [
          {
            first_name: user?.name?.split(' ')[0] || '',
            last_name: user?.name?.split(' ').slice(1).join(' ') || '',
            email: user?.email || '',
            phone: user?.phone || '',
            date_of_birth: '',
            birth_date: '',
            nationality: '',
            passport_number: '',
            passport_expiry: '',
            address: '',
          },
        ]
      : [];

  const {
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<BookingFormType>({
    resolver: zodResolver(bookingFormSchema(t)),
    mode: 'onSubmit',
    defaultValues: {
      passengers: defaultPassengers,
      room_types: { standart: 1, single: 0 },
      tour_name: searchParams.get('tour_name') || '',
      tour_start: searchParams.get('tour_start') || '',
      tour_end: searchParams.get('tour_end') || '',
      travellers_count: Number(searchParams.get('travellers_count')) || 1,
      tour_price: Number(searchParams.get('tour_price')) || 1,
      deposit: Number(searchParams.get('deposit')) || 0,
      total_price: Number(searchParams.get('total_price')) || 0,
      payment_type: 'online',
      payment_status: 'pending',
      single_price: Number(searchParams.get('single_price')) || 0,
      currency: searchParams.get('currency') || 'USD',
      total_seats: Number(searchParams.get('total_seats')) || 1,
    },
  });

  // Watch for changes in key fields
  const bookingData = watch();

  // Track previous travellers_count to detect decreases
  const prevTravellersRef = useRef<number>(bookingData.travellers_count || 1);

  // Auto-fill passenger data when user logs in after form initialization
  useEffect(() => {
    if (isAuthenticated && user && !isSubmitted && bookingData.passengers?.length === 0) {
      const userName = user.name || '';
      const firstName = userName.split(' ')[0] || '';
      const lastName = userName.split(' ').slice(1).join(' ') || '';

      setValue('passengers', [
        {
          first_name: firstName,
          last_name: lastName,
          email: user.email || '',
          phone: user.phone || '',
          birth_date: '',
        },
      ]);
    }
  }, [isAuthenticated, user, isSubmitted, bookingData.passengers?.length, setValue]);

  useEffect(() => {
    const travellersCount = bookingData.travellers_count || 1;
    const roomTypes = bookingData.room_types;
    const tourPrice = bookingData.tour_price || 0;
    const singlePrice = bookingData.single_price || 0;

    const currentTravellers = travellersCount;
    const prevTravellers = prevTravellersRef.current;

    // Always recalculate prices when travellers_count changes
    const standartRooms = roomTypes?.standart || 0;
    const singleRooms = roomTypes?.single || 0;

    const newDeposit =
      Number(tourPrice) * 0.15 * currentTravellers + Number(singlePrice) * singleRooms;
    const newTotalPrice = Number(tourPrice) * currentTravellers + Number(singlePrice) * singleRooms;

    setValue('deposit', newDeposit);
    setValue('total_price', newTotalPrice);

    // Check if room_types need adjustment when decreasing
    if (currentTravellers < prevTravellers) {
      const totalRoomsSelected = standartRooms + singleRooms;

      if (totalRoomsSelected > currentTravellers) {
        // Reset room_types to fit new traveller count
        setValue('room_types', {
          standart: Math.min(standartRooms, currentTravellers),
          single: Math.max(0, currentTravellers - standartRooms),
        });
      }
    }

    prevTravellersRef.current = currentTravellers;
  }, [
    bookingData.travellers_count,
    bookingData.room_types,
    bookingData.tour_price,
    bookingData.single_price,
    setValue,
  ]);

  const [isRedirecting, setIsRedirecting] = useState(false);

  const { submitForm, isSubmitting: isSubmitting } = useFormSubmit({
    onError: () => {
      setError(locale == 'en' ? 'Some error was happened' : 'Произошла ошибка');
    },
  });

  const isLoading = isSubmitting || isRedirecting;

  const onSubmit = async (data: BookingFormType) => {
    const formData = {
      ...data,
      tour_start: dayjs(data.tour_start).format('YYYY-MM-DD'),
      tour_end: dayjs(data.tour_end).format('YYYY-MM-DD'),
      ...metrics,
    };

    const result = await submitForm(FormNameEnum.BOOKING, formData);

    // online - переход на страницу оплаты (undefined тоже = online, т.к. это дефолт)
    // bank_transfer / on_spot - переход на thank-you
    const isOnlinePayment = !data.payment_type || data.payment_type === 'online';
    if (isOnlinePayment && result.form_id) {
      setIsRedirecting(true);
      try {
        const paymentResponse = await axiosInstance.post(`forms/${result.form_id}/payment-url`, {
          type: 'deposit',
        });

        if (!paymentResponse.data?.success) {
          setIsRedirecting(false);
          router.push(`/${locale}/thank-you`);
          return;
        }

        const paymentUrl =
          paymentResponse.data?.data?.payment_url || paymentResponse.data?.payment_url;

        if (paymentUrl) {
          // Редирект на внешнюю страницу оплаты — лоадер остаётся до ухода со страницы
          setMessage(locale == 'en' ? 'Redirecting to payment...' : 'Перенаправление на оплату...');
          window.location.href = paymentUrl;
          return;
        }

        setIsRedirecting(false);
        router.push(`/${locale}/thank-you`);
        return;
      } catch (paymentError) {
        console.error('Payment generation failed:', paymentError);
        setIsRedirecting(false);
        router.push(`/${locale}/thank-you`);
        return;
      }
    }

    // Переход на thank-you если НЕ выбрана онлайн-оплата
    setMessage(locale == 'en' ? 'Your tour was booked!' : 'Ваш тур был забронирован!');
    router.push(`/${locale}/thank-you`);
  };

  return (
    <form id="booking-form" onSubmit={handleSubmit(onSubmit)} className="relative">
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-2xl">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-[#3BA151]/20 rounded-full animate-spin">
                <div className="absolute inset-0 border-4 border-[#3BA151] rounded-full border-t-transparent"></div>
              </div>
            </div>
            <p className="text-base font-medium text-gray-900 mt-4">
              {locale == 'en' ? 'Processing request...' : 'Обработка заявки...'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {locale == 'en' ? 'Please wait...' : 'Пожалуйста, подождите...'}
            </p>
          </div>
        </div>
      )}
      <div className="container flex items-start justify-between gap-5 relative max-[1024px]:flex-col-reverse mb-10">
        <div className="flex flex-col gap-10 h-full w-2/2">
          <Travellers bookingData={bookingData} setValue={setValue} />
          <RoomTypes bookingData={bookingData} setValue={setValue} />
          <Passengers bookingData={bookingData} errors={errors} control={control} />
          <BookingSubmit />
        </div>

        <div className="w-full max-w-[450px] h-screen max-[1024px]:w-full max-[1024px]:h-full">
          <BookingInfo
            bookingData={bookingData}
            tour={tourData}
            setValue={setValue}
            isSubmitting={isLoading}
          />
        </div>
      </div>

      <MobileStickyPrice bookingData={bookingData} />
    </form>
  );
}
