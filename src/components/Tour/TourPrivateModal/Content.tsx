'use client';

import { PhoneInputComp } from '@/components/UI/PhoneInput/PhoneInputComp';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { tourPrivateFormSchema } from '@/validation/tourPrivateFormSchema';
import { Controller, useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { Checkbox, Input, Textarea } from '@/components/UI/Form';
import { CustomDatepicker } from '@/components/UI/CustomDatepicker/CustomDatepicker';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import IconCalendar from '@/assets/icons/booking/calendar.svg';
import { PrivateTourFormState, usePrivateTourFormStore } from '@/store/privateTourFormStore';
import { Tour } from '../_types';
import Button from '@/components/UI/Button/Button';
import { DropdownField } from '@/components/UI/Form/DropdownField/DropdownField';
import FormattedPrice from '@/components/UI/FormattedPrice/FormattedPrice';
import { useRouter } from 'next/navigation';
import { useSnackStore } from '@/store/useSnackStore';
import { useMetricsStore } from '@/store';
import { calculateEndDate } from '@/utils/utils';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import Link from 'next/link';
import { useFormSubmit } from '@/hooks';
import { FormNameEnum } from '@/constants';
import dayjs from 'dayjs';

export const Content = ({ tour }: { tour: Tour }) => {
  const t = useTranslations('tourDetail');
  const tGlobal = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { formData, setFormData, setPopup, resetFormData } = usePrivateTourFormStore();
  const { setMessage, setError } = useSnackStore();
  const { metrics } = useMetricsStore();
  const { token, getToken } = useRecaptcha();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PrivateTourFormState['formData']>({
    resolver: zodResolver(tourPrivateFormSchema((key: string) => tGlobal(key))),
    mode: 'onSubmit',
    defaultValues: formData,
  });

  const { isSubmitting, submitForm } = useFormSubmit({
    onSuccess: () => {
      setMessage(locale == 'en' ? 'Your tour was booked!' : 'Ваш тур был забронирован!');
      setPopup(false);
      resetFormData();
      router.push(`/${locale}/thank-you`);
    },
    onError: () => {
      setError(locale == 'en' ? 'Some error was happened' : 'Произошла ошибка');
    },
  });

  const handleRecaptcha = async () => await getToken(FormNameEnum.PRIVATE_TOUR_FORM);

  const onSubmit = async (data: PrivateTourFormState['formData']) => {
    const additionalFormData = {
      tour_id: tour.id,
      tour_name: tour.name,
      tour_start: dayjs(data.dates[0]).format('YYYY-MM-DD'),
      tour_end: dayjs(data.dates[1]).format('YYYY-MM-DD'),
      count: String(data.travellers),
      price: data.price,
      total_price: String(Number(data.price || 0) * parseInt(data.travellers)),
    };

    const formData = { ...data, recaptchaToken: token, ...metrics, ...additionalFormData, };

    await submitForm(FormNameEnum.PRIVATE_TOUR_FORM, formData);
  };

  const valute = tour?.prices?.valute;

  const comfortOptions: { label: ReactNode; value: string | number }[] = [];

  if (tour?.prices?.price_for_3_hotels) {
    comfortOptions.push({
      label: (
        <>
          {t('privateTour.comfort.moderate')} (
          <FormattedPrice
            price={tour.prices.price_for_3_hotels}
            currency={valute}
          />
          )
        </>
      ),
      value: tour.prices.price_for_3_hotels,
    });
  }

  if (tour?.prices?.price_for_4_hotels) {
    comfortOptions.push({
      label: (
        <>
          {t('privateTour.comfort.enhanced')} (
          <FormattedPrice
            price={tour.prices.price_for_4_hotels}
            currency={valute}
          />
          )
        </>
      ),
      value: tour.prices.price_for_4_hotels,
    });
  }

  if (tour?.prices?.price_for_5_hotels) {
    comfortOptions.push({
      label: (
        <>
          {t('privateTour.comfort.ultimate')} (
          <FormattedPrice
            price={tour.prices.price_for_5_hotels}
            currency={valute}
          />
          )
        </>
      ),
      value: tour.prices.price_for_5_hotels,
    });
  }

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
            {t('privateTour.forms.title')}
          </h2>
          <p className="text-sm md:text-base text-gray-500">{t('privateTour.forms.subtitle')}</p>
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
                    let modifiedValue = newValue;
                    if (newValue && newValue[0] && !newValue[1] && tour?.days) {
                      const startDate = newValue[0];
                      const endDate = calculateEndDate(startDate, tour.days);
                      modifiedValue = [startDate, endDate];
                    }
                    field.onChange(modifiedValue);
                    setFormData(prev => ({ ...prev, dates: modifiedValue }));
                  }}
                  minDate={new Date()}
                  customInput={
                    <Input
                      label={t('privateTour.forms.date')}
                      placeholder={t('privateTour.forms.date')}
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
            <Controller
              control={control}
              name="travellers"
              render={({ field }) => (
                <Input
                  type="text"
                  label={t('privateTour.forms.travellersLabel')}
                  placeholder={t('privateTour.forms.travellers')}
                  value={field.value || 1}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData(prev => ({ ...prev, travellers: e.target.value || "1" }));
                  }}
                  error={errors.travellers}
                />
              )}
            />
          </div>
          {tour?.tour_type === 'individual' && (
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <DropdownField
                  label={t('privateTour.forms.price')}
                  options={comfortOptions}
                  placeholder={t('privateTour.forms.pricePlaceholder')}
                  value={field.value || undefined}
                  onChange={(value) => {
                    field.onChange(value);
                    setFormData(prev => ({ ...prev, price: value }));
                  }}
                  error={errors.price}

                />
              )}
            />
          )}
          <Controller
            control={control}
            name="wishes"
            render={({ field }) => (
              <Textarea
                rows={3}
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(e);
                  setFormData(prev => ({ ...prev, wishes: e.target.value }));
                }}
                placeholder={t('privateTour.forms.wishesPlaceholder')}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4 border border-gray-300 rounded-2xl p-6">
          <h3 className='text-lg font-medium'>{t('privateTour.forms.personalData')}</h3>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  placeholder={t('privateTour.forms.namePlaceholder')}
                  value={field.value || ''}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData(prev => ({ ...prev, name: e.target.value }));
                  }}
                  error={errors.name}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  placeholder={t('privateTour.forms.emailPlaceholder')}
                  value={field.value || ''}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                  }}
                  error={errors.email}
                />
              )}
            />
          </div>

          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneInputComp
                value={field.value || ''}
                onChange={(value) => {
                  field.onChange(value);
                  setFormData(prev => ({ ...prev, phone: value }));
                }}
              />
            )}
          />
        </div>

        <Checkbox
          label={tGlobal.rich('common.termsAcceptance', {
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
          onChange={() => handleRecaptcha()}
          labelClassName='flex-wrap gap-x-1 text-sm text-gray-500 hover:text-gray-500'
        />

        <Button
          disabled={isSubmitting || !token}
          type="submit"
          color='primary'
        >
          {t('privateTour.forms.submit')}
        </Button>
      </form>
    </div>
  );
};
