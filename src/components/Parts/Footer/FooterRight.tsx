'use client';

import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import { useSnackStore } from '../../../store/useSnackStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { footerSubscribeSchema, FooterSubscribeFormType } from '@/validation/footerSubscribeSchema';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { useMetricsStore } from '@/store/useMetricsStore';
import { Checkbox, Input } from '../../UI/Form';
import Button from '../../UI/Button/Button';
import { useFormSubmit } from '@/hooks';
import Link from 'next/link';
import { FormNameEnum } from '@/constants';

interface SubscribeFormRequest {
  email: string;
  recaptchaToken: string;
}

interface FormResponse {
  form_data: SubscribeFormRequest;
  form_name: string;
}

export const FooterRight = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { setMessage, setError } = useSnackStore((state) => state);
  const { token, getToken } = useRecaptcha();
  const { metrics } = useMetricsStore();

  const schema = footerSubscribeSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FooterSubscribeFormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      recaptchaToken: '',
    },
  });

  const { isSubmitting, submitForm } = useFormSubmit({
    onSuccess: () => {
      setMessage(locale == 'en' ? 'You was subscribed!' : 'Вы были подписаны!');
      reset();
    },
    onError: () => {
      setError(locale == 'en' ? 'Some error was happened' : 'Произошла ошибка');
    },
  });

  const handleRecaptcha = async () => await getToken(FormNameEnum.SUBSCRIBES);

  const onSubmit = async (data: FooterSubscribeFormType) => {
    const formData = {
      ...data,
      recaptchaToken: token,
      ...metrics
    };

    await submitForm(FormNameEnum.SUBSCRIBES, formData);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="text-xl font-bold">{t('footer.form_title')}</p>
      <p className="text-sm">{t('footer.form_text')}</p>

      <form className="flex flex-col items-start justify-between gap-2.5 w-full" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email')}
          type="email"
          placeholder={t('footer.form_pl')}
          error={errors.email}
        />
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
          onChange={handleRecaptcha}
          labelClassName='flex-wrap gap-x-1 text-sm text-white/80 hover:text-white'
        />

        <Button
          type="submit"
          disabled={isSubmitting || !token}
          className={"px-4 py-3"}
        >
          {t('footer.form_btn')}
        </Button>
      </form>

    </div>
  );
};
