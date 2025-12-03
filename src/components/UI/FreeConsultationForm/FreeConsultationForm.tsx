'use client';

import Banner from '@/assets/img/FreeConBanner.jpg';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { cn } from '@/utils/utils';
import { useSnackStore } from '../../../store/useSnackStore';
import { usePostMutation } from '@/api/post.api';
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
import { OrderTourDetailData } from '@/components/Tour/_types';

type FreeConsultationFormProps = {
  className?: string,
  additionalFormData?: OrderTourDetailData;
}

export default function FreeConsultationForm({ className, additionalFormData }: FreeConsultationFormProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { metrics } = useMetricsStore();
  const { setMessage, setError } = useSnackStore((state) => state);
  const { isReady, getToken } = useRecaptcha();
  const { user } = useAuthStore();
  const schema = freeConsultationFormSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<FreeConsultationFormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      message: '',
      agree: false,
    },
  });

  const { mutate, isPending } = usePostMutation<FreeConsultationFormType, FreeConsultationFormType>(
    ['subscribe-form'],
    () => {
      setMessage(locale == 'en' ? 'Your request was submitted!' : 'Ваш запрос был отправлен!');
      router.push(`/${locale}/thank-you`);
    },
    () => {
      setError(locale == 'en' ? 'Some error was happened' : 'Произошла ошибка');
    },
  );

  const onSubmit = async (data: FreeConsultationFormType) => {
    if (!isReady) {
      return;
    }

    const token = await getToken('free_consultation');

    if (!token) {
      setError(locale == 'en' ? 'Failed to verify reCAPTCHA. Please try again.' : 'Не удалось верифицировать reCAPTCHA. Пожалуйста, попробуйте еще раз.');
      return;
    }

    const formData = {
      ...data,
      recaptchaToken: token,
      ...metrics,
      ...additionalFormData,
    };

    await mutate({
      obj: formData,
      endpoint: 'forms/free-consultation'
    });
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
            {t('FreeForm.title')}
          </h2>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                error={errors.name}
                placeholder={t('FreeForm.name')}
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
                placeholder={t('FreeForm.email')}
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
                placeholder={t('FreeForm.wishes')}
              />
            )}
          />

          <Checkbox
            checked={watch('agree')}
            onChange={(e) => setValue('agree', e.target.checked)}
            label={(
              <div className='text-xs text-white w-full'>
                {t('FreeForm.checkbox.0')}{' '}
                <Link href={`/${locale}/privacy-policy`} className="text-[#27A430]">
                  {t('FreeForm.checkbox.1')}
                </Link>
              </div>
            )}
          />
          <Button
            type="submit"
            disabled={!isReady || isPending || watch('agree') === false}
            color='primary'
            className='px-5 py-4'
          >
            {t('FreeForm.button')}
          </Button>
        </div>
      </div>
    </form>
  );
}
