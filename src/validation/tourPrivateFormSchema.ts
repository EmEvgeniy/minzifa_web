import { z } from 'zod';

export const tourPrivateFormSchema = (t: (k: string) => string) =>
  z.object({
    dates: z.tuple([z.date().nullable(), z.date().nullable()]),
    travellers: z.string().min(1, t('errors.travellers_min')),
    price: z.union([z.string(), z.number()]).optional().nullable(),
    wishes: z.string(),
    name: z.string().min(2, t('errors.name_min')),
    email: z.email(t('errors.email_invalid')),
    phone: z.string().min(5, t('errors.phone_required')),
    recaptchaToken: z.string().optional(),
  });
