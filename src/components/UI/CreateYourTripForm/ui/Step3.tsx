import { cn } from '@/utils/utils';
import Image from 'next/image';
import { useState } from 'react';

const buttons = [
  { id: 1, title: '3 stars', icon: '/3.svg' },
  { id: 2, title: '4 stars', icon: '/4.svg' },
  { id: 3, title: '5 stars', icon: '/5.svg' },
];

const Step3 = () => {
  const [stars, setStars] = useState('');
  const [price, setPrice] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPrice(value);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-10 justify-center">
      <div className="flex flex-col gap-7 max-[920px]:gap-5">
        <h1 className="text-left text-xl font-semibold max-w-[300px] max-[920px]:max-w-full max-[650px]:text-[14px]">
          What kind of budget do you have in mind for traveling?
        </h1>
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          value={price}
          onChange={handleChange}
          className="w-full max-w-[300px] bg-white outline-none rounded-[16px] px-3 py-3 max-[920px]:border-[#E2E2E2] max-[920px]:border-2 max-[650px]:max-w-full"
          placeholder="For example: 500 to 2000 $"
        />
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="text-left text-xl font-semibold max-w-[300px] max-[920px]:max-w-full max-[650px]:text-[14px]">
          What level of accommodation do you feel comfortable with?
        </h2>
        <div className="flex items-center justify-start gap-2">
          {buttons.map((el) => (
            <div
              key={el.id}
              onClick={() => setStars(el.title)}
              className={cn(
                'bg-white rounded-[16px] px-5 py-3 w-full max-w-[150px] shadow-md cursor-pointer max-[920px]:shadow-[0px_4px_18px_0px_#0000002B] max-[920px]:bg-[rgba(255,255, 255, 1)]',
                stars === el.title && 'bg-[#27A430]',
              )}
            >
              <Image
                src={el.icon}
                width={120}
                height={40}
                alt={`stars ${el.id}`}
                className={cn(stars == el.title && 'icon-white')}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step3;
