'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiSave, FiUser, FiMail, FiShield, FiCamera, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { useCreateAdventuresUser, useUpdateAdventuresUser, useDeleteAdventuresUser } from '@/api/adventures/users';
import { AdventureRole } from '@/types/adventures';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

interface UserFormData {
    name: string;
    email: string;
    role: string;
    password?: string;
}

interface UserFormProps {
    locale: string;
    id?: string | number;
    initialData?: UserFormData;
    mode: 'create' | 'edit';
}

export default function UserForm({ locale, id, initialData, mode }: UserFormProps) {
    const t = useTranslations('adventures.admin.users');
    const router = useRouter();
    const createUser = useCreateAdventuresUser();
    const updateUser = useUpdateAdventuresUser();
    const deleteUser = useDeleteAdventuresUser();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<UserFormData>(initialData || {
        name: '',
        email: '',
        role: 'EDITOR',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (mode === 'create') {
                await createUser.mutateAsync(formData as any);
                toast.success(t('toasts.createSuccess'));
            } else {
                await updateUser.mutateAsync({
                    id: id as string | number,
                    data: formData as any
                });
                toast.success(t('toasts.updateSuccess'));
            }
            router.push(`/${locale}/prototype/adventures/admin/users`);
        } catch (error) {
            console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} user:`, error);
            toast.error(mode === 'create' ? t('toasts.createError') : t('toasts.updateError'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (mode === 'edit' && id && window.confirm(t('form.deleteConfirm'))) {
            try {
                await deleteUser.mutateAsync(id);
                toast.success(t('toasts.deleteSuccess'));
                router.push(`/${locale}/prototype/adventures/admin/users`);
            } catch (error) {
                toast.error(t('toasts.deleteError'));
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href={`/${locale}/prototype/adventures/admin/users`}
                        className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {mode === 'create' ? t('form.titleAdd') : t('form.titleEdit')}
                        </h1>
                        <p className="text-sm text-slate-500">
                            {mode === 'create' ? t('form.descriptionAdd') : t('form.descriptionEdit')}
                        </p>
                    </div>
                </div>

                {mode === 'edit' && (
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                    >
                        <FiTrash2 className="w-4 h-4" />
                        <span>{t('form.delete')}</span>
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                {/* Main Form */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                        <div className="space-y-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">{t('form.displayName')}</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3ca542] transition-colors">
                                        <FiUser size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3ca542]/20 focus:border-[#3ca542] transition-all text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">{t('form.email')}</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3ca542] transition-colors">
                                        <FiMail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="john@example.com"
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3ca542]/20 focus:border-[#3ca542] transition-all text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                                    {mode === 'create' ? t('form.password') : t('form.passwordEdit')}
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3ca542] transition-colors">
                                        <FiShield size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        required={mode === 'create'}
                                        value={formData.password ?? ''}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3ca542]/20 focus:border-[#3ca542] transition-all text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 px-8 py-4 bg-[#3ca542] hover:bg-[#348e39] text-white rounded-2xl font-bold shadow-lg shadow-[#3ca542]/20 transition-all transform active:scale-[0.98] disabled:opacity-70"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <FiSave className="w-5 h-5" />
                                    <span>{mode === 'create' ? t('form.create') : t('form.save')}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Role Selection */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white">
                            <FiShield className="text-[#3ca542]" />
                            <h2 className="font-bold">{t('form.role')}</h2>
                        </div>
                        <div className="space-y-2">
                            {['ADMIN', 'MODERATOR', 'SEO', 'EDITOR'].map((role) => (
                                <label
                                    key={role}
                                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${formData.role === role
                                        ? 'border-[#3ca542] bg-[#3ca542]/5'
                                        : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                                        }`}
                                >
                                    <span className={`text-sm font-medium ${formData.role === role ? 'text-[#3ca542]' : 'text-slate-600 dark:text-slate-400'}`}>
                                        {role}
                                    </span>
                                    <input
                                        type="radio"
                                        name="role"
                                        value={role}
                                        checked={formData.role === role}
                                        onChange={() => setFormData({ ...formData, role })}
                                        className="w-4 h-4 text-[#3ca542] focus:ring-[#3ca542] border-slate-300 rounded-full"
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
