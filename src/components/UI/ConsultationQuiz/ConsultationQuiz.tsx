'use client';

import { cn } from '@/utils/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useSnackStore } from '../../../store/useSnackStore';
import { usePostMutation } from '@/api/post.api';

import { useRouter } from 'next/navigation';
import { ConsultationQuizFormProps, ConsultationQuizFormRequest } from './_types';
import { questions } from './questionsStore';
import { useMetricsStore } from '@/store/useMetricsStore';

export function ConsultationQuiz({ popupClose }: ConsultationQuizFormProps) {
  const t = useTranslations('CreateYourTripForm');
  const locale = useLocale();

  const router = useRouter();

  const { metrics } = useMetricsStore();

  const [formData, setFormData] = useState<ConsultationQuizFormRequest>({
    visites: '',
    cities: '',
    days: '',
    travellers: '',
    name: '',
    email: '',
    phone: '',
  });

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (
    fieldName: keyof ConsultationQuizFormRequest,
    value: string,
  ): string | null => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return t('errors.required');
    }

    if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return t('errors.invalid_email');
      }
    }

    if (fieldName === 'phone') {
      const phoneRegex = /^\+?[0-9\s\-]{7,20}$/;
      if (!phoneRegex.test(value)) {
        return t('errors.invalid_phone');
      }
    }

    return null; // всё ок
  };

  const handleNext = () => {
    setDirection(1);
    const current = questions[step - 1];
    const fieldName = current.name?.replace('[]', '') as keyof ConsultationQuizFormRequest;

    if (current.type && fieldName) {
      const value = formData?.[fieldName];
      const error = validateField(fieldName, value || '');
      if (error) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: error,
        }));
        return;
      }
    }

    setErrors({});
    setStep(step + 1);
    setProgress(progress + 1);
  };

  const handleBack = () => {
    if (step === 1) return;
    setDirection(-1);
    setStep(step - 1);
    setProgress(progress - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    const fieldName = name as keyof ConsultationQuizFormRequest;

    // Если пользователь находится на последнем шаге и вводит name/email/phone — проверяем
    const isLastStep = step === questions.length;
    if (isLastStep && ['name', 'email', 'phone'].includes(name)) {
      const error = validateField(fieldName, value);

      setErrors((prev) => {
        const newErrors = { ...prev };

        if (!error && prev[name]) {
          // Удалить ошибку, если поле стало валидным
          delete newErrors[name];
        }

        return newErrors;
      });
    }

    // Автопереход, если это radio с autoNext
    const question = questions.find((q) => q.name === name);
    const currentQuestionIndex = questions.findIndex((q) => q.name === name);
    const isCurrentStep = step === currentQuestionIndex + 1;

    if (question?.autoNext && isCurrentStep && !isLastStep) {
      const error = validateField(fieldName, value);

      if (error) {
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
        return;
      }

      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });

      setTimeout(() => {
        setDirection(1);
        setStep(step + 1);
        setProgress(progress + 1);
      }, 100);
    }
  };

  const { setMessage, setError } = useSnackStore((state) => state);

  const { mutate, isPending } = usePostMutation<
    ConsultationQuizFormRequest,
    ConsultationQuizFormRequest
  >(
    ['create-my-trip-quiz'],
    () => {
      setMessage(locale == 'en' ? 'Your request was submitted!' : 'Ваш запрос был отправлен!');
      setFormData({
        visites: '',
        cities: '',
        days: '',
        travellers: '',
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

    // если есть ошибки — показать
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (!isPending) {
      mutate({
        obj: { ...formData, ...metrics },
        endpoint: `forms/consultation-quiz?locale=${locale}`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white">
      <div className="bg-gray-100 w-full p-3 md:p-5">
        <h2 className="w-full pr-20 text-lg font-semibold">
          Заполните данные чтобы получить &quot;Бесплатную консультацию&quot; от эксперта по
          путешествиям
        </h2>
      </div>
      {progress && (
        <div className="bg-[rgba(59,161,81,0.20)] h-1.5 relative">
          <span
            className="bg-[#3BA151] h-1.5 absolute left-0 top-0 transition-all duration-300"
            style={{ width: `${(progress / questions.length) * 100}%` }}
          />
        </div>
      )}
      <div className={cn('flex flex-col justify-between p-3 md:p-5')}>
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
                  className={cn('flex flex-col gap-3 h-full py-5')}
                >
                  <p className="text-2xl font-semibold">{question.question}</p>
                  {(question.type === 'checkbox' || question.type === 'radio') && (
                    <>
                      <div
                        className={cn(
                          'grid gap-5',
                          question?.answers?.length && question?.answers?.length > 3
                            ? 'grid-cols-2'
                            : 'grid-cols-1',
                        )}
                      >
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
                          <label htmlFor={`form_${input}`} className="mb-1">
                            {input.label}
                          </label>
                          <input
                            id={`form_${input}`}
                            name={input.name}
                            onChange={handleChange}
                            className={cn(
                              'border rounded-lg p-2',
                              errors[input.name] ? 'border-red-500' : 'border-gray-300',
                            )}
                            placeholder={input.label}
                            value={formData[input.name as keyof ConsultationQuizFormRequest] || ''}
                          />
                          {errors[input.name] && (
                            <p className="text-red-500 text-sm">{errors[input.name]}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center text-center md:text-left gap-5 bg-gray-100 p-3 md:p-5">
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
              disabled={isPending}
              className="bg-[#3BA151] text-white p-2 rounded-lg w-full cursor-pointer"
            >
              {t('buttons.submit')}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
