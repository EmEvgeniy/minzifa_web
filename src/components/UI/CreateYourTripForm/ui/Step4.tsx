'use client';

import React from 'react';
import { PhoneInputComp } from '../../PhoneInput';
import { cn } from '@/utils/utils';
import { StepProps } from '../QuizForm';
const Step4 = ({ errors, setValue, watch }: StepProps) => {
  const name = watch?.('name') || '';
  const email = watch?.('email') || '';
  const phone = watch?.('phone') || '';

  return (
    <div className="w-full flex flex-col gap-10 items-center justify-center h-full">
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-xl font-semibold text-left w-full">Get 2–3 options in 24h</h1>
        <div className="flex flex-col gap-3 w-full">
          <div>
            <input
              value={name}
              onChange={(e) => {
                setValue?.('name', e.target.value);
              }}
              className={cn(
                'outline-none bg-white w-full px-3 py-3 rounded-[16px] border-2',
                errors?.name ? 'border-red-500' : 'border-[#D8DADC]',
              )}
              placeholder="First Name*"
            />
            {errors?.name && <p className="text-red-500 text-sm">{errors.name?.message}</p>}
          </div>

          <div>
            <input
              value={email}
              onChange={(e) => {
                setValue?.('email', e.target.value);
              }}
              className={cn(
                'outline-none bg-white w-full px-3 py-3 rounded-[16px] border-2',
                errors?.email ? 'border-red-500' : 'border-[#D8DADC]',
              )}
              placeholder="Email*"
            />
            {errors?.email && <p className="text-red-500 text-sm">{errors.email?.message}</p>}
          </div>

          <div>
            <PhoneInputComp
              value={phone}
              onChange={(value) => {
                setValue?.('phone', value);
              }}
            />
            {errors?.phone && <p className="text-red-500 text-sm">{errors.phone?.message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
