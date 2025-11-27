// validation/footerSubscribeSchema.ts
import { z } from 'zod';

export const footerSubscribeSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, t('errors.email_invalid')),
    recaptchaToken: z.string().optional(),
  });

export type FooterSubscribeFormType = z.infer<ReturnType<typeof footerSubscribeSchema>>;
