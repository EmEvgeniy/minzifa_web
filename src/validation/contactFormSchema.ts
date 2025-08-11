// validation/contactFormSchema.ts
import { z } from 'zod';

export const contactFormSchema = (t: (key: string) => string) =>
    z.object({
        name: z.string().min(3, t('errors.name_min')),
        email: z.string().regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            t('errors.email_invalid')
        ),
        phone: z.string().min(8, t('errors.phone_invalid')),
        message: z.string().optional(),
        agree: z.boolean().refine(val => val === true, t('errors.agree_required')),
    });

export type ContactFormType = z.infer<ReturnType<typeof contactFormSchema>>;