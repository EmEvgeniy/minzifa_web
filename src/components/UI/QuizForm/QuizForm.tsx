'use client';

import { ReactNode, useCallback, useState } from 'react';
import anna from '@/assets/img/CreateYourTrip.jpg';
import Step1 from './ui/Step1';
import Step2 from './ui/Step2';
import Step3 from './ui/Step3';
import Step4 from './ui/Step4';
import { cn } from '@/utils/utils';
import { useSnackStore } from '../../../store/useSnackStore';
import { useRouter } from 'next/navigation';
import { useMetricsStore } from '@/store/useMetricsStore';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { useForm, Control, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { quizFormSchema, QuizFormType } from '@/validation/quizFormSchema';
import { useFormSubmit } from '@/hooks';
import Button from '../Button/Button';
import { FormNameEnum } from '@/constants';

type QuizFormProps = {
  className?: string;
  popupClose?: () => void;
  locale?: string;
};

type Step = {
  bubbleText: string;
  title: string;
  placeholder?: string;
  render: () => ReactNode;
};

export interface StepProps {
  control: Control<QuizFormType>;
  errors?: FieldErrors<QuizFormType>;
  setValue?: UseFormSetValue<QuizFormType>;
  watch?: UseFormWatch<QuizFormType>;
  token?: string;
  getToken?: (action: string) => Promise<void>;
}

export default function QuizForm({ className, popupClose, locale }: QuizFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const t = useTranslations();
  const router = useRouter();
  const { metrics } = useMetricsStore();
  const { token, getToken } = useRecaptcha();

  const schema = quizFormSchema(t);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
    trigger,
  } = useForm<QuizFormType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      whereGo: "",
      whenGo: "",
      howManyPeople: "",
      howManyDays: "",
      budget: "",
      accomodation: "",
      name: "",
      email: "",
      phone: "",
      recaptchaToken: "",
    },
  });

  const getStepFields = (stepIndex: number): (keyof QuizFormType)[] => {
    switch (stepIndex) {
      case 0:
        return [];
      case 1:
        return [];
      case 2:
        return [];
      case 3:
        return ['name', 'email', 'phone'];
      default:
        return [];
    }
  };

  const steps: Step[] = [
    {
      bubbleText: 'Pick destination(s) and your travel month',
      title: 'Where do you want to go?',
      render: () => <Step1 control={control} errors={errors} setValue={setValue} watch={watch} />,
    },
    {
      bubbleText: "Who's traveling and for how long?",
      title: 'Who will you share this adventure with?',

      render: () => <Step2 control={control} errors={errors} setValue={setValue} watch={watch} />,
    },
    {
      bubbleText: 'Budget range & hotel level',
      title: 'What kind of budget do you have in mind for traveling?',
      render: () => <Step3 control={control} errors={errors} setValue={setValue} watch={watch} />,
    },
    {
      bubbleText: 'Where should we send 2–3 options within 24h?',
      title: 'Get 2–3 options in 24h',
      render: () => <Step4 control={control} errors={errors} setValue={setValue} watch={watch} token={token} getToken={getToken} />,
    },
  ];

  const { setMessage, setError } = useSnackStore((state) => state);

  const { isSubmitting, submitForm } = useFormSubmit({
    onSuccess() {
      setMessage('Your request was submitted!');
      popupClose?.();
      router.push(`/${locale}/thank-you`);
    },
    onError() {
      setError('Some error was happened');
    },
  });


  /** Следующий шаг с проверкой */
  const nextStep = useCallback(async () => {
    const fieldsToValidate = getStepFields(currentStep);
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      if (currentStep < steps.length - 1) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
          setIsTransitioning(false);
        }, 300);
      }
    }
  }, [currentStep, trigger, steps.length]);

  /** Предыдущий шаг */
  const prevStep = () => {
    if (currentStep > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const onSubmit = async (data: QuizFormType) => {
    const formData = {
      ...data,
      recaptchaToken: token,
      ...metrics,
    };
    await submitForm(FormNameEnum.QUIZ_FORM, formData);
  };

  return (
    <form className={cn('w-full', className)} onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-[300px_1fr] gap-4 max-[920px]:grid-cols-1 max-[920px]:gap-0">
        {/* Левая часть */}
        <div className="relative rounded-2xl overflow-hidden min-h-[540px] bg-gray-200 max-[920px]:rounded-b-[0px] max-[920px]:min-h-[180px]">
          <ImageWithFallback
            src={anna}
            alt="Minzifa Travel"
            fill
            quality={100}
            className="object-cover"
          />
          {/* Облачко */}
          <div className="bg-white absolute top-[50px] left-1/2 -translate-x-1/2 rounded-[300px] p-5 w-[calc(100%-40px)] max-w-[250px] shadow max-[920px]:left-2 max-[920px]:-translate-x-0 max-[550px]:max-w-[150px] max-[400px]:max-w-[130px] max-[920px]:top-2 max-[920px]:rounded-t-[30px] max-[920px]:rounded-l-[30px] max-[920px]:rounded-br-[0px]">
            <p className="text-sm max-[550px]:text-[10px]">{steps[currentStep].bubbleText}</p>
            <span className="absolute bg-white w-[20px] h-[20px] bottom-[-28px] right-5 rounded-full max-[920px]:hidden" />
            <span className="absolute bg-white w-[10px] h-[10px] bottom-[-40px] right-10 rounded-full max-[920px]:hidden" />
          </div>
          {/* Подпись */}
          <div className="bg-white  absolute bottom-0 w-full p-3 rounded-t-[16px] max-[920px]:hidden">
            <p className="font-bold text-[18px]">Anna Smirnova</p>
            <p className="text-[14px]">Product Manager</p>
          </div>
        </div>

        {/* Правая часть */}
        <div
          className={
            'bg-white rounded-2xl min-w-[320px] min-h-[670px] md:w-[616px] md:min-h-[540px] p-5 flex flex-col justify-between max-[920px]:flex-col-reverse gap-5 max-[920px]:min-h-full max-[920px]:rounded-b-[16px] max-[920px]:rounded-t-[0px] max-[920px]:bg-white max-[650px]:px-2.5'
          }
        >
          {/* Прогресс-бар */}
          <div className="flex gap-2 mb-5 transition-all duration-400">
            {steps.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-[8px] flex-1 rounded-[300px] transition-all duration-400",
                  i <= currentStep ? 'bg-[#27A430]' : 'bg-[#F3F1F1]'
                )}
              />
            ))}
          </div>
          <div className="w-full h-full flex-1 flex flex-col">
            {/* Контент шага */}
            <div className={cn(
              "flex-1 transition-all duration-500 ease-in-out",
              isTransitioning ? "opacity-0 translate-x-[-20px]" : "opacity-100 translate-x-0"
            )}>
              {steps[currentStep].render()}
            </div>

            {/* Кнопки */}
            <div className="mt-5 w-full">
              {currentStep < steps.length - 1 ? (
                <div className="flex justify-end gap-2">
                  {currentStep > 0 && (
                    <Button
                      type="button"
                      onClick={prevStep}
                      color="secondary"
                      className='w-full px-3 py-2.5 max-w-[100px]'
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={nextStep}
                    color="primary"
                    className='w-full px-3 py-2.5 max-w-[100px]'
                  >
                    Next
                  </Button>
                </div>
              ) : (
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    onClick={prevStep}
                    color="secondary"
                    className='w-full px-3 py-2.5 max-w-[100px]'
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !token}
                    color="primary"
                    className='w-full px-3 py-2.5 max-w-[200px]'
                  >
                    Send request
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
