'use client';

import { ReactNode, useCallback, useState } from 'react';
import anna from '@/assets/img/CreateYourTrip.jpg'; // заменишь на свой createYourTrip.jpg
import { motion, AnimatePresence } from 'framer-motion';
import Step1 from './ui/Step1';
import Step2 from './ui/Step2';
import Step3 from './ui/Step3';
import Step4 from './ui/Step4';
import { cn } from '@/utils/utils';
import { QuizFormData, useQuizStore } from '@/store/quizStore';
import { usePostMutation } from '@/api/post.api';
import { useSnackStore } from '../CustomSnackBar/store';
import { useRouter } from 'next/navigation';
import { useMetricsStore } from '@/store/useMetricsStore';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';

type DescFormProps = {
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
  errors?: { [key: string]: string };
  clearError?: (field: string) => void;
}

export default function QuizForm({ className, popupClose, locale }: DescFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { formData, setFormData } = useQuizStore();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { metrics } = useMetricsStore();

  const clearError = (field: string) => {
    setErrors((prev) => {
      if (!(field in prev)) return prev; // если ошибки нет, не меняем
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const steps: Step[] = [
    {
      bubbleText: 'Pick destination(s) and your travel month',
      title: 'Where do you want to go?',
      render: () => <Step1 errors={errors} clearError={clearError} />,
    },
    {
      bubbleText: "Who's traveling and for how long?",
      title: 'Who will you share this adventure with?',

      render: () => <Step2 errors={errors} clearError={clearError} />,
    },
    {
      bubbleText: 'Budget range & hotel level',
      title: 'What kind of budget do you have in mind for traveling?',
      render: () => <Step3 errors={errors} clearError={clearError} />,
    },
    {
      bubbleText: 'Where should we send 2–3 options within 24h?',
      title: 'Get 2–3 options in 24h',
      render: () => <Step4 errors={errors} clearError={clearError} />,
    },
  ];

  const { setMessage, setError } = useSnackStore((state) => state);

  const { mutate, isPending } = usePostMutation<QuizFormData, QuizFormData>(
    ['create-my-trip-quiz'],
    () => {
      setMessage('Your request was submitted!');
      setFormData({
        whereGo: '',
        whenGo: '',
        howManyPeople: '',
        howManyDays: '',
        budget: '',
        accomodation: '',
        name: '',
        email: '',
        phone: '',
        contactToTalk: '',
      });

      popupClose?.();
      router.push(`/${locale}/thank-you`);
    },
    () => {
      setError(locale == 'en' ? 'Some error was happened' : 'Произошла ошибка');
      setMessage('');
    },
  );

  /** Валидация текущего шага */
  const validateStep = useCallback(
    (stepIndex: number) => {
      const newErrors: { [key: string]: string } = {};

      if (stepIndex === 0) {
        if (!formData.whereGo.trim()) newErrors.whereGo = 'Please select your destination.';
        if (!formData.whenGo.trim()) newErrors.whenGo = 'Please select your travel month.';
      }
      if (stepIndex === 1) {
        if (!formData.howManyPeople.trim())
          newErrors.howManyPeople = 'Please select the number of people.';
        if (!formData.howManyDays.trim())
          newErrors.howManyDays = 'Please enter the number of days.';
      }
      if (stepIndex === 2) {
        if (!formData.budget.trim()) newErrors.budget = 'Please select your budget.';
        if (!formData.accomodation.trim())
          newErrors.accomodation = 'Please select accommodation type.';
      }
      if (stepIndex === 3) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[0-9\s\-]{7,20}$/;

        if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
        if (!emailRegex.test(formData.email))
          newErrors.email = 'Please enter a valid email address.';
        if (!phoneRegex.test(formData.phone))
          newErrors.phone = 'Please enter a valid phone number.';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData],
  );

  /** Следующий шаг с проверкой */
  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  }, [currentStep, validateStep, steps.length]);

  /** Предыдущий шаг */
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    if (!isPending) {
      mutate({
        obj: { ...formData, ...metrics },
        endpoint: `forms/quiz-form?locale=${locale}`,
      });
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="grid grid-cols-[300px_1fr] gap-4 max-[920px]:grid-cols-1 max-[920px]:gap-0 ">
        {/* Левая часть */}
        <div className="relative rounded-[16px] overflow-hidden min-h-[540px] bg-gray-200 max-[920px]:rounded-b-[0px] max-[920px]:min-h-[180px]">
          <ImageWithFallback
            src={anna}
            alt="Anna Smirnova"
            fill
            sizes="(max-width: 920px) 100vw, 300px"
            className="object-cover"
          />
          {/* Облачко */}
          <div className="bg-white absolute top-[50px] left-1/2 -translate-x-1/2 rounded-[300px] p-5 w-[calc(100%-40px)] max-w-[250px] shadow max-[920px]:left-2 max-[920px]:-translate-x-0 max-[550px]:max-w-[150px] max-[400px]:max-w-[130px] max-[920px]:top-2  max-[920px]:rounded-t-[30px] max-[920px]:rounded-l-[30px] max-[920px]:rounded-br-[0px]">
            <p className="text-sm max-[550px]:text-[10px]">{steps[currentStep].bubbleText}</p>
            <span className="absolute bg-white w-[20px] h-[20px] bottom-[-28px] right-5 rounded-full max-[920px]:hidden" />
            <span className="absolute bg-white w-[10px] h-[10px] bottom-[-40px] right-10 rounded-full max-[920px]:hidden" />
          </div>
          {/* Подпись */}
          <div className="bg-white absolute bottom-0 w-full p-3 rounded-t-[16px] max-[920px]:hidden">
            <p className="font-bold text-[18px]">Anna Smirnova</p>
            <p className="text-[14px]">Product Manager</p>
          </div>
        </div>

        {/* Правая часть */}
        <div
          className={
            'bg-white rounded-[16px] p-5 flex flex-col justify-between min-h-[540px] max-[920px]:flex-col-reverse gap-5 max-[920px]:min-h-full max-[920px]:rounded-b-[16px] max-[920px]:rounded-t-[0px] max-[920px]:bg-white max-[650px]:px-2.5'
          }
        >
          {/* Прогресс-бар */}
          <div className="flex gap-2 mb-5">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className="h-[8px] flex-1 rounded-[300px]"
                animate={{ backgroundColor: i <= currentStep ? '#27A430' : '#F3F1F1' }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>
          <div className="w-full h-full flex-1 flex flex-col">
            {/* Контент шага */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                {steps[currentStep].render()}
              </motion.div>
            </AnimatePresence>

            {/* Кнопки */}
            <div className="mt-5 w-full">
              {currentStep < steps.length - 1 ? (
                <div className="flex justify-end gap-2">
                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-[#16372D] hover:bg-[#0d201a] duration-300 transition-all text-white px-5 py-2 rounded-[16px] cursor-pointer"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={nextStep}
                    className={cn(
                      'bg-[#27A430] hover:bg-[#1e7e24] duration-300 transition-all text-white px-5 py-2 rounded-[16px] cursor-pointer',
                      currentStep === 0 && 'w-full',
                    )}
                  >
                    Next
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="bg-[#27A430] hover:bg-[#1e7e24] duration-300 transition-all text-white px-5 py-2 rounded-[16px] w-full cursor-pointer"
                >
                  Send request
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
