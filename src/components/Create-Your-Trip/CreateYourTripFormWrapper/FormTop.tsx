'use client';

import { useLocale, useTranslations } from 'next-intl';
import React, { useMemo, useState } from 'react';
import { useGetQuery } from '@/api/get.api';
import { DestinationCard } from '@/components/Home/Destinations/_types';
import { useSnackStore } from '@/store/useSnackStore';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { useMetricsStore } from '@/store/useMetricsStore';
import { FormNameEnum } from '@/constants';
import {
  createYourTripFormSchema,
  CreateYourTripFormType,
} from '@/validation/createYourTripFormSchema';
import {
  DestinationsSection,
  TripBasicsSection,
  PersonalInfoSection,
  ContactSection,
} from './components';
import { Checkbox } from '@/components/UI/Form';
import Button from '@/components/UI/Button/Button';
import Link from 'next/link';
import Loader from '@/components/UI/Loader/Loader';

export const FormTop = () => {
  const t = useTranslations('createYourTrip');
  const tErrors = useTranslations();
  const lang = useLocale();
  const locale = useLocale();
  const { setMessage, setError } = useSnackStore((state) => state);
  const router = useRouter();
  const { metrics } = useMetricsStore();
  const { getToken, token } = useRecaptcha();
  const [showCustomTourForm, setShowCustomTourForm] = useState(false);

  const schema = createYourTripFormSchema(tErrors);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateYourTripFormType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      hotel_type: '',
      days: 1,
      date: '',
      destinations: [],
      wishes: '',
      travellers_type: 'Solo',
      travellers: {
        adults: 1,
        children: 0,
      },
      appeals: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      nationality: '',
      recaptchaToken: '',
    },
  });

  const { data, isSuccess } = useGetQuery<{ data: DestinationCard[] }>({
    key: ['destinations_form_create'],
    page: '',
    perPage: '',
    url: 'destinations',
    searchItem: '',
    additionalParam: '&parent=0',
  });

  const { submitForm, isSubmitting } = useFormSubmit({
    onSuccess: () => {
      setMessage(t('messages.success'));
      router.push(`/${lang}/thank-you`);
    },
    onError: () => {
      setError(t('messages.error'));
    },
  });

  const handleRecaptcha = async () => await getToken(FormNameEnum.CREATE_MY_TRIP);

  const onSubmit = async (formData: CreateYourTripFormType) => {
    const data = {
      ...formData,
      ...metrics,
      recaptchaToken: token,
    };

    await submitForm(FormNameEnum.CREATE_MY_TRIP, data);
  };

  const hotelOptions = useMemo(
    () => [
      { value: 'boutique-hotel', label: t('form.hotel.boutique') },
      { value: '3 stars', label: t('form.hotel.3stars'), stars: 3 },
      { value: '4 stars', label: t('form.hotel.4stars'), stars: 4 },
      { value: '5 stars', label: t('form.hotel.5stars'), stars: 5 },
      { value: 'self-booking', label: t('form.hotel.self_booking') },
      { value: 'not-needed', label: t('form.hotel.not_needed') },
    ],
    [t]
  );

  const travellerTypes = useMemo(
    () => [
      t('form2.travellerType.solo'),
      t('form2.travellerType.couple'),
      t('form2.travellerType.family'),
      t('form2.travellerType.group'),
    ],
    [t]
  );

  const appealOptions = useMemo(
    () => [
      { title: t('form2.appeal.mr') },
      { title: t('form2.appeal.ms') },
      { title: t('form2.appeal.mrs') },
      { title: t('form2.appeal.miss') },
    ],
    [t]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex flex-col items-center gap-6">
      <h2 className="text-[42px] max-[1024px]:text-[35px] max-[768px]:text-[24px] font-bold text-center">
        {t('sub_title')}
      </h2>

      {/* Main Form Card */}
      <div className="bg-white/95 backdrop-blur-md w-full rounded-[2rem] shadow-2xl p-6 md:p-10 lg:p-12 text-[#16372D] relative z-40 flex flex-col gap-10 border border-white/20">

        <DestinationsSection
          control={control}
          errors={errors}
          destinations={data?.data || (data as unknown as DestinationCard[])}
          isSuccess={isSuccess}
          t={t}
        />

        <TripBasicsSection
          control={control}
          errors={errors}
          hotelOptions={hotelOptions}
          t={t}
          lang={lang}
          onCustomTourToggle={() => setShowCustomTourForm(true)}
        />
      </div>

      {/* Custom Tour Request Button */}
      {!showCustomTourForm && (
        <>
          <div className="hidden md:flex w-full flex-col items-center gap-4">
            <p className="text-center text-white">
              {t('customTour.noToursTitle')} {t('customTour.noToursText')}
            </p>
            <Button
              type="button"
              onClick={() => setShowCustomTourForm(true)}
              className="px-8 py-4 bg-gradient-to-r from-[#27A430] to-[#1f8a26] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              {t('customTour.button')}
            </Button>
          </div>

          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-[#16372D] to-[#16372D]/95 backdrop-blur-md border-t border-white/10">
            <Button
              type="button"
              onClick={() => setShowCustomTourForm(true)}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#27A430] to-[#1f8a26] text-white font-bold rounded-2xl shadow-lg"
            >
              {t('customTour.button')}
            </Button>
          </div>
        </>
      )}

      {showCustomTourForm && (
        <>
          <h2 className="text-[42px] max-[1024px]:text-[30px] max-[550px]:text-[24px] font-bold text-center">
            {t('form2.title')}
          </h2>

          <PersonalInfoSection
            control={control}
            errors={errors}
            setValue={setValue}
            travellerTypes={travellerTypes}
            appealOptions={appealOptions}
            t={t}
            lang={lang}
          />

          <ContactSection
            control={control}
            errors={errors}
            t={t}
          />

          <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 flex flex-col gap-6 border border-white/20 relative z-40">
            <Checkbox
              label={tErrors.rich('common.termsAcceptance', {
                terms: (chunks) => (
                  <Link
                    href={`/${locale}/term-and-conditions-of-booking-tours`}
                    className="text-[#009F65] hover:underline font-medium"
                    target="_blank"
                  >
                    {chunks}
                  </Link>
                ),
                privacy: (chunks) => (
                  <Link
                    href={`/${locale}/privacy-policy`}
                    className="text-[#009F65] hover:underline font-medium"
                    target="_blank"
                  >
                    {chunks}
                  </Link>
                ),
              })}
              checked={!!token}
              onChange={() => handleRecaptcha()}
              labelClassName="flex-wrap gap-x-1 text-sm"
            />

            <Button
              type="submit"
              disabled={isSubmitting || !token}
              color="primary"
              className="px-8 py-5 text-lg font-bold bg-gradient-to-r from-[#27A430] to-[#1f8a26] hover:from-[#1f8a26] hover:to-[#187a1f] shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isSubmitting ? <Loader /> : t('form2.submit')}
            </Button>
          </div>
        </>
      )}
    </form >
  );
};
