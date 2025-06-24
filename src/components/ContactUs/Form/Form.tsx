'use client';
import { usePostMutation } from '@/api/post.api';
import React, { useCallback, useState } from 'react';
import { ContactUsRequest, ContactUsResponse } from './_types';
import { Button, Checkbox } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useSnackStore } from '@/components/UI/CustomSnackBar/store';
import { useRouter } from 'next/router';

export const Form = () => {
  const t = useTranslations();
  const [formData, setFormData] = useState<ContactUsRequest>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const { setMessage, setError } = useSnackStore((state) => state);
  const lang = useLocale();
  const router = useRouter();

  const { mutate, isPending } = usePostMutation<ContactUsResponse, ContactUsRequest>(
    ['contact-us'],
    () => {
      setMessage(
        lang == 'en'
          ? 'Your request has been successfully sent.'
          : 'Ваша заявка была успешно отправлена',
      );
      setFormData({ name: '', email: '', phone: '', message: '' });
      router.push(`/${lang}/thank-you`);
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
          obj: formData,
          http: 'forms/contact-us',
        });
      }
    },
    [formData, isPending, mutate],
  );
  return (
    <div className="mx-auto w-full max-[768px]:max-w-full h-full">
      <h2 className="font-bold mb-4 text-[42px] tracking-tight text-white max-[768px]:text-[30px] max-[768px]:text-center">
        {t('contact_us.form_title')}
      </h2>
      <form
        action="#"
        className="space-y-8 max-[768px]:max-w-full max-[768px]:space-y-5"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-[18px] border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
          placeholder={t('contact_us.pl')}
          required
        />
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-[18px] border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
          placeholder={t('contact_us.pl2')}
          required
        />
        <input
          type="phone"
          id="text"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-[18px] border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm"
          placeholder={t('contact_us.pl3')}
          required
        />
        <textarea
          id="message"
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-[18px] border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900 shadow-sm"
          placeholder={t('contact_us.pl4')}
        ></textarea>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
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
