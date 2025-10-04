'use client';

import { useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhoneInputComp } from '@/components/UI/PhoneInput/PhoneInputComp';
import Counter from '@/components/UI/Counter/Counter';
import { Dropdown } from '@/components/UI/Dropdown/Dropdown';
import { Popup } from '@/components/UI/Popup/Popup';
import { cn } from '@/utils/utils';
import { useTourPrivateModalStore } from '@/store/useTourPrivateModalStore';
import { tourPrivateFormSchema, TourPrivateFormType } from '@/validation/tourPrivateFormSchema';

type Props = {
  locale: string;
  isIndividual: boolean;
};

export default function TourPrivateModal({ locale, isIndividual }: Props) {
  const t = useTranslations();
  const currentLocale = useLocale();

  const { isOpen, close, form, setForm, priceOptions, resetForm } = useTourPrivateModalStore();

  const schema = useMemo(() => tourPrivateFormSchema((key: string) => t(key)), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm<TourPrivateFormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      date: form.date ?? '',
      travellers: form.travellers ?? 1,
      priceOption: form.priceOption ?? null,
      wishes: form.wishes ?? '',
      name: form.name ?? '',
      email: form.email ?? '',
      phone: form.phone ?? '',
    },
  });

  useEffect(() => {
    reset({
      date: form.date ?? '',
      travellers: form.travellers ?? 1,
      priceOption: form.priceOption ?? null,
      wishes: form.wishes ?? '',
      name: form.name ?? '',
      email: form.email ?? '',
      phone: form.phone ?? '',
    });
  }, [form, reset]);

  const onSubmit = () => {
    close();
    resetForm();
  };

  const inputClasses = (hasError?: boolean) =>
    cn(
      'focus:ring-primary-500 focus:border-primary-500 block w-full rounded-[18px] border p-4 text-sm text-gray-900 shadow-sm bg-gray-50',
      'h-[55px]',
      hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    );

  const label = (text: string) => (
    <label className="block text-sm font-medium text-gray-700 mb-1">{text}</label>
  );

  return (
    <Popup
      open={isOpen}
      handleClose={() => {
        close();
      }}
      content={
        <div className="w-full max-w-[920px] mx-auto p-6 bg-white rounded-2xl">
          <h2 className="text-2xl font-semibold text-[#16372D] mb-4 text-center">
            {t('Tour.private_tour.title')}
          </h2>
          <p>{t('Tour.private_tour.subtitle')}</p>
          <form
            className="grid grid-cols-1 gap-6 max-[768px]:grid-cols-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4">
              <div>
                {label(t('Tour.private_tour.date'))}
                <input type="date" className={inputClasses(!!errors.date)} {...register('date')} />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date.message as string}</p>
                )}
              </div>

              <div>
                {label(t('Tour.private_tour.travellers'))}
                <div className="rounded-[18px] border bg-white p-3">
                  <Counter
                    value={watch('travellers') || 1}
                    onChange={(v) => {
                      setValue('travellers', v, { shouldValidate: true });
                      setForm({ travellers: v });
                    }}
                    min={1}
                    label={t('Tour.private_tour.travellers_label')}
                  />
                </div>
                {errors.travellers && (
                  <p className="text-red-500 text-sm mt-1">{errors.travellers.message as string}</p>
                )}
              </div>

              {isIndividual && priceOptions?.length > 0 && (
                <div>
                  {label(t('Tour.private_tour.price_option'))}
                  <Dropdown
                    className="w-full"
                    value={watch('priceOption') ?? undefined}
                    onChange={(val) => {
                      setValue('priceOption', val as string | number, { shouldValidate: true });
                      setForm({ priceOption: val as string | number });
                    }}
                    options={priceOptions}
                    placeholder={t('Tour.private_tour.price_placeholder')}
                  />
                </div>
              )}

              <div>
                {label(t('Tour.private_tour.wishes'))}
                <textarea
                  rows={5}
                  className={cn(
                    'focus:ring-primary-500 focus:border-primary-500 block w-full rounded-[18px] border p-4 text-sm text-gray-900 shadow-sm bg-gray-50',
                    errors.wishes && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                  )}
                  {...register('wishes')}
                  placeholder={t('Tour.private_tour.wishes_placeholder')}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                {label(t('forms.name'))}
                <input
                  type="text"
                  {...register('name')}
                  className={inputClasses(!!errors.name)}
                  placeholder={t('forms.name_placeholder')}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>
                )}
              </div>

              <div>
                {label(t('forms.email'))}
                <input
                  type="email"
                  {...register('email')}
                  className={inputClasses(!!errors.email)}
                  placeholder={t('forms.email_placeholder')}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
                )}
              </div>

              <div>
                {label(t('forms.phone'))}
                <PhoneInputComp
                  value={watch('phone')}
                  onChange={(value) => setValue('phone', value, { shouldValidate: true })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message as string}</p>
                )}
              </div>

              <button
                disabled={!isValid}
                className={cn(
                  'bg-[#27A430] text-white font-semibold text-base rounded-2xl py-4 mt-2',
                  !isValid && 'bg-gray-300 touch-none',
                )}
              >
                {t('Tour.private_tour.submit')}
              </button>
            </div>
          </form>
        </div>
      }
      maxWidth="md"
      className=""
      locale={locale || (currentLocale as string)}
    />
  );
}
