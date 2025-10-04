import { z } from 'zod';

export const tourPrivateFormSchema = (t: (k: string) => string) =>
  z.object({
    date: z.string().min(1, t('tour_private.date_required')),
    travellers: z.number().int().min(1, t('tour_private.travellers_min')).max(50, t('tour_private.travellers_max')),
    priceOption: z.union([z.string(), z.number()]).optional().nullable(),
    wishes: z.string().max(1000).optional().or(z.literal('')),
    name: z.string().min(2, t('forms.name_required')),
    email: z.string().email(t('forms.email_invalid')),
    phone: z.string().min(5, t('forms.phone_required')),
  });

export type TourPrivateFormType = {
  date: string;
  travellers: number;
  priceOption?: string | number | null;
  wishes?: string;
  name: string;
  email: string;
  phone: string;
};


