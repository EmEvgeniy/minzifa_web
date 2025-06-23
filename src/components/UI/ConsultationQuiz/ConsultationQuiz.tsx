'use client';

import { cn } from "@/utils/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface ConsultationQuizFormRequest {
    visites: string;
    cities: string;
    days: string;
    travellers: string;
    name: string;
    email: string;
    phone: string;
}

interface Question {
    question: string;
    name?: string;
    answers?: string[];
    type?: string;
    inputs?: string[];
}

const questions: Question[] = [
    {
        question: "Вы посещали Узбекистан ранее?",
        answers: [
            "Да ❤",
            "Планирую посетить впервые"
        ],
        type: "radio",
        name: "visites",
    },
    {
        question: "В каких городах Вы хотели бы побывать в рамках этой поездки?",
        answers: [
            "Ташкент-Самарканд",
            "Ташкент - Самарканд - Бухара",
            "Ташкент - Самарканд - Бухара - Хива",
        ],
        type: "radio",
        name: "cities",
    },
    {
        question: "Сколько времени планируете пробыть в Узбекистане?",
        answers: [
            "Менее 3 дней",
            "От 3 до 7 дней",
            "От 7 до 14 дней",
            "Более 14 дней",
        ],
        type: "radio",
        name: "days",
    },
    {
        question: "Каким составом Вы планируете путешествовать?",
        answers: [
            "Нас 2 человека",
            "3 - 4 человека",
            "Нас 4 - 8 человек",
            "Нас еще больше :)",
            "Мы с детками до 2 лет",
            "Нашим деткам от 2 до 12 лет"
        ],
        type: "radio",
        name: "travellers",
    },
    {
        question: "Заполните форму ниже",
        inputs: [
            'name',
            'email',
            'phone'
        ],
        type: "text",
    }
];

export function ConsultationQuiz() {
    const t = useTranslations('CreateYourTripForm');

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

    const handleNext = () => {
        setDirection(1);
        const current = questions[step - 1];
        const fieldName = current.name?.replace('[]', '') as keyof ConsultationQuizFormRequest;

        if (current.type && fieldName) {
            const value = formData?.[fieldName];
            const isValid = Array.isArray(value) ? value.length > 0 : Boolean(value);

            if (!isValid) {
                setErrors(prev => ({
                    ...prev,
                    [fieldName]: t('errors.required')
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
        setFormData({ ...formData, [name]: value });
    };

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

        // ошибок нет — отправляем
        setErrors({});
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl overflow-hidden">
            <h2 className="bg-gray-100 w-full p-3 md:p-5 text-lg font-semibold">Заполните данные чтобы получить Бесплатную консультацию от эксперта по путешествиям</h2>
            <div className='p-3 md:p-5 flex flex-col justify-between'>
                {progress && (
                    <div className='bg-[rgba(59,161,81,0.20)] h-1.5 relative'>
                        <span
                            className="bg-[#3BA151] h-1.5 absolute left-0 top-0 transition-all duration-300"
                            style={{ width: `${(progress / questions.length) * 100}%` }}
                        />
                    </div>
                )}
                <AnimatePresence mode="wait" initial={false}>
                    {questions?.map((question, index) => index === step - 1 && (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: direction > 0 ? 40 : -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: direction > 0 ? -40 : 40 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className={cn('flex flex-col gap-3 p-3 md:p-5 h-full')}
                        >
                            <p className='text-2xl font-semibold'>{question.question}</p>
                            {(question.type === 'checkbox' || question.type === 'radio') && (
                                <>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                        {question?.answers?.map((answer, index) => (
                                            <div
                                                key={index}
                                                className={cn(
                                                    'border px-3 rounded-2xl flex items-center hover:bg-[#e5f1e5]',
                                                    errors[question.name?.replace('[]', '') || ''] ? 'border-red-500' : 'border-gray-200'
                                                )}
                                            >
                                                <input
                                                    id={`form_${question.name}_${index}`}
                                                    type={question.type}
                                                    name={question.name}
                                                    value={answer}
                                                    onChange={handleChange}
                                                />
                                                <label className='ml-5 w-full py-3 text-sm hover:cursor-pointer' htmlFor={`form_${question.name}_${index}`}>
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
                                <div className='flex flex-col gap-5'>
                                    {question?.inputs?.map((input, index) => (
                                        <div key={index} className='flex flex-col text-lg'>
                                            <label htmlFor={`form_${input}`}>
                                                {t(`questions.slide_${questions?.length}.${input}`)}
                                            </label>
                                            <input
                                                id={`form_${input}`}
                                                name={input}
                                                onChange={handleChange}
                                                className={cn(
                                                    'border rounded-lg p-2',
                                                    errors[input] ? 'border-red-500' : 'border-gray-300'
                                                )}
                                                placeholder={t(`questions.slide_${questions.length}.${input}`)}
                                            />
                                            {errors[input] && <p className="text-red-500 text-sm">{errors[input]}</p>}
                                        </div>
                                    ))
                                    }
                                </div>
                            )}
                        </motion.div>
                    ))
                    }
                </AnimatePresence>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center text-center md:text-left gap-5'>
                    <div>{t('step', { step: step, total: questions?.length })}</div>
                    <div className='grid grid-cols-2 gap-5'>
                        {step > 1 && <button type="button" onClick={handleBack} className='bg-[#3BA151] text-white p-2 rounded-lg w-full cursor-pointer'>{t('buttons.back')}</button>}
                        {(step >= 1 && step < questions?.length) && <button type="button" onClick={handleNext} className={cn(step === 1 && "col-start-2", 'bg-[#3BA151] text-white p-2 rounded-lg w-full cursor-pointer')}>{t('buttons.next')}</button>}
                        {step === questions?.length && <button type="submit" className='bg-[#3BA151] text-white p-2 rounded-lg w-full cursor-pointer'>{t('buttons.submit')}</button>}
                    </div>
                </div>
            </div>
        </form>
    );
}