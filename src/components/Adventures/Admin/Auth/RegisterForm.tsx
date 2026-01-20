'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiAlertCircle, FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import AuthLayout from './AuthLayout';
import { toast } from 'react-toastify';
import { useAdventuresRegister } from '@/api/adventures/auth';

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
    message: "passwordsNoMatch",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const t = useTranslations('adventures.admin.auth.register');
    const tv = useTranslations('adventures.admin.auth.validation');
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const locale = useLocale();
    const registerMutation = useAdventuresRegister();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setError(null);
        try {
            await registerMutation.mutateAsync(data);
            toast.success(t('registrationSuccess') || 'Registration successful! Redirecting to login...', {
                position: 'top-right',
                autoClose: 3000,
            });
            setTimeout(() => {
                router.push(`/${locale}/prototype/adventures/admin/login`);
            }, 1000);
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || t('registrationFailed');
            setError(errorMessage);
            toast.error(errorMessage, {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    };

    return (
        <AuthLayout heroTitle={t('heroTitle')} heroSubtitle={t('heroSubtitle')}>
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t('title')}</h2>
                <p className="text-slate-500 dark:text-slate-400">{t('subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm"
                        >
                            <FiAlertCircle className="shrink-0 w-5 h-5" />
                            <span>{error}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">{t('nameLabel')}</label>
                        <div className="relative group">
                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3ca542] transition-colors" />
                            <input
                                {...register('name')}
                                type="text"
                                placeholder={t('namePlaceholder')}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-[#3ca542]/20 focus:border-[#3ca542] transition-all text-slate-900 dark:text-white"
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{tv('nameMin')}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">{t('emailLabel')}</label>
                        <div className="relative group">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3ca542] transition-colors" />
                            <input
                                {...register('email')}
                                type="email"
                                placeholder={t('emailPlaceholder')}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-[#3ca542]/20 focus:border-[#3ca542] transition-all text-slate-900 dark:text-white"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{tv('invalidEmail')}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">{t('passwordLabel')}</label>
                        <div className="relative group">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3ca542] transition-colors" />
                            <input
                                {...register('password')}
                                type={showPassword ? 'text' : 'password'}
                                placeholder={t('passwordPlaceholder')}
                                className="w-full pl-12 pr-12 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-[#3ca542]/20 focus:border-[#3ca542] transition-all text-slate-900 dark:text-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{tv('passwordMin')}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">{t('confirmPasswordLabel')}</label>
                        <div className="relative group">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3ca542] transition-colors" />
                            <input
                                {...register('confirmPassword')}
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder={t('confirmPasswordPlaceholder')}
                                className="w-full pl-12 pr-12 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-[#3ca542]/20 focus:border-[#3ca542] transition-all text-slate-900 dark:text-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1">{tv('passwordsNoMatch')}</p>}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#3ca542] text-white font-semibold py-4 rounded-2xl hover:bg-[#348e39] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-[#3ca542]/10 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <span>{t('createAccountBtn')}</span>
                            <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </>
                    )}
                </button>

                <div className="text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        {t('haveAccount')}{' '}
                        <Link href={`/${locale}/prototype/adventures/admin/login`} className="font-medium text-[#3ca542] hover:text-[#348e39] transition-colors">
                            {t('signInLink')}
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
}
