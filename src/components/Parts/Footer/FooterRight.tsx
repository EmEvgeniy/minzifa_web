'use client';
import { usePostMutation } from '@/api/post.api';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import { useSnackStore } from '../../../store/useSnackStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { footerSubscribeSchema, FooterSubscribeFormType } from '@/validation/footerSubscribeSchema';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { useMetricsStore } from '@/store/useMetricsStore';
import { Input } from '../../UI/Form';
import Button from '../../UI/Button/Button';

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
  const lang = useLocale();
  const { setMessage, setError } = useSnackStore((state) => state);
  const { isReady, getToken } = useRecaptcha();
  const { metrics } = useMetricsStore();

  const schema = footerSubscribeSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FooterSubscribeFormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      recaptchaToken: '',
    },
  });


  const { mutate, isPending } = usePostMutation<FormResponse, SubscribeFormRequest>(
    ['subscribe-form'],
    () => {
      setMessage(lang == 'en' ? 'You was subscribed!' : 'Вы были подписаны!');
      reset();
    },
    () => {
      setError(lang == 'en' ? 'Some error was happened' : 'Произошла ошибка');
    },
  );

  const onSubmit = async (data: FooterSubscribeFormType) => {
    if (!isReady) {
      return;
    }

    const token = await getToken('subscribe');

    if (!token) {
      setError(lang == 'en' ? 'Failed to verify reCAPTCHA. Please try again.' : 'Не удалось верифицировать reCAPTCHA. Пожалуйста, попробуйте еще раз.');
      return;
    }

    await mutate({
      obj: {
        ...data,
        recaptchaToken: token,
        ...metrics
      },
      endpoint: 'forms/subscribes',
    });
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="text-xl font-bold">{t('footer.form_title')}</p>
      <p className="text-sm">{t('footer.form_text')}</p>

      <form className="flex items-start justify-between gap-2.5 w-full" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email')}
          type="email"
          placeholder={t('footer.form_pl')}
          error={errors.email}
        />
        <Button
          type="submit"
          disabled={!isValid || isPending}
          className={"px-4 py-3"}
        >
          {t('footer.form_btn')}
        </Button>
      </form>
      <p className="text-xs">{t('footer.form_b_text')}</p>
    </div>
  );
};
