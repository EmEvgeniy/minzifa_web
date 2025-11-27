'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { useRecaptcha } from '@/hooks/useRecaptcha';
import { useMetricsStore } from '@/store/useMetricsStore';
import { useSnackStore } from '@/store/useSnackStore';
import { usePostMutation } from '@/api/post.api';
import { RegistrationFormType, registrationSchema } from '@/validation/registrationSchema';

import Button from '@/components/UI/Button/Button';
import { Input } from '@/components/UI/Form';
import { useState } from "react";
import Loader from "@/components/UI/Loader/Loader";
import { ITourist } from '@/types';
import { useAuthStore } from '@/store';
import { getCsrfToken } from '@/api/get.api';

export const RegisterForm = () => {
    const t = useTranslations();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { setUser, setAuthPopup } = useAuthStore();
    const { isReady, getToken } = useRecaptcha();
    const { metrics } = useMetricsStore();
    const { setMessage, setError } = useSnackStore();

    // Form setup
    const { register, formState: { errors, isValid, isLoading }, handleSubmit, reset } = useForm<RegistrationFormType>({
        resolver: zodResolver(registrationSchema(t)),
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            recaptchaToken: '',
        },
    });

    const { mutate } = usePostMutation(
        ['auth.register'],
        async (data: ITourist) => {
            setUser(data);
            setAuthPopup(false);
            setMessage(t('auth.login.success'));
            reset();
        },
        (error) => {
            console.error(error);
            setError(error.message);
        },
    );


    const onSubmit = async (data: RegistrationFormType) => {
        if (!isReady) {
            return;
        }

        const token = await getToken('register');

        if (!token) {
            return;
        }

        await getCsrfToken();

        await mutate({
            obj: {
                ...data,
                recaptchaToken: token,
                ...metrics
            },
            endpoint: 'auth/register'
        });
    };

    const renderPasswordToggleButton = (show: boolean, onToggle: () => void) => (
        <button
            type="button"
            onClick={onToggle}
            className="cursor-pointer text-gray-500 hover:text-gray-700 p-0 w-full h-full min-h-0"
        >
            {show ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
        </button>
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                {...register('name')}
                type="text"
                placeholder={t('auth.register.name')}
                error={errors.name}
            />

            <Input
                {...register('email')}
                type="email"
                placeholder={t('auth.register.email')}
                error={errors.email}
            />

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
            />

            <Input
                {...register('password_confirmation')}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t('auth.register.confirmPassword')}
                error={errors.password_confirmation}
                endIcon={renderPasswordToggleButton(showConfirmPassword, () => setShowConfirmPassword(!showConfirmPassword))}
            />

            <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !isValid}
            >
                {isLoading ? <Loader /> : t('auth.register.createAccount')}
            </Button>
        </form>
    );
};