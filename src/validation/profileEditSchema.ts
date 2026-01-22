import { z } from 'zod';

export const profileEditSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(3, t('errors.name_min'))
      .max(255, t('errors.name_max') || 'Имя должно быть не более 255 символов'),
    email: z.email(t('errors.email_invalid')),
    phone: z.string().min(10, t('errors.phone_invalid')),
    avatar: z
      .instanceof(File)
      .optional()
      .refine(
        (file) => !file || file.size <= 5 * 1024 * 1024,
        t('errors.file_size_max') || 'Файл слишком большой (максимум 5MB)',
      )
      .refine(
        (file) => !file || file.type.startsWith('image/'),
        t('errors.file_type_invalid') || 'Неверный тип файла',
      ),
  });

export const passwordChangeSchema = (t: (key: string) => string) =>
  z
    .object({
      current_password: z.string().min(1, t('errors.password_required')),
      new_password: z.string().min(6, t('errors.password_min')),
      confirm_new_password: z.string().min(6, t('errors.confirmPassword_min')),
    })
    .refine((data) => data.new_password === data.confirm_new_password, {
      message: t('errors.passwordMismatch'),
      path: ['confirm_new_password'],
    })
    .refine((data) => data.current_password !== data.new_password, {
      message: t('profile.password_same_error'),
      path: ['new_password'],
    });

export type ProfileEditFormType = z.infer<ReturnType<typeof profileEditSchema>>;
export type PasswordChangeFormType = z.infer<ReturnType<typeof passwordChangeSchema>>;
