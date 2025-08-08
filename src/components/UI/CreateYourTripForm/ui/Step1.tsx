'use client';
import { cn } from '@/utils/utils';
import Image from 'next/image';
import { useState } from 'react';
import MonthYearSelect from './MonthSelect';

const buttons = [
  { id: 1, title: 'Central Asia', icon: '/camel.svg' },
  { id: 2, title: 'Caucasus', icon: '/mountains.svg' },
  { id: 3, title: 'Middle East', icon: '/MiddleEast.svg' },
  { id: 4, title: 'China & Tibet', icon: '/China.svg' },
];

const Step1 = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="w-full h-full flex flex-col gap-10 justify-center max-[920px]:justify-start">
      <div className="flex flex-col gap-3">
        <h1 className="text-left text-xl font-semibold max-[620px]:text-[16px]">
          Where do you want to go?
        </h1>

        <div className="flex items-center justify-between gap-2 w-full max-[620px]:grid max-[620px]:grid-cols-2 ">
          {buttons.map((el) => (
            <button
              key={el.id}
              onClick={() => setActive(el.id)}
              className={cn(
                'flex flex-col w-full items-center justify-center bg-white rounded-2xl shadow-xl p-4  transition cursor-pointer max-[650px]:p-3 max-[920px]:border-[#E2E2E2] max-[920px]:border-[0.3px] max-[920px]:shadow-[0px_4px_18px_0px_#0000002B]',
                active === el.id && 'bg-[#27A430] text-white',
              )}
            >
              <Image
                src={el.icon}
                width={28}
                height={28}
                alt={el.title}
                className={cn('mb-2', active == el.id && 'icon-white', 'max-[650px]:w-[23px]')}
              />
              <span className="text-sm font-medium max-[420px]:text-[10px]">{el.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-left text-xl font-semibold max-[620px]:text-[16px]">
          When do you want to go?
        </h2>
        <MonthYearSelect />
      </div>
    </div>
  );
};

export default Step1;
