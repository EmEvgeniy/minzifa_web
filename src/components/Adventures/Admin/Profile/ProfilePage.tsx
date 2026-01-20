'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock, FiSave } from 'react-icons/fi';
import { useCurrentUser, useUpdateProfile, useChangePassword } from '@/api/adventures/profile';
import { AdventureUser } from '@/types/adventures';

// Profile form schema
const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
});

// Password change schema
const passwordSchema = z.object({
    current_password: z.string().min(6, 'Password must be at least 6 characters'),
    new_password: z.string().min(6, 'Password must be at least 6 characters'),
    confirm_password: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

interface ProfilePageProps {
    locale: string;
}

export default function ProfilePage({ locale }: ProfilePageProps) {
    const { data: user, isLoading } = useCurrentUser();
    const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3ca542]"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto pb-20 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Profile Settings
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Manage your account settings and preferences
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-800">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${activeTab === 'profile'
                        ? 'border-[#3ca542] text-[#3ca542] dark:text-[#4bd651]'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <FiUser className="w-4 h-4" />
                        <span>Profile Information</span>
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('password')}
                    className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${activeTab === 'password'
                        ? 'border-[#3ca542] text-[#3ca542] dark:text-[#4bd651]'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <FiLock className="w-4 h-4" />
                        <span>Change Password</span>
                    </div>
                </button>
            </div>

            <div className="max-w-3xl">
                {activeTab === 'profile' ? (
                    <ProfileForm user={user} />
                ) : (
                    <PasswordChangeForm />
                )}
            </div>
        </div>
    );
}

// Profile Form Component
function ProfileForm({ user }: { user: AdventureUser | undefined }) {
    const updateProfile = useUpdateProfile();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                email: user.email,
            });
        }
    }, [user, reset]);

    const onSubmit = async (data: ProfileFormData) => {
        setIsSubmitting(true);
        try {
            await updateProfile.mutateAsync(data);
            toast.success('Profile updated successfully!');
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || 'Failed to update profile';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Personal Information
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#3ca542] to-emerald-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-[#3ca542]/20 uppercase">
                        {user?.name ? (user.name.split(' ').length >= 2 ? (user.name.split(' ')[0][0] + user.name.split(' ')[1][0]).toUpperCase() : user.name.slice(0, 2).toUpperCase()) : 'AD'}
                    </div>
                    <div>
                        <button
                            type="button"
                            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-semibold transition-all"
                        >
                            Change Avatar
                        </button>
                        <p className="text-xs text-slate-400 mt-2">JPG, PNG or GIF. Max 2MB</p>
                    </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                        Full Name
                    </label>
                    <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            {...register('name')}
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.name
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-200 dark:border-slate-700 focus:ring-[#3ca542]/40'
                                } bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-4 transition-all`}
                            placeholder="John Doe"
                        />
                    </div>
                    {errors.name && (
                        <p className="text-xs text-red-500 ml-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                        Email Address
                    </label>
                    <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            {...register('email')}
                            type="email"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.email
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-200 dark:border-slate-700 focus:ring-[#3ca542]/40'
                                } bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-4 transition-all`}
                            placeholder="john@example.com"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs text-red-500 ml-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Role (Read-only) */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                        Role
                    </label>
                    <input
                        value={user?.role || 'EDITOR'}
                        disabled
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-[#3ca542] text-white rounded-xl font-bold hover:bg-[#348e39] transition-all shadow-lg shadow-[#3ca542]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <FiSave className="w-5 h-5" />
                    )}
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}

// Password Change Form Component
function PasswordChangeForm() {
    const changePassword = useChangePassword();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
    });

    const onSubmit = async (data: PasswordFormData) => {
        setIsSubmitting(true);
        try {
            await changePassword.mutateAsync(data);
            toast.success('Password changed successfully!');
            reset();
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || 'Failed to change password';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Change Password
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Current Password */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                        Current Password
                    </label>
                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            {...register('current_password')}
                            type="password"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.current_password
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-200 dark:border-slate-700 focus:ring-[#3ca542]/40'
                                } bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-4 transition-all`}
                            placeholder="••••••••"
                        />
                    </div>
                    {errors.current_password && (
                        <p className="text-xs text-red-500 ml-1">{errors.current_password.message}</p>
                    )}
                </div>

                {/* New Password */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                        New Password
                    </label>
                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            {...register('new_password')}
                            type="password"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.new_password
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-200 dark:border-slate-700 focus:ring-[#3ca542]/40'
                                } bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-4 transition-all`}
                            placeholder="••••••••"
                        />
                    </div>
                    {errors.new_password && (
                        <p className="text-xs text-red-500 ml-1">{errors.new_password.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            {...register('confirm_password')}
                            type="password"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.confirm_password
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-200 dark:border-slate-700 focus:ring-[#3ca542]/40'
                                } bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-4 transition-all`}
                            placeholder="••••••••"
                        />
                    </div>
                    {errors.confirm_password && (
                        <p className="text-xs text-red-500 ml-1">{errors.confirm_password.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-[#3ca542] text-white rounded-xl font-bold hover:bg-[#348e39] transition-all shadow-lg shadow-[#3ca542]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <FiLock className="w-5 h-5" />
                    )}
                    {isSubmitting ? 'Changing...' : 'Change Password'}
                </button>
            </form>
        </div>
    );
}

