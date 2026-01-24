/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod';

const passengerSchema = (t: (key: string) => string) =>
  z.object({
    salutation: z.string().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    birth_date: z.any().optional(),
    gender: z.string().optional(),
    main_address: z
      .object({
        address: z.string().optional(),
        address2: z.string().optional(),
        state: z.string().optional(),
        province: z.string().optional(),
        postal_code: z.string().optional(),
      })
      .optional(),
  });

export const bookingFormSchema = (t: (key: string) => string) =>
  z
    .object({
      passengers: z
        .array(passengerSchema(t))
        .min(1)
        .transform((passengers) =>
          passengers.filter((p) =>
            Object.values(p).some((value) => value !== undefined && value !== ''),
          ),
        ),
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
    })
    .check(({ value, issues }) => {
      const firstPassenger = value.passengers?.[0];
      if (firstPassenger) {
        if (!firstPassenger.first_name) {
          issues.push({
            code: 'custom',
            message: t('errors.first_name_required'),
            path: ['passengers', 0, 'first_name'],
            input: firstPassenger.first_name,
          });
        }
        if (!firstPassenger.last_name) {
          issues.push({
            code: 'custom',
            message: t('errors.last_name_required'),
            path: ['passengers', 0, 'last_name'],
            input: firstPassenger.last_name,
          });
        }
        if (!firstPassenger.email) {
          issues.push({
            code: 'custom',
            message: t('errors.email_invalid'),
            path: ['passengers', 0, 'email'],
            input: firstPassenger.email,
          });
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(firstPassenger.email)) {
          issues.push({
            code: 'custom',
            message: t('errors.email_invalid'),
            path: ['passengers', 0, 'email'],
            input: firstPassenger.email,
          });
        }
        if (!firstPassenger.birth_date) {
          issues.push({
            code: 'custom',
            message: t('errors.birth_date_required'),
            path: ['passengers', 0, 'birth_date'],
            input: firstPassenger.birth_date,
          });
        }
        if (!firstPassenger.gender) {
          issues.push({
            code: 'custom',
            message: t('errors.gender_required'),
            path: ['passengers', 0, 'gender'],
            input: firstPassenger.gender,
          });
        }
        if (!firstPassenger.salutation) {
          issues.push({
            code: 'custom',
            message: t('errors.salutation_required'),
            path: ['passengers', 0, 'salutation'],
            input: firstPassenger.salutation,
          });
        }
        if (!firstPassenger.main_address?.address) {
          issues.push({
            code: 'custom',
            message: t('errors.address_required'),
            path: ['passengers', 0, 'main_address', 'address'],
            input: firstPassenger.main_address?.address,
          });
        }
        if (!firstPassenger.main_address?.province) {
          issues.push({
            code: 'custom',
            message: t('errors.province_required'),
            path: ['passengers', 0, 'main_address', 'province'],
            input: firstPassenger.main_address?.province,
          });
        }
        if (!firstPassenger.main_address?.state) {
          issues.push({
            code: 'custom',
            message: t('errors.state_required'),
            path: ['passengers', 0, 'main_address', 'state'],
            input: firstPassenger.main_address?.state,
          });
        }
        if (!firstPassenger.main_address?.postal_code) {
          issues.push({
            code: z.ZodIssueCode.custom,
            message: t('errors.postal_code_required'),
            path: ['passengers', 0, 'main_address', 'postal_code'],
            input: firstPassenger.main_address?.postal_code,
          });
        }
        if (!firstPassenger.phone || firstPassenger.phone.length < 10) {
          issues.push({
            code: 'custom',
            message: t('errors.phone_invalid'),
            path: ['passengers', 0, 'phone'],
            input: firstPassenger.phone,
          });
        }
      }
    });

export type BookingFormType = z.input<ReturnType<typeof bookingFormSchema>>;
