import { z } from 'zod';

export const passengerSchema = (t: (key: string) => string) =>
  z.object({
    salutation: z.string(t('errors.salutation_required')),
    first_name: z.string(t('errors.first_name_required')).min(1, t('errors.first_name_required')),
    last_name: z.string(t('errors.last_name_required')).min(1, t('errors.last_name_required')),
    email: z.email(t('errors.email_invalid')),
    phone: z.string().optional(),
    birth_date: z.date(t('errors.birth_date_required')),
    gender: z.string(t('errors.gender_required')),
    main_address: z
      .object({
        address: z.string(t('errors.address_required')),
        address2: z.string().optional(),
        state: z.string(t('errors.state_required')),
        province: z.string(t('errors.province_required')),
        postal_code: z.string(t('errors.postal_code_required')),
      })
      .optional(),
  });

export const bookingFormSchema = (t: (key: string) => string) =>
  z.object({
    passengers: z.array(passengerSchema(t)).min(1, t('errors.passengers_required')),
    room_types: z
      .object({
        standart: z.number().optional(),
        single: z.number().optional(),
      })
      .optional(),
    tour_name: z.string().optional(),
    tour_start: z.string().optional(),
    tour_end: z.string().optional(),
    travellers_count: z.number().min(1, t('errors.travellers_required')),
    tour_price: z.number().optional(),
    deposit: z.number().optional(),
    total_price: z.number().optional(),
    payment_type: z.string().optional(),
    payment_status: z.string().optional(),
    single_price: z.coerce.number().optional(),
    currency: z.string().optional(),
    total_seats: z.number().optional(),
    recaptchaToken: z.string().optional(),
  });

export type BookingPassenger = z.input<ReturnType<typeof passengerSchema>>;
export type BookingFormType = z.input<ReturnType<typeof bookingFormSchema>>;
