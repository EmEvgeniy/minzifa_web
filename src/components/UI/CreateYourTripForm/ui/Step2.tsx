import { cn } from '@/utils/utils';
import Image from 'next/image';
import { useState } from 'react';

const buttons = [
  { id: 1, title: 'Solo', icon: '/Type=Solo.svg' },
  { id: 2, title: 'Couple', icon: '/Type=Couple.svg' },
  { id: 3, title: 'Family', icon: '/Type=Family.svg' },
  { id: 4, title: 'Friends', icon: '/Type=Friend.svg' },
];

const Step2 = () => {
  const [active, setActive] = useState(1);
  const [days, setDays] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setDays(value);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-10 justify-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-left text-xl font-semibold max-[620px]:text-[14px] w-full">
          Who will you share this adventure with?
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
                className={cn('mb-2', active == el.id && 'icon-white')}
              />
              <span className="text-sm font-medium">{el.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-left text-xl font-semibold max-[620px]:text-[14px]">
          How many days are you willing to commit to yourself?
        </h2>
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          value={days}
          onChange={handleChange}
          className="w-full max-w-[300px] bg-white outline-none rounded-[16px] px-3 py-2 max-[920px]:border-[#E2E2E2] max-[920px]:border-2 max-[650px]:max-w-full"
          placeholder="For how many days?"
        />
      </div>
    </div>
  );
};

export default Step2;
