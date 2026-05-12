'use client';

import { useAuthPatchMutation } from '@/api/patch.api';
import { useAuthPostMutation } from '@/api/post.api';
import TelegramSubscription from '@/components/Profile/TelegramSubscription';
import Button from '@/components/UI/Button/Button';
import { Input } from '@/components/UI/Form';
import Loader from '@/components/UI/Loader/Loader';
import { ITourist, useAuthStore } from '@/store';
import { useSnackStore } from '@/store/useSnackStore';
import { authApi } from '@/utils/http';
import { PasswordChangeFormType, passwordChangeSchema, ProfileEditFormType, profileEditSchema } from '@/validation/profileEditSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PhoneInputComp } from '../../UI';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../UI/Tabs';
import { AvatarUpload } from '../AvatarUpload';

type ProfileUpdateResponse = {
    user: ITourist;
};

type PasswordChangeResponse = {
    message: string;
};

export const ProfileEditForm = () => {
    const t = useTranslations();
    const { setMessage, setError } = useSnackStore();
    const { user, setUser } = useAuthStore();
    const [activeTab, setActiveTab] = useState(0);

    const { register, control, formState: { errors, isValid, isLoading }, handleSubmit, reset } = useForm<ProfileEditFormType>({
        resolver: zodResolver(profileEditSchema(t)),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
        },
    });

    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const [isDeletingAvatar, setIsDeletingAvatar] = useState(false);
    const [avatarError, setAvatarError] = useState<string | undefined>();

    const { register: registerPassword, formState: { errors: passwordErrors, isValid: isPasswordValid, isLoading: isPasswordLoading }, handleSubmit: handlePasswordSubmit, reset: resetPassword } = useForm<PasswordChangeFormType>({
        resolver: zodResolver(passwordChangeSchema(t)),
        defaultValues: {
            current_password: '',
            new_password: '',
            confirm_new_password: '',
        },
    });

    const { mutate } = useAuthPatchMutation<ProfileUpdateResponse, ProfileEditFormType>(
        ['profile-update'],
        (response) => {
            setUser(response.user);
            setMessage(t('profile.updateSuccess'));
            reset();
        },
        (error) => {
            setError(error?.message || t('errors.general'));
        }
    );

    const { mutate: mutatePassword } = useAuthPostMutation<PasswordChangeResponse, PasswordChangeFormType>(
        ['password-change'],
        (response) => {
            setMessage(response.message || t('profile.passwordChangeSuccess'));
            resetPassword();
        },
        (error) => {
            setError(error?.message || t('errors.general'));
        }
    );

    const handleAvatarUpload = async (file: File) => {
        setIsUploadingAvatar(true);
        setAvatarError(undefined);

        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await authApi<{ user: ITourist }>('/auth/avatar/upload', {
                method: 'POST',
                body: formData,
            });

            const result = response;
            if (result.user) {
                setUser(result.user);
            }
        } catch {
            setAvatarError(t('profile.avatarUploadError') || 'Ошибка загрузки аватара');
        } finally {
            setIsUploadingAvatar(false);
        }
    };

    const handleAvatarDelete = async () => {
        setIsDeletingAvatar(true);
        setAvatarError(undefined);

        try {
            const response = await authApi<{ user: ITourist }>('/auth/avatar/delete', {
                method: 'DELETE',
            });

            if (response.user) {
                setUser(response.user);
            }
        } catch {
            setAvatarError(t('profile.avatarDeleteError') || 'Ошибка удаления аватара');
        } finally {
            setIsDeletingAvatar(false);
        }
    };

    const onSubmit = async (data: ProfileEditFormType) => {
        mutate({
            obj: data,
            endpoint: 'auth/profile/update',
        });
    };

    const onPasswordSubmit = async (data: PasswordChangeFormType) => {
        mutatePassword({
            obj: data,
            endpoint: 'auth/change-password',
        });
    };

    const tabs = [
        {
            label: t('profile.generalInfo'),
            content: (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                        <AvatarUpload
                            user={user!}
                            onUpload={handleAvatarUpload}
                            onDelete={handleAvatarDelete}
                            isUploading={isUploadingAvatar || isDeletingAvatar}
                            error={avatarError}
                        />
                    </div>

                    <Input
                        {...register('name')}
                        type="text"
                        label={t('profile.name')}
                        placeholder={t('profile.name')}
                        error={!!errors.name}
                    />

                    <Input
                        {...register('email')}
                        type="email"
                        label={t('profile.email')}
                        placeholder={t('profile.email')}
                        error={!!errors.email}
                    />

                    <Controller
                        control={control}
                        name="phone"
                        render={({ field }) => (
                            <PhoneInputComp
                                {...field}
                                label={t('profile.phone')}
                                placeholder={t('profile.phone')}
                                error={!!errors.phone}
                            />
                        )}
                    />

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full py-3 md:py-2 text-base md:text-sm"
                            disabled={isLoading || !isValid}
                        >
                            {isLoading ? <Loader /> : t('profile.save')}
                        </Button>
                    </div>
                </form>
            ),
        },
        {
            label: t('profile.changePasswordTab'),
            content: (
                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4 md:space-y-6">
                    <div className="space-y-4">
                        <Input
                            {...registerPassword('current_password')}
                            type="password"
                            label={t('profile.currentPassword')}
                            placeholder={t('profile.currentPassword')}
                            error={!!passwordErrors.current_password}
                            className="text-base md:text-sm"
                        />

                        <Input
                            {...registerPassword('new_password')}
                            type="password"
                            label={t('profile.newPassword')}
                            placeholder={t('profile.newPassword')}
                            error={!!passwordErrors.new_password}
                            className="text-base md:text-sm"
                        />

                        <Input
                            {...registerPassword('confirm_new_password')}
                            type="password"
                            label={t('profile.confirmNewPassword')}
                            placeholder={t('profile.confirmNewPassword')}
                            error={!!passwordErrors.confirm_new_password}
                            className="text-base md:text-sm"
                        />

                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full py-3 md:py-2 text-base md:text-sm"
                                disabled={isPasswordLoading || !isPasswordValid}
                            >
                                {isPasswordLoading ? <Loader /> : t('profile.changePassword')}
                            </Button>
                        </div>
                    </div>
                </form>
            ),
        },
        {
            label: t('profile.telegram.title'),
            content: (
                <div className="space-y-6">
                    <TelegramSubscription
                        userId={user?.id || 0}
                        initialChatId={user?.telegram_chat_id}
                        botUsername="minzifa_travel_bot"
                    />
                </div>
            ),
        },
    ];

    return (
        <Tabs value={activeTab.toString()} onValueChange={(value) => setActiveTab(parseInt(value))}>
            <TabsList>
                <TabsTrigger value="0">{tabs[0].label}</TabsTrigger>
                <TabsTrigger value="1">{tabs[1].label}</TabsTrigger>
                <TabsTrigger value="2">{tabs[2].label}</TabsTrigger>
            </TabsList>
            <TabsContent value="0">{tabs[0].content}</TabsContent>
            <TabsContent value="1">{tabs[1].content}</TabsContent>
            <TabsContent value="2">{tabs[2].content}</TabsContent>
        </Tabs>
    );
};