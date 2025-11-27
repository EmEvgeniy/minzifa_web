'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { usePostMutation } from '@/api/post.api';
import { useSnackStore } from '@/store/useSnackStore';
import { loginSchema, LoginFormType } from '@/validation/loginSchema';
import Button from '@/components/UI/Button/Button';
import { Input } from '@/components/UI/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRecaptcha } from '@/hooks';
import Loader from "@/components/UI/Loader/Loader";
import { useState } from "react";
import { ITourist } from '@/types';
import { useAuthStore } from '@/store';
import { getCsrfToken } from '@/api/get.api';


export const LoginForm = () => {
    const t = useTranslations();
    const { isReady, getToken } = useRecaptcha();
    const { setMessage, setError } = useSnackStore();
    const [showPassword, setShowPassword] = useState(false);
    const { setUser, setAuthPopup } = useAuthStore();
    const { register, reset, setValue, clearErrors, getValues, formState: { errors, isValid, isLoading }, handleSubmit } = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema(t)),
        defaultValues: {
            email: '',
            password: '',
            recaptchaToken: '',
        },
    });

    const { mutateAsync, isPending } = usePostMutation(
        ['auth.login'],
        async (data: ITourist) => {
            setUser(data);
            setAuthPopup(false);
            setMessage(t('auth.login.success'));
        },
        (error) => {
            console.error(error);
            setError(t('auth.login.error'));
            clearErrors();
            reset({ recaptchaToken: '' });
        },
    );

    const onSubmit = async (data: LoginFormType) => {
        if (!isReady) return;
        const token = await getToken('login');
        if (!token) return;

        await getCsrfToken();

        await mutateAsync({
            obj: { ...data, recaptchaToken: token },
            endpoint: 'auth/login',
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                {...register('email')}
                type="email"
                placeholder={t('auth.login.email')}
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

            <Button type="submit" className="w-full px-3 py-2" disabled={isLoading || isPending || !isValid}>
                {isLoading || isPending ? <Loader /> : t('auth.login.signIn')}
            </Button>
        </form>
    );
};