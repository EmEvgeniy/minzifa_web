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
import { useFormSubmit } from '@/hooks';
import Link from 'next/link';
import { FormNameEnum } from '@/constants';

export const ContactForm = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { setMessage, setError } = useSnackStore();
  const lang = useLocale();
  const router = useRouter();
  const { metrics } = useMetricsStore();
  const { getToken, token } = useRecaptcha();
  const { user } = useAuthStore();
  const schema = contactFormSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ContactFormType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      message: '',
      recaptchaToken: '',
    },
  });

  const { submitForm, isSubmitting } = useFormSubmit({
    onSuccess: () => {
      setMessage(lang === 'en' ? 'Your request has been successfully sent.' : 'Ваша заявка была успешно отправлена');
      router.push(`/${lang}/thank-you`);
    },
    onError: () => {
      setError(lang === 'en' ? 'Some error was happened' : 'Произошла ошибка');
    },
  });

  const handleRecaptcha = async () => await getToken(FormNameEnum.CONTACT_US);

  const onSubmit = async (data: ContactFormType) => {
    const formData = {
      ...data,
      recaptchaToken: token,
      ...metrics
    };

    await submitForm(FormNameEnum.CONTACT_US, formData);
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

        <Checkbox
          label={t.rich('confirm_form_text', {
            terms: (chunks) => (
              <Link
                href={`/${locale}/term-and-conditions-of-booking-tours`}
                className="text-[#009F65] hover:underline"
                target='_blank'
              >
                {chunks}
              </Link>
            ),
            privacy: (chunks) => (
              <Link href={`/${locale}/privacy-policy`} className="text-[#009F65] hover:underline" target='_blank'>
                {chunks}
              </Link>
            ),
          })}
          checked={!!token}
          onChange={(e) => handleRecaptcha()}
          labelClassName='flex-wrap gap-x-1 text-sm text-white/80 hover:text-white'
        />


        {/* Кнопка */}
        <Button
          color="primary"
          type="submit"
          disabled={isSubmitting || !token}
          className="px-5 py-4 w-full"
        >
          {t('contact_us.btn')}
        </Button>
      </form>
    </div>
  );
};
