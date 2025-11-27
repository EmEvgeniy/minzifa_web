import {z} from 'zod';

export const registrationSchema = (t: (key: string) => string) =>
    z
        .object({
            name: z.string().min(2, t('errors.name_min')),
            email: z
                .string()
                .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, t('errors.email_invalid')),
            password: z.string().min(6, t('errors.password_min')),
            password_confirmation: z.string().min(6, t('errors.confirmPassword_min')),
            recaptchaToken: z.string().optional(),
        })
        .refine((data) => data.password === data.password_confirmation, {
            message: t('errors.passwordMismatch'),
            path: ['confirmPassword'],
        });

export type RegistrationFormType = z.infer<ReturnType<typeof registrationSchema>>;
