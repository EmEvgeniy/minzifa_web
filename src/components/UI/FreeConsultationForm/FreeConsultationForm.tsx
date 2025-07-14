'use client';

import Image from 'next/image';
import Banner from '@/assets/img/FreeConBanner.jpg';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { cn } from '@/utils/utils';
import { useSnackStore } from '../CustomSnackBar/store';
import { usePostMutation } from '@/api/post.api';
import { useRouter } from 'next/navigation';
import { PhoneInputComp } from '../PhoneInput';
import { useMetricsStore } from '@/store/useMetricsStore';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(5, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(8, 'Required'),
  message: z.string().optional(),
});

type FreeForm = z.infer<typeof schema>;

export default function FreeConsultationForm({ className }: { className?: string }) {
  const t = useTranslations('FreeForm');
  const locale = useLocale();
  const router = useRouter();
  const { metrics } = useMetricsStore();
  const { setMessage, setError } = useSnackStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<FreeForm>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const { mutate, isPending } = usePostMutation<FreeForm, FreeForm>(
    ['subscribe-form'],
    () => {
      setMessage(locale == 'en' ? 'Your request was submitted!' : 'Ваш запрос был отправлен!');
      router.push(`/${locale}/thank-you`);
    },
    () => {
      setError(locale == 'en' ? 'Some error was happened' : 'Произошла ошибка');
      setMessage('');
    },
  );

  const onSubmit = (data: FreeForm) => {
    mutate({ obj: { ...data, ...metrics }, http: 'forms/free-consultation' });
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
          <Image
            src={Banner}
            quality={100}
            width={585}
            height={536}
            alt={'Minzifa Travel'}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-5 w-full max-w-[434px] p-5 mx-auto my-8 max-[768px]:max-w-full max-[768px]:gap-8 max-[550px]:p-3">
          <h2 className="text-4xl font-semibold text-white max-[768px]:text-[35px] max-[550px]:text-[24px] max-[550px]:text-center">
            {t('title')}
          </h2>
          <input
            {...register('name')}
            className={cn(
              'bg-white w-full text-black rounded-2xl py-[18px] px-2.5',
              errors.name && 'bg-red-400 text-white',
            )}
            placeholder={t('name')}
          />
          <input
            {...register('email')}
            className={cn(
              'bg-white w-full text-black rounded-2xl py-[18px] px-2.5',
              errors.email && 'bg-red-400 text-white',
            )}
            placeholder={t('email')}
          />
          <PhoneInputComp value={watch('phone')} onChange={(value) => setValue('phone', value)} />
          <textarea
            {...register('message')}
            className={cn(
              'bg-white w-full min-h-[145px] text-black rounded-2xl py-[18px] px-2.5',
              errors.message && 'bg-red-400 text-white',
            )}
            placeholder={t('wishes')}
          />
          <button
            disabled={!isValid || isPending}
            className={cn(
              'bg-[#27A430] text-white font-semibold text-base rounded-2xl py-4',
              (!isValid || isPending) && 'bg-gray-300 touch-none',
            )}
          >
            {t('button')}
          </button>
          <div className="flex flex-row gap-2 mx-auto max-[768px]:text-[10px]">
            <input type="checkbox" id="checkbox" />
            <label htmlFor={'checkbox'} className="text-white text-base font-normal text-[12px]">
              {t('checkbox.0')}{' '}
              <Link href={`/${locale}/privacy-policy`} className="text-[#27A430]">
                {t('checkbox.1')}
              </Link>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
