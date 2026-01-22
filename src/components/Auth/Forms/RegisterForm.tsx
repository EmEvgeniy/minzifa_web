'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { useRecaptcha } from '@/hooks/useRecaptcha';
import { useMetricsStore } from '@/store/useMetricsStore';
import { useSnackStore } from '@/store/useSnackStore';
import { useAuthPostMutation } from '@/api/post.api';
import { RegistrationFormType, registrationSchema } from '@/validation/registrationSchema';

import Button from '@/components/UI/Button/Button';
import { Checkbox, Input } from '@/components/UI/Form';
import { useState } from "react";
import Loader from "@/components/UI/Loader/Loader";
import { ITourist } from '@/types';
import { useAuthStore } from '@/store';
import Link from 'next/link';
import { AuthStep } from '../_types';
import { FaChevronLeft, FaEnvelope } from 'react-icons/fa6';
import { Controller } from 'react-hook-form';
import { PhoneInputComp } from '@/components/UI';

export const RegisterForm = ({ setStep }: { setStep: (step: AuthStep) => void }) => {
    const t = useTranslations();
    const locale = useLocale();

    const [showPassword, setShowPassword] = useState(false);

    const { email, setEmail, setAuthPopup } = useAuthStore();
    const { getToken, token } = useRecaptcha();
    const { metrics } = useMetricsStore();
    const { setMessage, setError } = useSnackStore();

    // Form setup
    const { register, formState: { errors }, handleSubmit, reset, control } = useForm<RegistrationFormType>({
        resolver: zodResolver(registrationSchema(t)),
        mode: 'onSubmit',
        defaultValues: {
            email: email,
            password: '',
            phone: '',
            recaptchaToken: '',
        },
    });

    const { mutate: registerMutate, isPending } = useAuthPostMutation<{ user: ITourist, token: string }, RegistrationFormType>(
        ['auth.register'],
        (data: { user: ITourist, token: string }) => {
            const { login } = useAuthStore.getState();
            login(data.user, data.token);
            setAuthPopup(false);
            setMessage(t('auth.login.success'));
            setStep('welcome');
            setEmail('');
            reset();
        },
        (error) => {
            console.error(error);
            setError(error.message || t('errors.general'));
        }
    );

    const handleRecaptcha = async () => await getToken('register');

    const onSubmit = async (data: RegistrationFormType) => {
        const name = data.email.split('@')[0];
        const formData = {
            ...data,
            name: name,
            password_confirmation: data.password,
            recaptchaToken: token,
            ...metrics
        };

        registerMutate({
            obj: formData,
            endpoint: 'auth/register'
        });
    };

    const handleBack = () => {
        setStep('welcome');
        setEmail('');
    };

    return (
        <>
            <Button
                type="button"
                onClick={handleBack}
                color='link'
            >
                <FaChevronLeft size={16} />
                {t('auth.login.back')}
            </Button>
            <div className='p-8'>
                <div className={"flex flex-col justify-start items-start mb-6"}>
                    <h2 className="text-2xl font-bold text-[#16372D] mb-3">
                        {t('auth.register.title')}
                    </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-sm font-medium text-gray-700 mb-4">{t('auth.login.setPassword')}</div>
                    <Input
                        {...register('email')}
                        type="email"
                        placeholder={t('auth.login.email')}
                        error={errors.email}
                        startIcon={<FaEnvelope size={16} />}
                        wrapperClassName="mb-2"
                        disabled={!!email}
                    />

                    <Input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('auth.login.createPassword')}
                        error={errors.password}
                        endIcon={
                            <Button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                color="link"
                                className="text-gray-500 hover:text-gray-700 p-0 h-auto min-h-0 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:rounded"
                            >
                                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </Button>
                        }
                        helperText={t('auth.login.passwordHint')}
                        wrapperClassName="mb-2"
                    />

                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <PhoneInputComp
                                {...field}
                                error={errors.phone}
                                wrapperClassName="mb-2"
                            />
                        )}
                    />

                    <Checkbox
                        label={t.rich('common.termsAcceptance', {
                            terms: (chunks) => (
                                <Link
                                    href={`/${locale}/term-and-conditions-of-booking-tours`}
                                    className="text-[#009F65] hover:underline"
                                    target='_blank'
                                >
                                    {chunks}
                                </Link>
                            ),
                            privacy: (chunks) => (
                                <Link href={`/${locale}/privacy-policy`} className="text-[#009F65] hover:underline" target='_blank'>
                                    {chunks}
                                </Link>
                            ),
                        })}
                        size="sm"
                        checked={!!token}
                        onChange={handleRecaptcha}
                        labelClassName='flex-wrap gap-x-1 text-xs text-gray-500 hover:text-gray-700'
                        wrapperClassName='mt-10 mb-3'
                    />

                    <Button type="submit" className="w-full px-3 py-2" disabled={isPending || !token}>
                        {isPending ? <Loader /> : t('auth.register.createAccount')}
                    </Button>
                </form>
            </div>
        </>
    );
};