'use client';

import { usePostMutation } from '@/api/post.api';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useSnackStore } from '@/components/UI/CustomSnackBar/store';
import { useRouter } from 'next/navigation';
import { PhoneInputComp } from '@/components/UI';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/utils/utils';
import { useMetricsStore } from '@/store/useMetricsStore';
import { contactFormSchema, ContactFormType } from '@/validation/contactFormSchema';

export const Form = () => {
  const t = useTranslations();
  const { setMessage, setError } = useSnackStore();
  const lang = useLocale();
  const router = useRouter();
  const { metrics } = useMetricsStore();

  const schema = contactFormSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    control,
  } = useForm<ContactFormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      agree: false,
    },
  });

  const { mutate, isPending } = usePostMutation<ContactFormType, ContactFormType>(
    ['contact-us'],
    () => {
      setMessage(
        lang === 'en'
          ? 'Your request has been successfully sent.'
          : 'Ваша заявка была успешно отправлена'
      );
      router.push(`/${lang}/thank-you`);
    },
    () => {
      setError(lang === 'en' ? 'Some error was happened' : 'Произошла ошибка');
    }
  );

  const onSubmit = (data: ContactFormType) => {
    mutate({ obj: { ...data, ...metrics }, http: 'forms/contact-us' });
  };

  const inputClasses = (hasError?: boolean) =>
    cn(
      'focus:ring-primary-500 focus:border-primary-500 block w-full rounded-[18px] border p-4 text-sm text-gray-900 shadow-sm bg-gray-50',
      'h-[55px]', // фиксированная высота
      hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500'
    );

  return (
    <div className="mx-auto w-full max-[768px]:max-w-full h-full">
      <h2 className="font-bold mb-4 text-[42px] tracking-tight text-white max-[768px]:text-[30px] max-[768px]:text-center">
        {t('contact_us.form_title')}
      </h2>

      <form
        className="space-y-6 max-[768px]:space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Имя */}
        <div>
          <input
            type="text"
            {...register('name')}
            className={inputClasses(!!errors.name)}
            placeholder={t('contact_us.pl')}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            {...register('email')}
            className={inputClasses(!!errors.email)}
            placeholder={t('contact_us.pl2')}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Телефон */}
        <div>
          <PhoneInputComp
            value={watch('phone')}
            onChange={(value) => setValue('phone', value, { shouldValidate: true })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Сообщение */}
        <div>
          <textarea
            rows={6}
            {...register('message')}
            className={cn(inputClasses(!!errors.message), 'resize-none h-[100px]')}
            placeholder={t('contact_us.pl4')}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Checkbox */}
        <div>
          <Controller
            name="agree"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} color="primary" />}
                label={
                  <span className="text-white text-sm">
                    {t('contact_us.pl5')} <span>{t('contact_us.pr')}</span>
                  </span>
                }
              />
            )}
          />
          {errors.agree && (
            <p className="text-red-500 text-sm mt-1">{errors.agree.message}</p>
          )}
        </div>

        {/* Кнопка */}
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={!isValid || isPending}
          sx={{ width: '100%', borderRadius: '16px', minHeight: 45 }}
        >
          {t('contact_us.btn')}
        </Button>
      </form>
    </div>
  );
};