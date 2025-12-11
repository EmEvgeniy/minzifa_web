import { z } from 'zod';

export const freeConsultationFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(5, t('errors.name_min')),
    email: z
      .string()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, t('errors.email_invalid')),
    phone: z.string().min(8, t('errors.phone_invalid')),
    message: z.string().optional(),
    recaptchaToken: z.string().optional(),
  });

export type FreeConsultationFormType = z.infer<ReturnType<typeof freeConsultationFormSchema>>;
