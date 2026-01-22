'use client';

import Banner from '@/assets/img/FreeConBanner.jpg';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { cn } from '@/utils/utils';
import { useSnackStore } from '../../../store/useSnackStore';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { useRouter } from 'next/navigation';
import { PhoneInputComp } from '../PhoneInput';
import { useMetricsStore } from '@/store/useMetricsStore';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';
import { freeConsultationFormSchema, FreeConsultationFormType } from '@/validation/freeConsultationFormSchema';
import { Checkbox, Input, Textarea } from '../Form';
import Button from '../Button/Button';
import { useAuthStore } from '@/store';
import { useOrderTourDetailStore } from '@/store/orderTourDetailStore';
import { FormNameEnum } from '@/constants';


type FreeConsultationFormProps = {
  className?: string,
}

export default function FreeConsultationForm({ className }: FreeConsultationFormProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { metrics } = useMetricsStore();
  const { setMessage, setError } = useSnackStore((state) => state);
  const { getToken, token } = useRecaptcha();
  const { user } = useAuthStore();
  const schema = freeConsultationFormSchema(t);

  const { additionalFormData } = useOrderTourDetailStore();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FreeConsultationFormType>({
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
      setMessage(locale == 'en' ? 'Your request was submitted!' : 'Ваш запрос был отправлен!');
      router.push(`/${locale}/thank-you`);
    },
    onError: () => {
      setError(locale == 'en' ? 'Some error was happened' : 'Произошла ошибка');
    },
  });

  const handleRecaptcha = async () => await getToken(FormNameEnum.FREE_CONSULTATION);

  const onSubmit = async (data: FreeConsultationFormType) => {

    const formData = {
      ...data,
      ...metrics,
      ...additionalFormData,
      recaptchaToken: token,
    };

    await submitForm(FormNameEnum.FREE_CONSULTATION, formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        className,
        'bg-[#16372D] w-full h-full rounded-2xl overflow-hidden my-[70px] max-[768px]:my-[40px]',
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-[550px]:justify-items-center max-[550px]:items-center max-[550px]:gap-0">
        <div className="relative w-full h-full block max-[768px]:hidden">
          <div
            className="absolute inset-0 z-10 pointer-events-none bg-[#16372D]"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 75%, black 90%)',
              maskImage: 'linear-gradient(to right, transparent 75%, black 90%)',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          />
          <ImageWithFallback
            src={Banner}
            width={585}
            height={536}
            alt={'Minzifa Travel'}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-5 w-full max-w-[434px] p-5 mx-auto my-8 max-[768px]:max-w-full max-[768px]:gap-8 max-[550px]:p-3">
          <h2 className="text-4xl font-semibold text-white max-[768px]:text-[35px] max-[550px]:text-[24px] max-[550px]:text-center">
            {t('freeConsultation.title')}
          </h2>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                error={errors.name}
                placeholder={t('freeConsultation.name')}
                className='px-5 py-4'
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                error={errors.email}
                placeholder={t('freeConsultation.email')}
                className='px-5 py-4'
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInputComp
                {...field}
                error={errors.phone}
                inputClass='!px-5 !py-4 !pl-10'
              />
            )}
          />
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                error={errors.message}
                className='px-5 py-4'
                placeholder={t('freeConsultation.wishes')}
              />
            )}
          />

          <Checkbox
            label={t.rich('common.termsAcceptance', {
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
            labelClassName='flex-wrap gap-x-1 text-sm text-white/80 hover:text-white'
          />

          <Button
            type="submit"
            disabled={isSubmitting || !token}
            color='primary'
            className='px-5 py-4'
          >
            {t('freeConsultation.button')}
          </Button>
        </div>
      </div>
    </form>
  );
}
