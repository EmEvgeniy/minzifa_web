// validation/quizFormSchema.ts
import { z } from 'zod';

export const quizFormSchema = (t: (key: string) => string) =>
  z.object({
    whereGo: z.string().optional(),
    whenGo: z.string().optional(),
    howManyPeople: z.string().optional(),
    howManyDays: z.string().optional(),
    budget: z.string().optional(),
    accomodation: z.string().optional(),
    name: z.string().min(3, t('errors.name_min')),
    email: z
      .string()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, t('errors.email_invalid')),
    phone: z.string().min(10, t('errors.phone_invalid')),
    // contactToTalk: z.string().optional(),
    recaptchaToken: z.string().optional(),
  });

export type QuizFormType = z.infer<ReturnType<typeof quizFormSchema>>;
