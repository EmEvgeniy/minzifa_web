'use client';

import { cn } from '@/utils/utils';
import { useEffect } from 'react';
import { StepProps } from '../QuizForm';
import ImageWithFallback from '../../ImageWithFallback/ImageWithFallback';
import { Input } from '../../Form';
import { Controller } from 'react-hook-form';

type TravellerType = {
  id: number;
  title: string;
  icon: string;
}

const buttons: TravellerType[] = [
  { id: 1, title: 'Solo', icon: '/Type=Solo.svg' },
  { id: 2, title: 'Couple', icon: '/Type=Couple.svg' },
  { id: 3, title: 'Family', icon: '/Type=Family.svg' },
  { id: 4, title: 'Friends', icon: '/Type=Friend.svg' },
];

const Step2 = ({ control, errors, setValue }: StepProps) => {
  const handleClickPeople = (TravellerType: TravellerType) => {
    setValue?.('howManyPeople', TravellerType.title);
  };

  useEffect(() => {
    if (buttons) {
      setValue?.('howManyPeople', buttons[0].title);
    }
  }, [setValue]);

  return (
    <div className="w-full h-full flex flex-col gap-10 justify-center">
      {/* WHO */}
      <div className="flex flex-col gap-2">
        <h2 className="text-left text-xl font-semibold max-[620px]:text-[14px] w-full">
          Who will you share this adventure with?
        </h2>

        <div
          className={cn(
            'grid grid-cols-2 md:grid-cols-4 gap-2'
          )}
        >
          {buttons.map((el) => (
            <Controller
              key={el.id}
              control={control}
              name="howManyPeople"
              defaultValue={buttons[0].title}
              render={({ field }) => (
                <button
                  onClick={() => handleClickPeople(el)}
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
      </div>

      {/* DAYS */}
      <div className="flex flex-col gap-2">
        <h2 className="text-left text-xl font-semibold max-[620px]:text-[14px]">
          How many days are you willing to commit to yourself?
        </h2>
        <Controller
          control={control}
          name="howManyDays"
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              error={errors?.howManyDays}
              placeholder="For how many days?"
              wrapperClassName="max-w-[300px]"
            />
          )}
        />
      </div>
    </div>
  );
};

export default Step2;
