'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { useSnackStore } from '@/store/useSnackStore';
import { ForgotPasswordFormType, forgotPasswordSchema } from '@/validation/forgotPasswordSchema';

import Button from '@/components/UI/Button/Button';
import { Input } from '@/components/UI/Form';
import Loader from "@/components/UI/Loader/Loader";
import { useAuthStore } from '@/store';
import { useAuthPostMutation } from '@/api/post.api';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthStep } from '../_types';

export const ForgotPasswordForm = ({ setStep }: { setStep: (step: AuthStep) => void }) => {
    const t = useTranslations();
    const [showPassword, setShowPassword] = useState(false);
    const { setAuthPopup } = useAuthStore();
    const { setMessage, setError } = useSnackStore();
    const router = useRouter();
    const token = useSearchParams().get('token');
    const email = useSearchParams().get('email');

    const { register, formState: { errors }, handleSubmit, reset } = useForm<ForgotPasswordFormType>({
        resolver: zodResolver(forgotPasswordSchema(t)),
        mode: 'onSubmit',
        defaultValues: {
            password: '',
            token: token ?? '',
            email: email ?? ''
        },
    });

    const { mutate, isPending } = useAuthPostMutation<{ message: string }, ForgotPasswordFormType, { response: { data: { message: string } } }>(
        ['auth.change-forget-password'],
        (data: { message: string }) => {
            setAuthPopup(false);
            setMessage(data?.message);
            setStep('welcome');
            reset();
            router.push('/');
        },
        (error) => {
            console.error(error);
            setError(error.response?.data?.message || t('errors.general'));
        }
    );

    const onSubmit = async (data: ForgotPasswordFormType) => {
        await mutate({
            obj: data,
            endpoint: 'auth/change-forgot-password'
        });
    };

    return (
        <div className='p-8'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-bold mb-4">{t('auth.resetPassword.title')}</h2>
                <div className="text-sm font-medium text-gray-700 mb-4">{t('auth.resetPassword.subtitle')}</div>
                <Input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('auth.resetPassword.password')}
                    error={!!errors.password}
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
                <Button type="submit" className="w-full px-3 py-2">
                    {isPending ? <Loader /> : t('auth.resetPassword.setPassword')}
                </Button>
            </form>
        </div>
    );
};