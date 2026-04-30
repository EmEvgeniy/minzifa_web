// validation/footerSubscribeSchema.ts
import { z } from 'zod';

export const subscribeSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string(),
    email: z
      .string()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, t('newsletter.errors.email_invalid')),
    recaptchaToken: z.string().optional(),
  });

export type SubscribeFormType = z.infer<ReturnType<typeof subscribeSchema>>;
