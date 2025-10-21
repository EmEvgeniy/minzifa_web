'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '../../store/useAuthStore';
import { RegistrationFormType, registrationSchema } from '../../validation/registrationSchema';
import Button from '@/components/UI/Button/Button';
import { Input } from '@/components/UI/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface RegisterFormProps {
    showPassword: boolean;
    showConfirmPassword: boolean;
    setShowPassword: (show: boolean) => void;
    setShowConfirmPassword: (show: boolean) => void;
}

export const RegisterForm = ({
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword
}: RegisterFormProps) => {
    const t = useTranslations();
    const { register: registerUser, isLoading, error } = useAuthStore();

    const form = useForm<RegistrationFormType>({
        resolver: zodResolver(registrationSchema(t)),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: RegistrationFormType) => {
        try {
            await registerUser(data.name, data.email, data.password, data.confirmPassword);
        } catch {
            // Error handled in store
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input
                {...form.register('name')}
                type="text"
                placeholder={t('auth.register.name')}
                error={form.formState.errors.name}
            />

            <Input
                {...form.register('email')}
                type="email"
                placeholder={t('auth.register.email')}
                error={form.formState.errors.email}
            />

            <Input
                {...form.register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.register.password')}
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

            <Input
                {...form.register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t('auth.register.confirmPassword')}
                error={form.formState.errors.confirmPassword}
                endIcon={
                    <Button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        color="link"
                        className="text-gray-500 hover:text-gray-700 p-0 h-auto min-h-0 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:rounded"
                    >
                        {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </Button>
                }
            />

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Загрузка...' : t('auth.register.createAccount')}
            </Button>
        </form>
    );
};