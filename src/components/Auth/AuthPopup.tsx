'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '../../store/useAuthStore';
import { loginSchema, LoginFormType } from '../../validation/loginSchema';
import { RegistrationFormType, registrationSchema } from '../../validation/registrationSchema';
import Button from '@/components/UI/Button/Button';

interface AuthPopupProps {
  open: boolean;
  onClose: () => void;
}

export const AuthPopup = ({ open, onClose }: AuthPopupProps) => {
  const t = useTranslations();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login, register: registerUser, isLoading, error } = useAuthStore();

  const loginForm = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema(t)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<RegistrationFormType>({
    resolver: zodResolver(registrationSchema(t)),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onLoginSubmit = async (data: LoginFormType) => {
    try {
      await login(data.email, data.password);
      onClose();
    } catch {
      // Error handled in store
    }
  };

  const onRegisterSubmit = async (data: RegistrationFormType) => {
    try {
      await registerUser(data.name, data.email, data.password, data.confirmPassword);
      onClose();
    } catch {
      // Error handled in store
    }
  };

  const handleClose = () => {
    loginForm.reset();
    registerForm.reset();
    setIsLogin(true);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#16372D]">{t('auth.title')}</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Tab buttons */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              isLogin ? 'bg-white text-[#16372D] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('auth.login.title')}
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              !isLogin ? 'bg-white text-[#16372D] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('auth.register.title')}
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
            <div>
              <input
                {...loginForm.register('email')}
                type="email"
                placeholder={t('auth.login.email')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent"
              />
              {loginForm.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                {...loginForm.register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.login.password')}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? '👁️' : '🙈'}
              </button>
              {loginForm.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Загрузка...' : t('auth.login.signIn')}
            </Button>
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
            <div>
              <input
                {...registerForm.register('name')}
                type="text"
                placeholder={t('auth.register.name')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent"
              />
              {registerForm.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {registerForm.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...registerForm.register('email')}
                type="email"
                placeholder={t('auth.register.email')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent"
              />
              {registerForm.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {registerForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                {...registerForm.register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.register.password')}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? '👁️' : '🙈'}
              </button>
              {registerForm.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {registerForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                {...registerForm.register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t('auth.register.confirmPassword')}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27A430] focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? '👁️' : '🙈'}
              </button>
              {registerForm.formState.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {registerForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Загрузка...' : t('auth.register.createAccount')}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
