'use client';

import { PhoneInputComp } from '@/components/UI/PhoneInput/PhoneInputComp';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { tourPrivateFormSchema } from '@/validation/tourPrivateFormSchema';
import { Controller, useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { Input, Textarea } from '@/components/UI/Form';
import { CustomDatepicker } from '@/components/UI/CustomDatepicker/CustomDatepicker';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import IconCalendar from '@/assets/icons/booking/calendar.svg';
import { PrivateTourFormState, usePrivateTourFormStore } from '@/store/privateTourFormStore';
import { Tour } from '../_types';
import Button from '@/components/UI/Button/Button';
import { DropdownField } from '@/components/UI/Form/DropdownField/DropdownField';
import FormattedPrice from '@/components/UI/FormattedPrice/FormattedPrice';
import { usePostMutation } from '@/api/post.api';
import { useRouter } from 'next/navigation';
import { useSnackStore } from '@/store/useSnackStore';
import { useMetricsStore } from '@/store';
import { calculateEndDate } from '@/utils/utils';
import { useRecaptcha } from '@/hooks/useRecaptcha';

export const Content = ({ tour }: { tour: Tour }) => {
  const t = useTranslations('Tour');
  const locale = useLocale();
  const router = useRouter();
  const { formData, setFormData, setPopup, resetFormData } = usePrivateTourFormStore();
  const { setMessage, setError } = useSnackStore();
  const { metrics } = useMetricsStore();
  const { isReady, getToken } = useRecaptcha();

  const schema = useMemo(() => tourPrivateFormSchema((key: string) => t(key)), [t]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<PrivateTourFormState['formData']>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: formData,
  });

  const { mutate } = usePostMutation<PrivateTourFormState['formData'], PrivateTourFormState['formData']>(
    ['private-tour-booking'],
    () => {
      setMessage(locale == 'en' ? 'Your tour was booked!' : 'Ваш тур был забронирован!');
      setPopup(false);
      resetFormData();
      router.push(`/${locale}/thank-you`);
    },
    () => {
      setError(locale == 'en' ? 'Some error was happened' : 'Произошла ошибка');
    },
  );


  const onSubmit = async (formData: PrivateTourFormState['formData']) => {
    if (!isReady) {
      return;
    }

    const token = await getToken('private_tour');

    if (!token) {
      setError(locale == 'en' ? 'Failed to verify reCAPTCHA. Please try again.' : 'Не удалось верифицировать reCAPTCHA. Пожалуйста, попробуйте еще раз.');
      return;
    }

    mutate({
      obj: { ...formData, recaptchaToken: token, ...metrics },
      endpoint: `forms/private-tour-booking?locale=${locale}`,
    })
  };

  const valute = tour?.prices?.valute;

  const comfortOptions = [
    {
      label: (
        <>
          {t('private_tour.comfort.moderate')} (
          <FormattedPrice
            price={tour?.prices?.price_for_3_hotels}
            currency={valute}
          />
          )
        </>
      ),
      value: tour?.prices?.price_for_3_hotels,
    },
    {
      label: (
        <>
          {t('private_tour.comfort.enhanced')} (
          <FormattedPrice
            price={tour?.prices?.price_for_4_hotels}
            currency={valute}
          />
          )
        </>
      ),
      value: tour?.prices?.price_for_4_hotels,
    },
    {
      label: (
        <>
          {t('private_tour.comfort.ultimate')} (
          <FormattedPrice
            price={tour?.prices?.price_for_5_hotels}
            currency={valute}
          />
          )
        </>
      ),
      value: tour?.prices?.price_for_5_hotels,
    },
  ];

  const handleDateChange = (newValue: [Date | null, Date | null], days: number) => {
    if (newValue && newValue[0] && !newValue[1] && days) {
      const startDate = newValue[0];
      const endDate = calculateEndDate(startDate, days);

      setFormData(prev => ({ ...prev, dates: [startDate, endDate] }));
    } else {
      setFormData(prev => ({ ...prev, dates: newValue }));
    }
  };

  useEffect(() => {
    const now = new Date();
    const endDate = calculateEndDate(now, tour?.days);
    setFormData(prev => ({ ...prev, dates: [now, endDate] }));
  }, [tour?.days, setFormData]);

  return (
    <div className="w-full mx-auto p-5 md:p-6 bg-white rounded-2xl md:max-w-[600px]">
      <div className="relative flex items-start justify-baseline w-full mb-8">
        <div className='w-full'>
          <h2 className="text-xl md:text-2xl font-semibold text-black mb-2 text-left">
            {t('private_tour.forms.title')}
          </h2>
          <p className="text-sm md:text-base text-gray-500">{t('private_tour.forms.subtitle')}</p>
        </div>
        <button type="button" className="cursor-pointer" onClick={() => setPopup(false)}>
          <FaTimes size={24} />
        </button>
      </div>

      <form
        className="grid grid-cols-1 gap-6 max-[768px]:grid-cols-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Controller
              control={control}
              name="dates"
              render={({ field }) => (
                <CustomDatepicker
                  selectsRange
                  startDate={field.value?.[0]}
                  endDate={field.value?.[1]}
                  onChange={(newValue) => {
                    field.onChange(newValue)
                    handleDateChange(newValue, tour?.days);
                  }}
                  minDate={new Date()}
                  customInput={
                    <Input
                      label={t('private_tour.forms.date')}
                      placeholder={t('private_tour.forms.date')}
                      startIcon={
                        <ImageWithFallback
                          src={IconCalendar}
                          width={24}
                          height={24}
                          alt="calendar"
                          className="w-5 h-5 md:w-6 md:h-6"
                        />
                      }
                    />
                  }
                  locale={locale === 'ru' ? 'ru-RU' : 'en-US'}
                />
              )}
            />
            <Input
              type="text"
              label={t('private_tour.forms.travellers_label')}
              placeholder={t('private_tour.forms.travellers')}
              {...register('travellers', {
                valueAsNumber: true,
                min: 1,
              })}
              error={errors.travellers}
            />
          </div>
          {tour?.tour_type === 'individual' && (
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <DropdownField
                  label={t('private_tour.forms.price')}
                  options={comfortOptions}
                  placeholder={t('private_tour.forms.price_placeholder')}
                  value={field.value || undefined}
                  onChange={(value) => field.onChange(value)}
                  error={errors.price}

                />
              )}
            />
          )}
          <Textarea
            rows={3}
            {...register('wishes')}
            placeholder={t('private_tour.forms.wishes_placeholder')}
          />
        </div>

        <div className="flex flex-col gap-4 border border-gray-300 rounded-2xl p-6">
          <h3 className='text-lg font-medium'>{t('private_tour.forms.personal_data')}</h3>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <Input
              placeholder={t('private_tour.forms.name_placeholder')}
              {...register('name')}
              error={errors.name}
            />

            <Input
              placeholder={t('private_tour.forms.email_placeholder')}
              {...register('email')}
              error={errors.email}
            />
          </div>

          <PhoneInputComp
            value={watch('phone') || ''}
            onChange={(value) => setValue('phone', value, { shouldValidate: true })}
          />
        </div>

        {errors.recaptchaToken && (
          <p className="text-red-500 text-sm mt-1 text-center">
            {errors.recaptchaToken.message}
          </p>
        )}

        <Button
          disabled={!isValid}
          type="submit"
          color='primary'
        >
          {t('private_tour.forms.submit')}
        </Button>
      </form>
    </div>
  );
};
