'use client';

import { BookingHeader } from "./BookingHeader/BookingHeader";
import { Breadcrumbs } from "../UI/Breadcrumbs/Breadcrumbs";
import { Travellers } from "./Travellers/Travellers";
import { Passengers } from "./Passengers/Passengers";
import { RoomTypes } from "./RoomTypes/RoomTypes";
import { BookingInfo } from "./BookingInfo/BookingInfo";
import Loader from "../UI/Loader/Loader";
import { useBookingStore } from "@/store/bookingStore";


export default function BookingFormPage() {
    const {bookingData} = useBookingStore(state => state);

    if (!bookingData) return <div className='container mt-[150px] min-h-[200px] flex items-center justify-center'><Loader /></div>;

    return (
        <section className="container mt-[150px] flex flex-col gap-5 min-h-[200px] mb-10">
            <Breadcrumbs />
            <BookingHeader />

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_445px] relative">
                <div className="flex flex-col gap-10 h-full">
                    <Travellers />
                    <RoomTypes />
                    <Passengers />
                </div>

                <div className="h-full">
                    <BookingInfo />
                </div>
            </div>
        </section>
    );
}