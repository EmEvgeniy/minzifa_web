'use client';

import Image from "next/image"
import IconUser from "../../../assets/icons/booking/user.svg";
import IconShield from "../../../assets/icons/booking/Chield_check_light.svg";
import IconCalendar from "../../../assets/icons/booking/calendar.svg";
import IconLocation from "../../../assets/icons/booking/location.svg";
import IconAirDeparture from "../../../assets/icons/booking/air-departure.svg";
import IconAirLanding from "../../../assets/icons/booking/air-landing.svg";


import { useLocale, useTranslations } from "next-intl";
import { useBookingStore } from "@/store/bookingStore";
import Link from "next/link";
import { FormattedPrice } from "@/components/UI/FormattedPrice/FormattedPrice";
import { useState } from "react";

export const BookingInfo = () => {
    const t = useTranslations("Booking");
    const locale = useLocale();

    const [isChecked, setIsChecked] = useState(false);

    const { tour, bookingData } = useBookingStore((state) => state);

    const handleSubmit = () => {
        if (isChecked) {
            console.log(bookingData);
        }
    }

    return (
        <div className="sticky top-[150px] rounded-2xl space-y-4 bg-white p-5 shadow-xl">

            <hr className="border-gray-300" />

            <div className="bg-[#87EEC7] text-center text-sm rounded-lg px-2.5 py-5 flex flex-row items-center justify-center gap-2">
                <Image
                    src={IconShield}
                    alt="icon"
                    width={24}
                    height={24}
                    loading={"lazy"}
                />
                <div className="text-md">
                    {t("booking_info.guarantee")}
                </div>
            </div>

            <hr className="border-gray-300" />

            <div className="grid grid-cols-1 md:grid-cols-[124px_1fr] gap-3 space-y-2">
                <Image
                    width={124}
                    height={124}
                    src={tour?.gallery?.[0]?.file ?? "https://placehold.co/124x124?text=Minzifa Travel"}
                    alt={tour?.gallery?.[0]?.alt_text ?? tour?.name ??"Minzifa Travel"}
                    className="rounded-xl aspect-square h-auto w-[124px] object-cover"
                />
                <div>
                    <div className="text-xs text-gray-500">
                        {tour?.destinations[0].name}
                    </div>
                    <h2 className="text-lg leading-snug">
                        {tour?.name}
                    </h2>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <span>
                                <Image src={IconCalendar} alt="" />
                            </span>
                            <span>{t("booking_info.days", { days: tour?.days || 1 })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>
                                <Image src={IconLocation} alt="" />
                            </span>{" "}
                            <span>{t("booking_info.countries", { countries: tour?.destinations.length || 0 })}</span>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-300" />

            <div className="space-y-2 text-sm">
                <p className="text-[22px] font-semibold">
                    {t("booking_info.price_details")}
                </p>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <span>
                            <Image src={IconAirDeparture} alt="" />
                        </span>{" "}
                        {t("booking_info.start_trip")}
                    </span>
                    <span>{bookingData?.tour_start}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <span>
                            <Image src={IconAirLanding} alt="" />
                        </span>
                        {t("booking_info.end_trip")}
                    </span>
                    <span>{bookingData?.tour_end}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <span>
                            <Image src={IconUser} alt="" />
                        </span>
                        {t("booking_info.travellers")}
                    </span>
                    <span>{bookingData?.travellers_count}</span>
                </div>
            </div>

            <hr className="border-gray-300" />

            <div className="flex justify-between items-center">
                <span className="text-xl">{t("booking_info.deposit")}</span>
                <FormattedPrice
                    price={bookingData?.deposit ?? 0}
                    currency={bookingData?.currency}
                    className="text-xl"
                />
            </div>

            <hr className="border-gray-300 my-4" />

            <div className="flex justify-between items-center">
                <span className="text-lg">Total (USD)</span>
                <FormattedPrice
                    price={bookingData?.total_price ?? 0}
                    currency={bookingData?.currency}
                    className="text-3xl"
                />
            </div>

            <hr className="border-gray-300 my-4" />

            {/* Terms and conditions */}
            <div className="text-sm">
                <label className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        className="mt-1"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <span className="block">
                        {t.rich("booking_info.accept", {
                            terms: (chunks) => (
                                <Link href={`/${locale}/terms-and-conditions`}
                                    className="text-[#009F65] hover:underline"
                                >
                                    {chunks}
                                </Link>
                            ),
                            privacy: (chunks) => (
                                <Link href={`/${locale}/privacy-policy`}
                                    className="text-[#009F65] hover:underline"
                                >
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
                disabled={!isChecked}
                className="text-center w-full rounded-4xl disabled:bg-[#DDDDDD] disabled:cursor-not-allowed bg-[#27A430] text-white p-4 cursor-pointer transition-all duration-300 hover:bg-[#208B28]"
            >
                {t('button', { count: bookingData?.travellers_count ?? 1 })}
            </button>
        </div>
    )
}