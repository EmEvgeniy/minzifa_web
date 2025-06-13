'use client';

import Counter from "@/components/UI/Counter/Counter";
import { useBookingStore } from "@/store/bookingStore";
import { useTranslations } from "next-intl";

export const Travellers = () => {
    const t = useTranslations("Booking");
    const { bookingData, setBookingData } = useBookingStore((state) => state);

    const handleCount = (value: number) => {
        const tour_price = (bookingData?.tour_price as number);

        setBookingData({
            ...bookingData,
            room_types: {},
            travellers_count: value,
            deposit: (tour_price * 0.15) * value,
            total_price: tour_price * value
        });
    }

    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-[#16372D] col-span-1 mb-4 text-3xl md:col-span-2">
                {t("travellers.title")}
            </h2>
            <div className="grid grid-cols-1">
                <div className="rounded-2xl flex items-center justify-between bg-white p-5">
                    <span className="text-lg font-normal">{t("travellers.person")}</span>
                    <Counter
                        value={(bookingData?.travellers_count as number) || 1}
                        onChange={handleCount}
                        label=""
                        max={bookingData?.total_seats}
                    />
                </div>
            </div>
        </div>
    )
};