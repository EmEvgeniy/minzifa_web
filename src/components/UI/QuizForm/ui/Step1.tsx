'use client';

import { cn } from '@/utils/utils';
import { StepProps } from '../QuizForm';
import ImageWithFallback from '../../ImageWithFallback/ImageWithFallback';
import { Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { DropdownField } from '../../Form/DropdownField/DropdownField';
import { IoIosCalendar } from 'react-icons/io';

type DestinationType = {
  id: number;
  title: string;
  icon: string;
};

const buttons: DestinationType[] = [
  { id: 1, title: 'Central Asia', icon: '/camel.svg' },
  { id: 2, title: 'Caucasus', icon: '/mountains.svg' },
  { id: 3, title: 'Middle East', icon: '/MiddleEast.svg' },
  { id: 4, title: 'China & Tibet', icon: '/China.svg' },
];

const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Step1 = ({ control, errors, setValue }: StepProps) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonthIndex = now.getMonth();

  const years = Array.from({ length: 2030 - 2025 + 1 }, (_, i) => 2025 + i);

  const monthOptions = years.flatMap((year) =>
    months
      .map((month, monthIndex) => {
        if (year === currentYear && monthIndex < currentMonthIndex) return null;
        return {
          label: `${month} ${year}`,
        };
      })
      .filter(Boolean)
  );

  useEffect(() => {
    if (buttons) {
      setValue?.('whereGo', buttons[0].title);
    }
  }, [setValue]);

  useEffect(() => {
    if (monthOptions) {
      setValue?.('whenGo', monthOptions[0]?.label);
    }
  }, [setValue, monthOptions]);

  return (
    <div className="w-full h-full flex flex-col gap-10 justify-center">
      {/* WHERE */}
      <div className="flex flex-col gap-2">
        <h2 className="text-left text-xl font-semibold max-[620px]:text-[16px]">
          Where do you want to go?
        </h2>

        <div
          className={cn(
            'grid grid-cols-2 md:grid-cols-4 gap-2',
            errors?.whereGo && 'border border-red-500 rounded-xl p-2',
          )}
        >
          {buttons.map((el) => (
            <Controller
              key={el.id}
              control={control}
              name='whereGo'
              render={({ field }) => (
                <button
                  onClick={() => setValue?.('whereGo', el.title)}
                  type="button"
                  className={cn(
                    'group flex flex-col items-center justify-center bg-white hover:bg-[#1e7e24] hover:text-white duration-300 transition-all rounded-2xl shadow-xl p-4 cursor-pointer border-[#E2E2E2] border-[0.3px]',
                    field.value === el.title && 'bg-[#27A430] text-white',
                  )}
                >
                  <ImageWithFallback
                    src={el.icon}
                    alt={el.title}
                    width={100}
                    height={100}
                    priority
                    className={cn(
                      'mb-2 group-hover:invert-100 group-hover:brightness-0 w-[28px] h-[28px] object-contain',
                      field.value === el.title && 'icon-white',
                    )}
                  />
                  <span className="text-sm font-medium">{el.title}</span>
                </button>
              )}
            />

          ))}
        </div>
        {errors?.whereGo && <p className="text-red-500 text-sm">{errors.whereGo?.message}</p>}
      </div>

      {/* WHEN */}
      <div className="flex flex-col gap-2">
        <h2 className="text-left text-xl font-semibold max-[620px]:text-[16px]">
          When do you want to go?
        </h2>
        <Controller
          name="whenGo"
          control={control}
          render={({ field }) => (
            <DropdownField
              value={field.value || undefined}
              onChange={(value) => field.onChange(value)}
              options={monthOptions as { label: string }[]}
              icon={<IoIosCalendar size={24} />}
              error={errors?.whenGo}
              className='max-w-[350px]'
              labelKey='label'
              valueKey='label'
            />
          )}
        />
      </div>
    </div>
  );
};

export default Step1;
