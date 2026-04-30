'use client';

import { PhoneInputComp, Popup } from '../UI';
import { usePlanYourTripPopupStore } from '@/store/usePlanYourTripPopup';
import { Checkbox, Input } from '../UI/Form';
import Button from '../UI/Button/Button';
import { useLocale, useTranslations } from 'next-intl';
import { useFormSubmit, useRecaptcha } from '@/hooks';
import { useSnackStore } from '@/store/useSnackStore';
import { useMetricsStore } from '@/store';
import { planYourTripFormSchema, planYourTripFormType } from '@/validation/planYourTripFormSchema';
import { FormNameEnum } from '@/constants';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LiaTimesSolid } from 'react-icons/lia';
import { cn } from '@/utils';

export default function PlanYourTripPopup() {
  const t = useTranslations('PlanYourTripPopup');
  const locale = useLocale();

  const { planYourTripPopup, setPlanYourTripPopup } = usePlanYourTripPopupStore();

  const { setMessage, setError } = useSnackStore((state) => state);
  const { token, getToken } = useRecaptcha();
  const { metrics } = useMetricsStore();

  const schema = planYourTripFormSchema(t);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<planYourTripFormType>({
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

  const handleRecaptcha = async () => await getToken(FormNameEnum.PLAN_YOUR_TRIP);

  const onSubmit = async (data: planYourTripFormType) => {
    const formData = {
      ...data,
      recaptchaToken: token,
      ...metrics,
    };

    await submitForm(FormNameEnum.PLAN_YOUR_TRIP, formData);
  };

  const handleClose = () => {
    setPlanYourTripPopup(false);
  };

  if (!planYourTripPopup) return null;

  return (
    <Popup
      open={planYourTripPopup}
      handleCloseAction={handleClose}
      showTimesButton={false}
      content={
        <div className="relative flex flex-col items-center bg-white p-5 pb-8 rounded-4xl max-w-[500px]">
          <Button
            color="link"
            onClick={handleClose}
            className="cursor-pointer rounded-full overflow-hidden self-end p-2.5 w-[44px] h-[44px] bg-foreground/8 text-foreground"
          >
            <LiaTimesSolid size={24} />
          </Button>

          <div className="flex flex-col items-center gap-1 mb-[32px]">
            <h2 className={cn(
              'font-title text-foreground font-bold text-[32px] leading-100 tracking-zero',
            )}>
              {t('title')}
            </h2>
            <p className="text-content text-sm leading-100 tracking-zero">{t('subtitle')}</p>
          </div>

          <form className="flex flex-col items-center gap-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="border w-full border-foreground/12 mb-[16px]" />

            <Input
              type="text"
              placeholder={t('form.name')}
              {...register('name')}
              error={!!errors.name}
              className="bg-foreground/8 border border-foreground/12 px-3 py-4 rounded-[12px]"
            />

            <PhoneInputComp
              value={watch('phone')}
              onChange={(value) => setValue('phone', value, { shouldValidate: true })}
              error={!!errors.phone}
              inputClass="!bg-foreground/8 !border !border-foreground/12 !pl-12 !pr-3 !py-4 !rounded-[12px]"
            />

            <Input
              type="text"
              placeholder={t('form.email')}
              {...register('email')}
              error={!!errors.email}
              className="bg-foreground/8 border border-foreground/12 px-3 py-4 rounded-[12px]"
            />

            <Button
              type="submit"
              color="primary"
              disabled={isSubmitting || !token}
              className="w-full text-base font-semibold leading-100 tracking-zero"
            >
              {t('form.button')}
            </Button>

            <Checkbox
              label={
                t.rich('form.terms', {
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
      }
    />
  );
}
