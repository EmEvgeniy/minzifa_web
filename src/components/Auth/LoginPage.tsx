'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '../../store/useAuthStore';
import { loginSchema, LoginFormType } from '../../validation/loginSchema';
import { Button } from '@/components/UI/Button/Button';

interface LoginPageProps {
  locale: string;
}

export const LoginPage = ({ locale }: LoginPageProps) => {
  const t = useTranslations('auth.login');
  const router = useRouter();
  const [referrer, setReferrer] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Используем Zustand store для управления состоянием аутентификации
  const { login, isLoading, error } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema(t)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    // Сохраняем referrer URL при монтировании компонента
    const referrerUrl = sessionStorage.getItem('authReferrer');
    if (referrerUrl) {
      setReferrer(referrerUrl);
    } else {
      // Если нет сохраненного referrer, используем текущий путь
      setReferrer(window.location.pathname);
    }
  }, []);

  const onSubmit = async (data: LoginFormType) => {
    try {
      // Логин через Zustand store
      await login(data.email, data.password);

      // После успешного логина перенаправляем на предыдущую страницу или на главную
      const redirectTo = referrer || `/${locale}`;
      router.push(redirectTo);
    } catch {
      // Ошибка уже обработана в store
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full min-h-screen items-center">
      <div className="w-full h-full flex items-center justify-center bg-white p-8 order-2 md:order-2">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#16372D] mb-2">{t('title')}</h1>
            <p className="text-gray-600">{t('subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <input
                {...register('email')}
                type="email"
                placeholder={t('email')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder={t('password')}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? '👁️' : '🙈'}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Загрузка...' : t('signIn')}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              {t('noAccount')}{' '}
              <Link
                href="/auth/registration"
                className="text-[#27A430] hover:text-[#1e8b28] font-semibold"
              >
                {t('signUp')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
