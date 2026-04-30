'use client';

import { useLocale, useTranslations } from 'next-intl';
import Button from '@/components/UI/Button/Button';
import { Checkbox, Input } from '@/components/UI/Form';
import { useSnackStore } from '@/store/useSnackStore';
import { useFormSubmit, useRecaptcha } from '@/hooks';
import { useMetricsStore } from '@/store';
import { SubscribeFormType, subscribeSchema } from '@/validation/subscribeSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormNameEnum } from '@/constants';
import Link from 'next/link';
import { cn } from '@/utils';

export default function NewsletterSignup() {
  const t = useTranslations('home');
  const locale = useLocale();

  const { setMessage, setError } = useSnackStore((state) => state);
  const { token, getToken } = useRecaptcha();
  const { metrics } = useMetricsStore();

  const schema = subscribeSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscribeFormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
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

  const onSubmit = async (data: SubscribeFormType) => {
    const formData = {
      ...data,
      recaptchaToken: token,
      ...metrics,
    };

    await submitForm(FormNameEnum.SUBSCRIBES, formData);
  };

  return (
    <section className="container md:px-2.5 mb-[70px] md:mb-[72px]">
      <div className="bg-foreground/8 overflow-hidden md:rounded-5xl px-4 py-8 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2
            className={cn(
              'font-title font-bold text-2xl leading-120 mb-6',
              'md:text-[32px] md:leading-100 md:tracking-zero md:mb-0',
            )}
          >
            {t('newsletter.title')}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 max-w-[580px]">
            <div className="flex flex-col md:flex-row relative items-center md:bg-white rounded-xl p-1">
              <Input
                type="text"
                placeholder={t('newsletter.namePlaceholder')}
                {...register('name')}
                error={!!errors.name}
                className={cn('bg-white border border-foreground/12 rounded-[12px]', 'md:border-0 md:py-3')}
                wrapperClassName="mb-2 md:mb-0"
                variant="borderless"
              />

              <div className="border border-foreground/12 h-[42px] hidden md:block" />

              <Input
                placeholder={t('newsletter.emailPlaceholder')}
                {...register('email')}
                type="email"
                error={!!errors.email}
                className={cn('bg-white border border-foreground/12 rounded-[12px]', 'md:border-0 md:py-3')}
                wrapperClassName="mb-6 md:mb-0"
                variant="borderless"
              />

              <Button
                type="submit"
                color="primary"
                disabled={isSubmitting || !token}
                className="w-full text-base font-semibold leading-100 tracking-zero"
              >
                {isSubmitting ? t('newsletter.subscribing') : t('newsletter.subscribeButton')}
              </Button>
            </div>

            <Checkbox
              label={
                t.rich('newsletter.termsAcceptance', {
                  terms: (chunks) => (
                    <Link
                      href={`/${locale}/term-and-conditions-of-booking-tours`}
                      className="text-foreground underline font-bold"
                      target="_blank"
                    >
                      {chunks}
                    </Link>
                  ),
                  privacy: (chunks) => (
                    <Link
                      href={`/${locale}/privacy-policy`}
                      className="text-foreground underline font-bold"
                      target="_blank"
                    >
                      {chunks}
                    </Link>
                  ),
                }) as string
              }
              checked={!!token}
              onChange={handleRecaptcha}
              className="text-sm leading-[20px] tracking-zero"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
