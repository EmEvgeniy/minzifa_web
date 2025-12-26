import { z } from 'zod';

export const createYourTripFormSchema = (t: (key: string) => string) =>
  z.object({
    destinations: z.array(z.string()).min(1),
    hotel_type: z.string().min(1),
    days: z.number().min(1),
    travellers_type: z.string().min(1),
    travellers: z.object({
      adults: z.number().min(1),
      children: z.number().min(0),
    }),
    date: z.string().min(1),
    wishes: z.string().optional(),
    appeals: z.string().min(1),
    first_name: z.string().min(2, t('errors.name_min')),
    last_name: z.string().min(2, t('errors.name_min')),
    email: z.email({ error: t('errors.email_invalid') }),
    phone: z.string().min(8, t('errors.phone_invalid')),
    nationality: z.string().optional(),
    recaptchaToken: z.string().optional(),
  });

export type CreateYourTripFormType = z.infer<ReturnType<typeof createYourTripFormSchema>>;
