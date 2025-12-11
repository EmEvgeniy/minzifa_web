'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useAuthPostMutation } from '@/api/post.api';
import { useSnackStore } from '@/store/useSnackStore';
import { loginSchema, LoginFormType } from '@/validation/loginSchema';
import Button from '@/components/UI/Button/Button';
import { Checkbox, Input } from '@/components/UI/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from "@/components/UI/Loader/Loader";
import { useState } from "react";
import { ITourist } from '@/types';
import { useAuthStore } from '@/store';
import { getCsrfToken } from '@/api/get.api';
import { GoogleLoginButton } from './GoogleLoginButton';
import { AuthStep } from '../_types';
import { FaChevronLeft } from 'react-icons/fa6';


export const LoginForm = ({ step, setStep }: { step: AuthStep, setStep: (step: AuthStep) => void }) => {
    const t = useTranslations();
    const { setMessage, setError } = useSnackStore();
    const [showPassword, setShowPassword] = useState(false);

    const { email, setEmail, setUser, setAuthPopup } = useAuthStore();

    const { register, clearErrors, formState: { errors, isLoading }, handleSubmit, watch } = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema(t)),
        mode: 'onSubmit',
        defaultValues: {
            email: email,
            password: '',
        },
    });

    const { mutate: loginMutate, isPending, reset } = useAuthPostMutation<ITourist, Record<string, unknown>>(
        ['auth.login'],
        async (data: ITourist) => {
            setUser(data);
            setAuthPopup(false);
            setMessage(t('auth.login.success'));
            setStep('welcome');
            setEmail('');
        },
        (error) => {
            console.error(error);
            setError(t('auth.login.error'));
            clearErrors();
        },
    );

    const { mutate: forgotPasswordMutate } = useAuthPostMutation(
        ['auth.forgot-password'],
        async (data: { message: string }) => {
            setAuthPopup(false);
            setMessage(data?.message);
            reset();
        },
        (error) => {
            console.error(error);
            setError(t('auth.login.error'));
            clearErrors();
        },
    );

    const onSubmit = async (data: LoginFormType) => {
        await getCsrfToken();

        await loginMutate({
            obj: data,
            endpoint: 'auth/login',
        });
    };

    const handleForgotPassword = async () => {
        await getCsrfToken();
        await forgotPasswordMutate({
            obj: { email },
            endpoint: 'auth/forgot-password',
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
                <div className="flex flex-col mb-4">
                    <h2 className="text-2xl font-bold text-[#16372D] mb-1">
                        {t('auth.login.title')}
                    </h2>
                    <p className='text-sm text-gray-500'>{t('auth.login.subtitle', { email })}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('auth.login.password')}
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
                        wrapperClassName='mb-2'
                    />

                    <Button
                        color='link'
                        className='mb-5 p-0 text-sm text-green-600 hover:text-green-700'
                        onClick={handleForgotPassword}
                    >
                        {t('auth.forgotPassword.title')}?
                    </Button>

                    <Button type="submit" className="w-full px-3 py-2" disabled={isLoading || isPending}>
                        {isLoading || isPending ? <Loader /> : t('auth.login.signIn')}
                    </Button>
                </form>

                {step === 'welcome' && (
                    <>
                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    {t('auth.login.or')}
                                </span>
                            </div>
                        </div>


                        {/* Google Login Button */}
                        <GoogleLoginButton />
                    </>
                )}
            </div>
        </>
    );
};