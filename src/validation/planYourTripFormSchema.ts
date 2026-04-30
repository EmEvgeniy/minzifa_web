// validation/contactFormSchema.ts
import { z } from 'zod';

export const planYourTripFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(3, t('errors.name_min')),
    email: z
      .string()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, t('errors.email_invalid')),
    phone: z.string().min(10, t('errors.phone_invalid')),
    recaptchaToken: z.string().optional(),
  });

export type planYourTripFormType = z.infer<ReturnType<typeof planYourTripFormSchema>>;
