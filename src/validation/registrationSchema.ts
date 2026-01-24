import { z } from 'zod';

export const registrationSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, t('errors.email_invalid')),
    password: z
      .string()
      .regex(
        /^(?=.{8,})(?=.*\p{L})(?=.*\p{N})(?=.*[^\p{L}\p{N}]).*$/u,
        t('errors.password_invalid'),
      ),
    phone: z.string().min(10, t('errors.phone_invalid')),
    recaptchaToken: z.string().optional(),
  });

export type RegistrationFormType = z.infer<ReturnType<typeof registrationSchema>>;
