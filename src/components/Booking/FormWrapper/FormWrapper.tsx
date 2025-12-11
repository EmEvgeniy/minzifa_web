'use client';

import { Tour } from '@/components/Tour/_types';
import { useFormSubmit, useRecaptcha } from '@/hooks';
import { useMetricsStore } from '@/store';
import { useSnackStore } from '@/store/useSnackStore';
import { bookingFormSchema, BookingFormType } from '@/validation/bookingFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import Travellers from '../Travellers/Travellers';
import RoomTypes from '../RoomTypes/RoomTypes';
import Passengers from '../Passengers/Passengers';
import BookingInfo from '../BookingInfo/BookingInfo';
import MobileBtn from '../MobileBtn/MobileBtn';
import { FormNameEnum } from '@/constants';

type FormWrapperProps = {
    locale: string;
    tourData: Tour;
};

export default function FormWrapper({ locale, tourData }: FormWrapperProps) {
    const t = useTranslations();
    const router = useRouter();
    const searchParams = useSearchParams();

    const { metrics } = useMetricsStore();
    const { setMessage, setError } = useSnackStore();
    const { token, getToken } = useRecaptcha();

    const { handleSubmit, setValue, control, watch, formState: { errors } } = useForm<BookingFormType>({
        resolver: zodResolver(bookingFormSchema(t)),
        mode: 'onSubmit',
        defaultValues: {
            passengers: [],
            room_types: { standart: 1, single: 0 },
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
            recaptchaToken: '',
        }
    });

    // Watch for changes in key fields
    const bookingData = watch();

    // Track previous travellers_count to detect decreases
    const prevTravellersRef = useRef<number>(bookingData.travellers_count || 1);

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

        const newDeposit = Number(tourPrice) * 0.15 * currentTravellers + Number(singlePrice) * singleRooms;
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
                    single: Math.max(0, currentTravellers - standartRooms)
                });
            }
        }

        prevTravellersRef.current = currentTravellers;
    }, [bookingData.travellers_count, bookingData.room_types, bookingData.tour_price, bookingData.single_price, setValue]);

    const { submitForm } = useFormSubmit({
        onSuccess: () => {
            setMessage(locale == 'en' ? 'Your tour was booked!' : 'Ваш тур был забронирован!');
            // router.push(`/${locale}/thank-you`);
        },
        onError: () => {
            setError(locale == 'en' ? 'Some error was happened' : 'Произошла ошибка');
        },
    });

    const onSubmit = async (data: BookingFormType) => {
        const formData = {
            ...data,
            ...metrics,
            recaptchaToken: token,
        };

        await submitForm(FormNameEnum.BOOKING, formData);
    };

    return (
        <form
            id="booking-form"
            onSubmit={handleSubmit(onSubmit)}
            className="relative"
        >
            <div className="container flex items-start justify-between gap-5 relative max-[1024px]:flex-col-reverse mb-10">
                <div className="flex flex-col gap-10 h-full w-2/2">
                    <Travellers bookingData={bookingData} setValue={setValue} />
                    <RoomTypes bookingData={bookingData} setValue={setValue} />
                    <Passengers bookingData={bookingData} errors={errors} control={control} />
                </div>

                <div className="w-full max-w-[450px] h-screen max-[1024px]:w-full max-[1024px]:h-full">
                    <BookingInfo bookingData={bookingData} tour={tourData} token={token} getToken={getToken} />
                </div>
            </div>

            <MobileBtn bookingData={bookingData} />
        </form>
    )
}
