import { BookingTourData } from "@/store/bookingStore";

export type BookingFormDataRequest = {
    adults: number;
    children: number;
    passengers: Array<{
        salutations: string;
        name: string;
        surname: string;
        email: string;
        phone: string;
        birth_date: {
            month: string;
            day: string;
            year: string;
        };
        gender: string;
        main_address: {
            address: string;
            address2?: string;
            state: string;
            province: string;
            towm: string;
            postal_code: string;
        };
    }>;
} & BookingTourData;

export type BookingFormDataResponse = {
    id: number;
    form_name: string;
    form_data: BookingFormDataRequest;
}