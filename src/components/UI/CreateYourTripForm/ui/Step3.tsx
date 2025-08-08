import { useQuizStore } from '@/store/quizStore';
import { cn } from '@/utils/utils';
import Image from 'next/image';
import { StepProps } from '../DescForm';

const buttons = [
  { id: 1, title: '3 stars', icon: '/3.svg' },
  { id: 2, title: '4 stars', icon: '/4.svg' },
  { id: 3, title: '5 stars', icon: '/5.svg' },
];

const Step3 = ({ errors = {}, clearError }: StepProps) => {
  const { formData: { budget, accomodation }, setBudget, setAccomodation } = useQuizStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setBudget(value);
      if (clearError) clearError('budget');
    }
  };

  const handleClickAccomodation = (title: string) => {
    setAccomodation(title);
    if (clearError) clearError('accomodation');
  };

  return (
    <div className="w-full h-full flex flex-col gap-10 justify-center">
      <div className="flex flex-col gap-2 max-[920px]:gap-1">
        <h1 className="text-left text-xl font-semibold max-w-[300px] max-[920px]:max-w-full max-[650px]:text-[14px]">
          What kind of budget do you have in mind for traveling?
        </h1>
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          value={budget}
          onChange={handleChange}
          className={cn(
            "w-full max-w-[300px] bg-white outline-none rounded-[16px] px-3 py-3 border-2",
            errors?.budget ? "border-red-500" : "border-[#E2E2E2]",
            "max-[650px]:max-w-full"
          )}
          placeholder="For example: 500 to 2000 $"
        />
        {errors?.budget && <p className="text-red-500 text-sm">{errors.budget}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-left text-xl font-semibold max-w-[300px] max-[920px]:max-w-full max-[650px]:text-[14px]">
          What level of accommodation do you feel comfortable with?
        </h2>
        <div className="flex items-center justify-start gap-2">
          {buttons.map((el) => (
            <div
              key={el.id}
              onClick={() => handleClickAccomodation(el.title)}
              className={cn(
                'bg-white rounded-[16px] px-5 py-3 w-full max-w-[150px] shadow-md cursor-pointer border-2',
                accomodation === el.title ? 'bg-[#27A430] border-[#27A430]' : 'border-[#E2E2E2]',
              )}
            >
              <Image
                src={el.icon}
                width={120}
                height={40}
                alt={`stars ${el.id}`}
                className={cn(accomodation == el.title && 'icon-white')}
              />
            </div>
          ))}
        </div>
        {errors?.accomodation && <p className="text-red-500 text-sm">{errors.accomodation}</p>}
      </div>
    </div>
  );
};

export default Step3;