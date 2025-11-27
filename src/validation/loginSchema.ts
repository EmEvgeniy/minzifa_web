import { z } from 'zod';

export const loginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, t('errors.email_invalid')),
    password: z.string().min(8, t('errors.password_min')),
    recaptchaToken: z.string().optional(),
  });

export type LoginFormType = z.infer<ReturnType<typeof loginSchema>>;
