'use client';

import { PhoneInputComp } from '../../PhoneInput';
import { StepProps } from '../QuizForm';
import { Checkbox, Input } from '../../Form';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { FormNameEnum } from '@/constants';

const Step4 = ({ errors, setValue, watch, token, getToken }: StepProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const name = watch?.('name') || '';
  const email = watch?.('email') || '';
  const phone = watch?.('phone') || '';

  const handleRecaptcha = async () => {
    if (getToken) {
      await getToken(FormNameEnum.QUIZ_FORM);
    }
  };

  return (
    <div className="w-full flex flex-col gap-10 items-center justify-center h-full">
      <div className="w-full flex flex-col gap-5">
        <h2 className="text-xl font-semibold text-left w-full">Get 2–3 options in 24h</h2>
        <div className="flex flex-col gap-3 w-full">
          <Input
            value={name}
            onChange={(e) => {
              setValue?.('name', e.target.value);
            }}
            placeholder="First Name*"
            error={errors?.name}
          />

          <Input
            value={email}
            onChange={(e) => {
              setValue?.('email', e.target.value);
            }}
            placeholder="Email*"
            error={errors?.email}
          />

          <PhoneInputComp
            value={phone}
            onChange={(value) => {
              setValue?.('phone', value);
            }}
            error={errors?.phone}
          />

          <Checkbox
            label={t.rich('confirm_form_text', {
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
            onChange={handleRecaptcha}
            labelClassName='flex-wrap gap-x-1 text-sm text-gray-500 hover:text-gray-700'
          />
        </div>
      </div>
    </div>
  );
};

export default Step4;
