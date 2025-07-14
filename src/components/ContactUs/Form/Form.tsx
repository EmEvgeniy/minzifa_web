'use client';
import { usePostMutation } from '@/api/post.api';
import { Button, Checkbox } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useSnackStore } from '@/components/UI/CustomSnackBar/store';
import { useRouter } from 'next/navigation';
import { PhoneInputComp } from '@/components/UI';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/utils/utils';

const schema = z.object({
  name: z.string().min(5, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(8, 'Required'),
  message: z.string().optional(),
});

type FreeForm = z.infer<typeof schema>;

export const Form = () => {
  const t = useTranslations();
  const { setMessage, setError } = useSnackStore((state) => state);
  const lang = useLocale();
  const router = useRouter();
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
    ['contact-us'],
    () => {
      setMessage(
        lang == 'en'
          ? 'Your request has been successfully sent.'
          : 'Ваша заявка была успешно отправлена',
      );
      router.push(`/${lang}/thank-you`);
    },
    () => {
      setError(lang == 'en' ? 'Some error was happened' : 'Произошла ошибка');
    },
  );

  const onSubmit = (data: FreeForm) => {
    mutate({ obj: data, http: 'forms/contact-us' });
  };

  return (
    <div className="mx-auto w-full max-[768px]:max-w-full h-full">
      <h2 className="font-bold mb-4 text-[42px] tracking-tight text-white max-[768px]:text-[30px] max-[768px]:text-center">
        {t('contact_us.form_title')}
      </h2>
      <form
        className="space-y-8 max-[768px]:max-w-full max-[768px]:space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          id="name"
          {...register('name')}
          className={cn(
            'focus:ring-primary-500 focus:border-primary-500 block w-full rounded-[18px] border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm',
            errors.name && 'bg-red-400 text-white',
          )}
          placeholder={t('contact_us.pl')}
        />
        <input
          type="email"
          id="email"
          {...register('email')}
          className={cn(
            'focus:ring-primary-500 focus:border-primary-500 block w-full rounded-[18px] border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm',
            errors.name && 'bg-red-400 text-white',
          )}
          placeholder={t('contact_us.pl2')}
        />
        <PhoneInputComp value={watch('phone')} onChange={(value) => setValue('phone', value)} />
        <textarea
          id="message"
          rows={6}
          {...register('message')}
          className={cn(
            'focus:ring-primary-500 focus:border-primary-500 block w-full rounded-[18px] border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm',
            errors.name && 'bg-red-400 text-white',
          )}
          placeholder={t('contact_us.pl4')}
        ></textarea>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={!isValid || isPending}
          sx={{ width: '100%', borderRadius: '16px', minHeight: 45 }}
        >
          {t('contact_us.btn')}
        </Button>
      </form>
      <p className="flex w-full items-center justify-start gap-2 px-10 py-4 text-sm text-white [@media(max-width:550px)]:px-0">
        <Checkbox id="check" defaultChecked color="primary" />
        <label htmlFor="check">
          {t('contact_us.pl5')} <span>{t('contact_us.pr')}</span>
        </label>
      </p>
    </div>
  );
};
