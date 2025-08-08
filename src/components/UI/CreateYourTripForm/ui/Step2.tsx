import { useQuizStore } from '@/store/quizStore';
import { cn } from '@/utils/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { StepProps } from '../DescForm';

const buttons = [
  { id: 1, title: 'Solo', icon: '/Type=Solo.svg' },
  { id: 2, title: 'Couple', icon: '/Type=Couple.svg' },
  { id: 3, title: 'Family', icon: '/Type=Family.svg' },
  { id: 4, title: 'Friends', icon: '/Type=Friend.svg' },
];

const Step2 = ({ errors = {}, clearError }: StepProps) => {
  const [active, setActive] = useState(1);

  const {
    formData: { howManyDays },
    setHowManyPeople,
    setHowManyDays
  } = useQuizStore();

  const handleClickPeople = (id: number) => {
    setActive(id);
    setHowManyPeople(buttons[id - 1].title);
    if (clearError) clearError('howManyPeople');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setHowManyDays(value);
      if (clearError) clearError('howManyDays');
    }
  };

  useEffect(() => {
    setHowManyPeople(buttons[0].title);
  }, [setHowManyPeople]);

  return (
    <div className="w-full h-full flex flex-col gap-10 justify-center">
      {/* WHO */}
      <div className="flex flex-col gap-2">
        <h2 className="text-left text-xl font-semibold max-[620px]:text-[14px] w-full">
          Who will you share this adventure with?
        </h2>

        <div
          className={cn(
            'flex items-center justify-between gap-2 w-full max-[620px]:grid max-[620px]:grid-cols-2',
            errors.howManyPeople && 'border border-red-500 rounded-xl p-2'
          )}
        >
          {buttons.map((el) => (
            <button
              key={el.id}
              onClick={() => handleClickPeople(el.id)}
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
        {errors.howManyPeople && (
          <p className="text-red-500 text-sm">{errors.howManyPeople}</p>
        )}
      </div>

      {/* DAYS */}
      <div className="flex flex-col gap-2">
        <h2 className="text-left text-xl font-semibold max-[620px]:text-[14px]">
          How many days are you willing to commit to yourself?
        </h2>
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          value={howManyDays}
          onChange={handleChange}
          className={cn(
            'w-full max-w-[300px] bg-white outline-none rounded-[16px] px-3 py-2 border-2 max-[650px]:max-w-full',
            errors.howManyDays ? 'border-red-500' : 'border-[#E2E2E2]'
          )}
          placeholder="For how many days?"
        />
        {errors.howManyDays && (
          <p className="text-red-500 text-sm">{errors.howManyDays}</p>
        )}
      </div>
    </div>
  );
};

export default Step2;