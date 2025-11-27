'use client';

import { usePostMutation } from '@/api/post.api';
import Button from '@/components/UI/Button/Button';
import { useLocale, useTranslations } from 'next-intl';
import { useSnackStore } from '@/store/useSnackStore';
import { useRouter } from 'next/navigation';
import { PhoneInputComp } from '@/components/UI';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMetricsStore } from '@/store/useMetricsStore';
import { contactFormSchema, ContactFormType } from '@/validation/contactFormSchema';
import { Checkbox, Input, Textarea } from '@/components/UI/Form';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { useAuthStore } from '@/store';

export const ContactForm = () => {
  const t = useTranslations();
  const { setMessage, setError } = useSnackStore();
  const lang = useLocale();
  const router = useRouter();
  const { metrics } = useMetricsStore();
  const { isReady, getToken } = useRecaptcha();
  const { user } = useAuthStore();
  const schema = contactFormSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<ContactFormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      message: '',
      agree: false,
      recaptchaToken: '',
    },
  });


  const { mutate, isPending } = usePostMutation<ContactFormType, ContactFormType>(
    ['contact-us'],
    () => {
      setMessage(
        lang === 'en'
          ? 'Your request has been successfully sent.'
          : 'Ваша заявка была успешно отправлена',
      );
      router.push(`/${lang}/thank-you`);
    },
    () => {
      setError(lang === 'en' ? 'Some error was happened' : 'Произошла ошибка');
    },
  );

  const onSubmit = async (data: ContactFormType) => {
    if (!isReady) {
      return;
    }

    const token = await getToken('contact');

    if (!token) {
      setError(lang === 'en' ? 'Failed to verify reCAPTCHA. Please try again.' : 'Не удалось верифицировать reCAPTCHA. Пожалуйста, попробуйте еще раз.');
      return;
    }

    await mutate({
      obj: {
        ...data,
        recaptchaToken: token,
        ...metrics
      },
      endpoint: 'forms/contact-us'
    });
  };

  return (
    <div className="mx-auto w-full max-[768px]:max-w-full h-full">
      <h2 className="font-bold mb-4 text-[42px] tracking-tight text-white max-[768px]:text-[30px] max-[768px]:text-center">
        {t('contact_us.form_title')}
      </h2>

      <form className="space-y-6 max-[768px]:space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Имя */}
        <Input
          {...register('name')}
          error={errors.name}
          placeholder={t('contact_us.pl')}
          className='px-5 py-4'
        />

        {/* Email */}
        <Input
          {...register('email')}
          type="email"
          error={errors.email}
          placeholder={t('contact_us.pl2')}
          className='px-5 py-4'
        />

        {/* Телефон */}
        <PhoneInputComp
          value={watch('phone')}
          onChange={(value) => setValue('phone', value, { shouldValidate: true })}
          error={errors.phone}
        />

        {/* Сообщение */}
        <Textarea
          {...register('message')}
          rows={4}
          error={errors.message}
          placeholder={t('contact_us.pl4')}
          className="resize-none"
        />

        {/* Checkbox */}

        <Controller
          name="agree"
          control={control}
          render={({ field }) => (
            <Checkbox
              {...register('agree')}
              label={t('contact_us.pl5')}
              checked={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              labelClassName='text-white hover:text-white'
            />
          )}
        />


        {/* Кнопка */}
        <Button
          color="primary"
          type="submit"
          disabled={isPending || watch('agree') === false}
          className="px-5 py-4 w-full"
        >
          {t('contact_us.btn')}
        </Button>
      </form>
    </div>
  );
};
