'use client';
import { usePostMutation } from '@/api/post.api';
import { useLocale, useTranslations } from 'next-intl';
import React, { useCallback, useState } from 'react';
import { useSnackStore } from '../UI/CustomSnackBar/store';

interface SubscribeFormRequest {
  email: string;
}

interface FormResponse {
  form_data: SubscribeFormRequest;
  form_name: string;
}

export const FooterRight = () => {
  const t = useTranslations();
  const lang = useLocale();
  const { setMessage, setError } = useSnackStore((state) => state);
  const [email, setEmail] = useState<string>('');

  const { mutate, isPending } = usePostMutation<FormResponse, SubscribeFormRequest>(
    ['subscribe-form'],
    () => {
      setMessage(lang == 'en' ? 'You was subscribed!' : 'Вы были подписаны!');
      setEmail('');
    },
    () => {
      setError(lang == 'en' ? 'Some error was happened' : 'Произошла ошибка');
    },
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isPending) {
        mutate({
          obj: { email: email },
          endpoint: 'forms/subscribes',
        });
      }
    },
    [email, isPending, mutate],
  );

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="text-[20px]">{t('footer.form_title')}</p>
      <p className="text-[16px]">{t('footer.form_text')}</p>

      <form action="#" className="w-full " onSubmit={handleSubmit}>
        <div className=" flex items-center justify-between rounded-[16px]  gap-5 w-full">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={t('footer.form_pl')}
            className="outline-none focus:outline-none   rounded-[20px] px-3 py-2 text-[#16372D] bg-white w-full"
          />

          <button
            type="submit"
            className="bg-[#27A430] py-[8px] px-[25px] rounded-[20px] text-[16px] "
          >
            {t('footer.form_btn')}
          </button>
        </div>
      </form>

      <p className="text-[16px]">{t('footer.form_b_text')}</p>
    </div>
  );
};
