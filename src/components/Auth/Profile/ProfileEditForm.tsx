'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { usePostMutation } from '@/api/post.api';
import { useSnackStore } from '@/store/useSnackStore';
import { profileEditSchema, passwordChangeSchema, ProfileEditFormType, PasswordChangeFormType } from '@/validation/profileEditSchema';
import Button from '@/components/UI/Button/Button';
import { Input } from '@/components/UI/Form';
import Loader from '@/components/UI/Loader/Loader';
import { ITourist, useAuthStore } from '@/store';
import { AvatarUpload } from '../AvatarUpload';
import { usePatchMutation } from '@/api/patch.api';
import { PhoneInputComp } from '../../UI';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../UI/Tabs';

type ProfileUpdateResponse = {
    user: ITourist;
};

type PasswordChangeResponse = {
    message: string;
};

export const ProfileEditForm = () => {
    const t = useTranslations();
    const { setMessage, setError } = useSnackStore();
    const { user, login } = useAuthStore();
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
    const [avatarError, setAvatarError] = useState<string | undefined>();

    const { register: registerPassword, formState: { errors: passwordErrors, isValid: isPasswordValid, isLoading: isPasswordLoading }, handleSubmit: handlePasswordSubmit, reset: resetPassword } = useForm<PasswordChangeFormType>({
        resolver: zodResolver(passwordChangeSchema(t)),
        defaultValues: {
            current_password: '',
            new_password: '',
            confirm_new_password: '',
        },
    });

    const { mutate } = usePatchMutation<ProfileUpdateResponse, ProfileEditFormType>(
        ['profile-update'],
        (response) => {
            login(response.user);
            setMessage(t('profile.updateSuccess'));
            reset();
        },
        (error) => {
            setError(error?.message || t('errors.general'));
        }
    );

    const { mutate: mutatePassword } = usePostMutation<PasswordChangeResponse, PasswordChangeFormType>(
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

            const response = await fetch('/api/v1/auth/avatar/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to upload avatar');
            }

            const result = await response.json();
            // Update user data with new avatar
            if (result.user) {
                login(result.user);
            }
        } catch (error) {
            setAvatarError(t('profile.avatarUploadError') || 'Ошибка загрузки аватара');
        } finally {
            setIsUploadingAvatar(false);
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
                            isUploading={isUploadingAvatar}
                            error={avatarError}
                        />
                    </div>

                    <Input
                        {...register('name')}
                        type="text"
                        label={t('profile.name')}
                        placeholder={t('profile.name')}
                        error={errors.name}
                    />

                    <Input
                        {...register('email')}
                        type="email"
                        label={t('profile.email')}
                        placeholder={t('profile.email')}
                        error={errors.email}
                    />

                    <Controller
                        control={control}
                        name="phone"
                        render={({ field }) => (
                            <PhoneInputComp
                                {...field}
                                label={t('profile.phone')}
                                placeholder={t('profile.phone')}
                                error={errors.phone}
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
                            error={passwordErrors.current_password}
                            className="text-base md:text-sm"
                        />

                        <Input
                            {...registerPassword('new_password')}
                            type="password"
                            label={t('profile.newPassword')}
                            placeholder={t('profile.newPassword')}
                            error={passwordErrors.new_password}
                            className="text-base md:text-sm"
                        />

                        <Input
                            {...registerPassword('confirm_new_password')}
                            type="password"
                            label={t('profile.confirmNewPassword')}
                            placeholder={t('profile.confirmNewPassword')}
                            error={passwordErrors.confirm_new_password}
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
    ];

    return (
        <Tabs value={activeTab.toString()} onValueChange={(value) => setActiveTab(parseInt(value))}>
            <TabsList>
                <TabsTrigger value="0">{tabs[0].label}</TabsTrigger>
                <TabsTrigger value="1">{tabs[1].label}</TabsTrigger>
            </TabsList>
            <TabsContent value="0">{tabs[0].content}</TabsContent>
            <TabsContent value="1">{tabs[1].content}</TabsContent>
        </Tabs>
    );
};