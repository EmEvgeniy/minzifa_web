'use client';
import { cn } from '@/utils/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import MonthYearSelect from './MonthSelect';
import { useQuizStore } from '@/store/quizStore';
import { StepProps } from '../DescForm';

const buttons = [
  { id: 1, title: 'Central Asia', icon: '/camel.svg' },
  { id: 2, title: 'Caucasus', icon: '/mountains.svg' },
  { id: 3, title: 'Middle East', icon: '/MiddleEast.svg' },
  { id: 4, title: 'China & Tibet', icon: '/China.svg' },
];

const Step1 = ({ errors = {}, clearError }: StepProps) => {
  const [active, setActive] = useState(1);
  const { setWhereGo } = useQuizStore();

  const handleClickWhereGo = (id: number, index: number) => {
    setActive(id);
    setWhereGo(buttons[index].title);
    if (clearError) clearError('whereGo');
  };

  useEffect(() => {
    setWhereGo(buttons[0].title);
  }, [setWhereGo]);

  return (
    <div className="w-full h-full flex flex-col gap-10 justify-center max-[920px]:justify-start">
      {/* WHERE */}
      <div className="flex flex-col gap-2">
        <h2 className="text-left text-xl font-semibold max-[620px]:text-[16px]">
          Where do you want to go?
        </h2>

        <div
          className={cn(
            'flex items-center justify-between gap-2 w-full max-[620px]:grid max-[620px]:grid-cols-2',
            errors.whereGo && 'border border-red-500 rounded-xl p-2'
          )}
        >
          {buttons.map((el, index) => (
            <button
              key={el.id}
              onClick={() => handleClickWhereGo(el.id, index)}
              className={cn(
                'group flex flex-col w-full items-center justify-center bg-white hover:bg-[#1e7e24] hover:text-white duration-300 transition-all rounded-2xl shadow-xl p-4 cursor-pointer border-[#E2E2E2] border-[0.3px]',
                active === el.id && 'bg-[#27A430] text-white'
              )}
            >
              <Image
                src={el.icon}
                width={28}
                height={28}
                alt={el.title}
                className={cn(
                  'mb-2 group-hover:invert-100 group-hover:brightness-0',
                  active === el.id && 'icon-white'
                )}
              />
              <span className="text-sm font-medium">{el.title}</span>
            </button>
          ))}
        </div>
        {errors.whereGo && (
          <p className="text-red-500 text-sm">{errors.whereGo}</p>
        )}
      </div>

      {/* WHEN */}
      <div className="flex flex-col gap-2">
        <h2 className="text-left text-xl font-semibold max-[620px]:text-[16px]">
          When do you want to go?
        </h2>
        <div className={cn(errors.whenGo && 'border border-red-500 rounded-xl p-2')}>
          <MonthYearSelect onChange={() => clearError && clearError('whenGo')} />
        </div>
        {errors.whenGo && (
          <p className="text-red-500 text-sm">{errors.whenGo}</p>
        )}
      </div>
    </div>
  );
};

export default Step1;