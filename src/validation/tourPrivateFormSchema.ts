import { z } from 'zod';

export const tourPrivateFormSchema = (t: (k: string) => string) =>
  z.object({
    dates: z.tuple([z.date().nullable(), z.date().nullable()]),
    travellers: z.number().min(1, t('private_tour.forms.travellers_min')),
    price: z.union([z.string(), z.number()]).optional().nullable(),
    wishes: z.string(),
    name: z.string().min(2, t('private_tour.forms.name_required')),
    email: z.email(t('private_tour.forms.email_invalid')),
    phone: z.string().min(5, t('private_tour.forms.phone_required')),
  });
