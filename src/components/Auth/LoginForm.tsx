'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '../../store/useAuthStore';
import { loginSchema, LoginFormType } from '../../validation/loginSchema';
import Button from '@/components/UI/Button/Button';
import { Input } from '@/components/UI/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface LoginFormProps {
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
}

export const LoginForm = ({ showPassword, setShowPassword }: LoginFormProps) => {
    const t = useTranslations();
    const { login, isLoading, error } = useAuthStore();

    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema(t)),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginFormType) => {
        try {
            await login(data.email, data.password);
        } catch {
            // Error handled in store
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input
                {...form.register('email')}
                type="email"
                placeholder={t('auth.login.email')}
                error={form.formState.errors.email}
            />

            <Input
                {...form.register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.login.password')}
                error={form.formState.errors.password}
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

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Загрузка...' : t('auth.login.signIn')}
            </Button>
        </form>
    );
};