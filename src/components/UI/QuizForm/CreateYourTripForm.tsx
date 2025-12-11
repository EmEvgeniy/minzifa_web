'use client';

import createYourTrip from '@/assets/img/CreateYourTrip.jpg';
import { cn } from '@/utils/utils';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePostMutation } from '@/api/post.api';
import { useSnackStore } from '../../../store/useSnackStore';
import { CreateYourTripFormProps, CreateYourTripFormRequest, QuestionData } from './_types';
import { useRouter } from 'next/navigation';
import { useMetricsStore } from '@/store/useMetricsStore';
import { PhoneInputComp } from '../PhoneInput';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';

export const CreateYourTripForm = ({ className, popupClose, locale }: CreateYourTripFormProps) => {
  const t = useTranslations('CreateYourTripForm');

  const router = useRouter();
  const { metrics } = useMetricsStore();

  const [formData, setFormData] = useState<CreateYourTripFormRequest>({
    destinations: [],
    travellers: '',
    days: '',
    hotels: '',
    experience: '',
    name: '',
    email: '',
    phone: '',
  });

  const questions: QuestionData[] = useMemo(
    () => [
      {
        question: t('questions.slide_1.title'),
        answers: t.raw('questions.slide_1.answers'),
        type: 'checkbox',
        name: 'destinations[]',
        hint: t('questions.slide_1.hint'),
      },
      {
        question: t('questions.slide_2.title'),
        answers: t.raw('questions.slide_2.answers'),
        type: 'radio',
        name: 'travellers',
      },
      {
        question: t('questions.slide_3.title'),
        answers: t.raw('questions.slide_3.answers'),
        type: 'radio',
        name: 'days',
      },
      {
        question: t('questions.slide_4.title'),
        answers: t.raw('questions.slide_4.answers'),
        type: 'radio',
        name: 'hotels',
      },
      {
        question: t('questions.slide_5.title'),
        answers: t.raw('questions.slide_5.answers'),
        type: 'radio',
        name: 'experience',
      },
      {
        question: t('questions.slide_6.title'),
        inputs: ['name', 'email', 'phone'],
      },
    ],
    [t],
  );

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const currentStepRef = useRef(step);

  const handleNext = useCallback(() => {
    setDirection(1);
    currentStepRef.current = step + 1;
    const current = questions[step - 1];
    const fieldName = current.name?.replace('[]', '') as keyof CreateYourTripFormRequest;

    if (current.type && fieldName) {
      const value = formData?.[fieldName];
      const isValid = Array.isArray(value) ? value.length > 0 : Boolean(value);

      if (!isValid) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: t('errors.required'),
        }));
        return;
      }
    }

    setErrors({});
    setStep(step + 1);
    setProgress(progress + 1);
  }, [step, progress, formData, questions, t]);

  const handleBack = () => {
    if (step === 1) return;
    setDirection(-1);
    currentStepRef.current = step - 1;
    setStep(step - 1);
    setProgress(progress - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;

    if (type === 'checkbox') {
      const key = name.replace('[]', '') as keyof CreateYourTripFormRequest;
      const prev = formData?.[key] as string[];

      const updated = checked
        ? [...(prev || []), value]
        : (prev || []).filter((item) => item !== value);

      setFormData({ ...formData, [key]: updated });
    } else {
      setFormData((prev) => {
        const updatedFormData = { ...prev, [name]: value };
        return updatedFormData;
      });
    }
  };

  useEffect(() => {
    const currentQuestion = questions[step - 1];

    if (currentQuestion?.type === 'radio' && currentQuestion.name) {
      const fieldName = currentQuestion.name as keyof CreateYourTripFormRequest;
      const value = formData[fieldName];

      // Если значение появилось — перейти вперёд
      if (value && typeof value === 'string') {
        // Только если нет ошибок на этом поле
        if (!errors[fieldName]) {
          const timeout = setTimeout(() => {
            handleNext();
          }, 150);

          return () => clearTimeout(timeout);
        }
      }
    }
  }, [formData, step, errors, handleNext, questions]);

  const { setMessage, setError } = useSnackStore((state) => state);

  const { mutate, isPending } = usePostMutation<
    CreateYourTripFormRequest,
    CreateYourTripFormRequest
  >(
    ['create-my-trip-quiz'],
    () => {
      setMessage(locale == 'en' ? 'Your request was submitted!' : 'Ваш запрос был отправлен!');
      setFormData({
        destinations: [],
        travellers: '',
        days: '',
        hotels: '',
        experience: '',
        name: '',
        email: '',
        phone: '',
      });

      popupClose?.();
      router.push(`/${locale}/thank-you`);
    },
    () => {
      setError(locale == 'en' ? 'Some error was happened' : 'Произошла ошибка');
      setMessage('');
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, phone } = formData;

    const newErrors: { [key: string]: string } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s\-]{7,20}$/;

    if (!name.trim()) {
      newErrors.name = t('errors.name_required');
    }

    if (!emailRegex.test(email)) {
      newErrors.email = t('errors.invalid_email');
    }

    if (!phoneRegex.test(phone)) {
      newErrors.phone = t('errors.invalid_phone');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (!isPending) {
      mutate({
        obj: { ...formData, ...metrics },
        endpoint: `forms/create-my-trip-quiz?locale=${locale}`,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        className,
        'w-full bg-white rounded-2xl grid grid-cols-1 md:grid-cols-[280px_1fr] md:min-h-[200px] overflow-hidden',
      )}
    >
      <div className="p-5 bg-[#eff8ef] w-full h-full grid grid-cols-[100px_1fr] md:grid-cols-1 gap-3">
        <div className="w-full h-full max-w-[100px] max-h-[100px] md:max-h-[240px] md:max-w-[240px] overflow-hidden rounded-full md:rounded-2xl mb-3">
          <ImageWithFallback
            src={createYourTrip}
            alt="create your trip"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-gray-800">
          <div className="flex flex-col justify-between md:min-h-[200px] font-normal">
            <div className="flex flex-col text-left gap-3 bg-[#cfdfd9] p-3 rounded-xl relative">
              <div className="absolute -left-2 top-2 md:left-5 md:-top-2 border-solid border-r-[#cfdfd9] border-r-8 border-y-transparent border-y-8 border-l-0 md:border-b-[#cfdfd9] md:border-b-8 md:border-x-transparent md:border-x-8 md:border-t-0" />
              <div className="text-left text-sm">
                <p className="font-bold text-base">{t('card.title')}</p>
                <p className="text-gray-700 text-xs">{t('card.subtitle')}</p>
              </div>
              <p className="text-xs md:text-sm">{t('card.description')}</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-left italic col-span-2 md:col-span-1">{t('card.hint')}</p>
      </div>
      <div className="p-3 md:p-5 h-full">
        <div className="pt-10 flex flex-col justify-between h-full">
          {progress && (
            <div className="bg-[rgba(59,161,81,0.20)] h-1.5 relative">
              <span
                className="bg-[#3BA151] h-1.5 absolute left-0 top-0 transition-all duration-300"
                style={{ width: `${(progress / questions.length) * 100}%` }}
              />
            </div>
          )}
          <AnimatePresence mode="wait" initial={false}>
            {questions?.map(
              (question, index) =>
                index === step - 1 && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: direction > 0 ? 40 : -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: direction > 0 ? -40 : 40 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className={cn('flex flex-col gap-3 p-3 md:p-5 h-full')}
                  >
                    <p className="text-2xl font-semibold">{question.question}</p>
                    {(question.type === 'checkbox' || question.type === 'radio') && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {question?.answers?.map((answer, index) => (
                            <div
                              key={index}
                              className={cn(
                                'border px-3 rounded-2xl flex items-center hover:bg-[#e5f1e5]',
                                errors[question.name?.replace('[]', '') || '']
                                  ? 'border-red-500'
                                  : 'border-gray-200',
                              )}
                            >
                              <input
                                id={`form_${question.name}_${index}`}
                                type={question.type}
                                name={question.name}
                                value={answer}
                                onChange={handleChange}
                              />
                              <label
                                className="ml-5 w-full py-3 text-sm hover:cursor-pointer"
                                htmlFor={`form_${question.name}_${index}`}
                              >
                                {answer}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors[question.name?.replace('[]', '') || ''] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[question.name?.replace('[]', '') || '']}
                          </p>
                        )}
                      </>
                    )}
                    {index === questions?.length - 1 && (
                      <div className="flex flex-col gap-5">
                        {question?.inputs?.map((input, index) => (
                          <div key={index} className="flex flex-col text-sm">
                            <label htmlFor={`form_${input}`}>
                              {t(`questions.slide_${questions?.length}.${input}`)}
                            </label>
                            {input === 'phone' ? (
                              <PhoneInputComp
                                value={formData.phone}
                                onChange={(value) =>
                                  setFormData((prev) => ({ ...prev, phone: value }))
                                }
                              />
                            ) : (
                              <input
                                id={`form_${input}`}
                                name={input}
                                onChange={handleChange}
                                className={cn(
                                  'border rounded-lg p-2',
                                  errors[input] ? 'border-red-500' : 'border-gray-300',
                                )}
                                placeholder={t(`questions.slide_${questions.length}.${input}`)}
                              />
                            )}
                            {errors[input] && (
                              <p className="text-red-500 text-sm">{errors[input]}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {question.hint && <p className="text-sm text-gray-500">{question.hint}</p>}
                  </motion.div>
                ),
            )}
          </AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center text-center md:text-left gap-5">
            <div>{t('step', { step: step, total: questions?.length })}</div>
            <div className="grid grid-cols-2 gap-5">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-[#3BA151] text-white p-2 rounded-lg w-full cursor-pointer"
                >
                  {t('buttons.back')}
                </button>
              )}
              {step >= 1 && step < questions?.length && (
                <button
                  type="button"
                  onClick={handleNext}
                  className={cn(
                    step === 1 && 'col-start-2',
                    'bg-[#3BA151] text-white p-2 rounded-lg w-full cursor-pointer',
                  )}
                >
                  {t('buttons.next')}
                </button>
              )}
              {step === questions?.length && (
                <button
                  type="submit"
                  className="bg-[#3BA151] text-white p-2 rounded-lg w-full cursor-pointer"
                >
                  {t('buttons.submit')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
