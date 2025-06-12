'use client';

import { useTranslations } from "next-intl";
import { useBookingStore } from "@/store/bookingStore";
import { Passenger } from "./Passenger";
import React, { useEffect, useState } from "react";
import { CustomAccordion, CustomAccordionDetails, CustomAccordionSummary } from "@/components/UI/CustomAccordion/CustomAccordion";
import IconUser from "../../../assets/icons/booking/user.svg";
import Image from "next/image";

export const Passengers = () => {
    const t = useTranslations("Booking");
    const { bookingData } = useBookingStore((state) => state);

    const [passengerAccordionIndexes, setPassengerAccordionIndexes] = useState<number[] | undefined>([]);

    useEffect(() => {
        if (!bookingData?.travellers_count) return;
        setPassengerAccordionIndexes(Array.from({ length: bookingData?.travellers_count }, (_, i) => i));
    }, [bookingData?.travellers_count]);

    if (!bookingData?.travellers_count) return null;

    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-[#16372D] text-4xl">
                {t("passenger.title")}
            </h2>
            <div className="flex flex-col gap-5 rounded-2xl">
                <CustomAccordion
                    expandedIndexes={passengerAccordionIndexes}
                    onExpandedIndexesChange={setPassengerAccordionIndexes}
                    className="bg-transparent p-0 rounded-none flex flex-col gap-5"
                >
                    {Array.from({ length: bookingData?.travellers_count }).map((_, index) => (
                        <div key={index}>
                            <CustomAccordionSummary
                                className="bg-white p-5 w-full flex flex-row gap-3 items-center text-base"
                            >
                                <div className="flex items-center gap-4">
                                    <Image src={IconUser} alt="" />
                                    {t("passenger.passenger", { count: index + 1 })}
                                </div>
                            </CustomAccordionSummary>
                            <CustomAccordionDetails className="p-5">
                                <Passenger index={index} />
                            </CustomAccordionDetails>
                        </div>
                    ))}
                </CustomAccordion>
            </div>
        </div>
    )
}