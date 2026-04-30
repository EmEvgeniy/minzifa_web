'use client';

import { cn } from '@/utils/utils';
import { StepProps } from '../QuizForm';
import ImageWithFallback from '../../ImageWithFallback/ImageWithFallback';
import { Input } from '../../Form';
import { Controller } from 'react-hook-form';

const buttons = [
  { id: 1, title: '3 stars', icon: '/3.svg' },
  { id: 2, title: '4 stars', icon: '/4.svg' },
  { id: 3, title: '5 stars', icon: '/5.svg' },
];

const Step3 = ({ control, errors, setValue, watch }: StepProps) => {
  const accomodation = watch?.('accomodation') || '';

  const handleClickAccomodation = (title: string) => {
    setValue?.('accomodation', title);
  };

  return (
    <div className="w-full h-full flex flex-col gap-10 justify-center">
      <div className="flex flex-col gap-2 max-[920px]:gap-1">
        <h2 className="text-left text-xl font-semibold max-w-[300px] max-[920px]:max-w-full max-[650px]:text-[14px]">
          What kind of budget do you have in mind for traveling?
        </h2>
        <Controller
          name='budget'
          control={control}
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              error={!!errors?.budget}
              wrapperClassName='max-w-[350px]'
              placeholder="Enter your budget (e.g. 1000 / 8000+)"
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-left text-xl font-semibold max-w-[300px] max-[920px]:max-w-full max-[650px]:text-[14px]">
          What level of accommodation do you feel comfortable with?
        </h2>
        <div
          className={cn(
            'grid grid-cols-2 md:grid-cols-3 gap-2 max-w-[400px]'
          )}
        >
          {buttons.map((el) => (
            <div
              key={el.id}
              onClick={() => handleClickAccomodation(el.title)}
              className={cn(
                'bg-white rounded-2xl px-6 py-4 w-full flex items-center justify-center shadow-md cursor-pointer border-2',
                accomodation === el.title ? 'bg-[#27A430] border-[#27A430]' : 'border-[#E2E2E2]',
              )}
            >
              <ImageWithFallback
                src={el.icon}
                width={120}
                height={40}
                priority
                alt={`stars ${el.id}`}
                className={cn("w-[80px] h-[15px] object-contain", accomodation == el.title && 'icon-white')}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step3;
