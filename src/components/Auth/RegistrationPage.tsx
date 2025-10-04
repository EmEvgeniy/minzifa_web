'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { RegistrationFormType, registrationSchema } from '../../validation/registrationSchema';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '@/components/UI/Button/Button';

interface RegistrationPageProps {
  locale: string;
}

export const RegistrationPage = ({ locale }: RegistrationPageProps) => {
  const t = useTranslations('auth.register');
  const router = useRouter();
  const [referrer, setReferrer] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Используем Zustand store для управления состоянием аутентификации
  const { register: registerUser, isLoading, error } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormType>({
    resolver: zodResolver(registrationSchema(t)),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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

  const onSubmit = async (data: RegistrationFormType) => {
    try {
      // Регистрация через Zustand store
      await registerUser(data.name, data.email, data.password, data.confirmPassword);

      // После успешной регистрации перенаправляем на предыдущую страницу или на главную
      const redirectTo = referrer || `/${locale}`;
      router.push(redirectTo);
    } catch {
      // Ошибка уже обработана в store
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full min-h-screen items-center">
      {/* Изображение - сверху на мобильных, слева на десктопе */}
      <div
        className="w-full md:w-[65%] h-64 md:h-full bg-cover bg-center order-1 md:order-1"
        style={{ backgroundImage: 'url(/registration-bg.jpg)' }}
      />

      {/* Форма - снизу на мобильных, справа на десктопе */}
      <div className="w-full md:w-[35%] h-full flex items-center justify-center bg-white p-8 order-2 md:order-2">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#16372D] mb-2">{t('title')}</h1>
            <p className="text-gray-600">{t('subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <input
                {...register('name')}
                type="text"
                placeholder={t('name')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

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

            <div className="relative">
              <input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t('confirmPassword')}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? '👁️' : '🙈'}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
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
              {isLoading ? 'Загрузка...' : t('createAccount')}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              {t('haveAccount')}{' '}
              <Link
                href="/auth/login"
                className="text-[#27A430] hover:text-[#1e8b28] font-semibold"
              >
                {t('signIn')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
