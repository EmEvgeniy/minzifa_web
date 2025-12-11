import { z } from 'zod';

export const forgotPasswordSchema = (t: (key: string) => string) =>
  z.object({
    password: z
      .string()
      .regex(
        /^(?=.{8,})(?=.*\p{L})(?=.*\p{N})(?=.*[^\p{L}\p{N}]).*$/u,
        t('errors.password_invalid'),
      ),
    token: z.string(),
    email: z.email(),
  });

export type ForgotPasswordFormType = z.infer<ReturnType<typeof forgotPasswordSchema>>;
