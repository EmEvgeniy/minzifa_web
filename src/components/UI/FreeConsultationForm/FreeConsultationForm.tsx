'use client';

import Image from 'next/image';
import Banner from '../../../assets/img/FreeConBanner.jpg';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { cn } from '@/utils/utils';
import { useSnackStore } from '../CustomSnackBar/store';
import { usePostMutation } from '@/api/post.api';
import { FormEvent, useCallback, useState } from 'react';

interface SubscribeFormRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const FreeConsultationForm = ({ className }: { className?: string }) => {
  const t = useTranslations('FreeForm');
  const locale = useLocale();
  const [valid, setValid] = useState<boolean>(false);
  const [formData, setFormData] = useState<SubscribeFormRequest>({
    name: '',
    email: '',
    phone: '+99890',
    message: '',
  });

  const { setMessage, setError } = useSnackStore((state) => state);

  const { mutate, isPending } = usePostMutation<SubscribeFormRequest, SubscribeFormRequest>(
    ['subscribe-form'],
    () => {
      setMessage(locale == 'en' ? 'Your request was submitted!' : 'Ваш запрос был отправлен!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setValid(false);
    },
    () => {
      setError(locale == 'en' ? 'Some error was happened' : 'Произошла ошибка');
      setMessage('');
      setValid(true);
    },
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isPending) {
        mutate({
          obj: formData,
          http: 'forms/free-consultation',
        });
      }
    },
    [formData, isPending, mutate],
  );

  return (
    <form
      className={cn(
        className,
        'bg-[#16372D] w-full h-full rounded-2xl overflow-hidden my-[70px] max-[768px]:my-[40px]',
      )}
      onSubmit={(e) => {
        e.preventDefault();
        if (formData.email && formData.name && formData.phone) {
          handleSubmit(e);
        } else {
          setValid(true);
        }
      }}
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
        <div className="flex flex-col gap-5 w-full max-w-[434px] p-5 mx-auto my-8  max-[768px]:max-w-full max-[768px]:gap-8 max-[550px]:p-3">
          <h2 className="text-4xl font-semibold text-white max-[768px]:text-[35px] max-[550px]:text-[24px] max-[550px]:text-center">
            {t('title')}
          </h2>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className={cn(
              'bg-white w-full text-black rounded-2xl py-[18px] px-2.5 max-[768px]:py-2 max-[768px]:text-[16px]',
              valid && 'bg-red-400 text-white',
            )}
            placeholder={t('name')}
          />
          <input
            type="text"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            className={cn(
              'bg-white w-full text-black rounded-2xl py-[18px] px-2.5 max-[768px]:py-2 max-[768px]:text-[16px]',
              valid && 'bg-red-400 text-white',
            )}
            placeholder={t('email')}
          />
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            className={cn(
              'bg-white w-full text-black rounded-2xl py-[18px] px-2.5 max-[768px]:py-2 max-[768px]:text-[16px]',
              valid && 'bg-red-400 text-white',
            )}
            placeholder={t('phone')}
          />
          <textarea
            name=""
            id=""
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            className={cn(
              'bg-white w-full min-h-[145px] text-black rounded-2xl py-[18px] px-2.5 max-[768px]:py-2 max-[768px]:text-[16px]',
              valid && 'bg-red-400 text-white',
            )}
            placeholder={t('wishes')}
          ></textarea>
          <button
            disabled={!(formData.email && formData.phone && formData.name)}
            className={cn(
              'bg-[#27A430] text-white font-semibold text-base rounded-2xl py-4 max-[768px]:py-2 max-[768px]:text-[16px]',
              !(formData.email && formData.phone && formData.name) && 'bg-gray-300 touch-none',
              valid && 'bg-red-400',
            )}
          >
            {t('button')}
          </button>
          <div className="flex flex-row gap-2 mx-auto  max-[768px]:text-[10px]">
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
};
