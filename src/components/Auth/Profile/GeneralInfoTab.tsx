'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { profileEditSchema, ProfileEditFormType } from '@/validation/profileEditSchema';
import Button from '@/components/UI/Button/Button';
import { Input } from '@/components/UI/Form';
import Loader from '@/components/UI/Loader/Loader';
import { ITourist, useAuthStore } from '@/store';
import { AvatarUpload } from '../AvatarUpload';
import { usePatchMutation } from '@/api/patch.api';
import { PhoneInputComp } from '../../UI';
import { useSnackStore } from '@/store/useSnackStore';

type ProfileUpdateResponse = {
    user: ITourist;
};

interface GeneralInfoTabProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    user: ITourist;
}

export const GeneralInfoTab = ({ onSuccess, onCancel, user }: GeneralInfoTabProps) => {
    const t = useTranslations();
    const { login } = useAuthStore();
    const { setMessage, setError } = useSnackStore();
    const { register, control, formState: { errors, isValid, isSubmitting }, handleSubmit, reset } = useForm<ProfileEditFormType>({
        resolver: zodResolver(profileEditSchema(t)),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
        },
    });

    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const [avatarError, setAvatarError] = useState<string | undefined>();

    const { mutate } = usePatchMutation<ProfileUpdateResponse, ProfileEditFormType>(
        ['profile-update'],
        (response) => {
            login(response.user);
            setMessage(t('profile.updateSuccess'));
            onSuccess?.();
            reset();
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

    return (
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
                className="text-base md:text-sm"
            />

            <Input
                {...register('email')}
                type="email"
                label={t('profile.email')}
                placeholder={t('profile.email')}
                error={errors.email}
                className="text-base md:text-sm"
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

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button
                    type="submit"
                    className="flex-1 py-3 md:py-2 text-base md:text-sm"
                    disabled={isSubmitting || !isValid}
                >
                    {isSubmitting ? <Loader /> : t('profile.save')}
                </Button>
                <Button
                    type="button"
                    color="gray"
                    className="flex-1 py-3 md:py-2 text-base md:text-sm"
                    onClick={onCancel}
                >
                    {t('profile.cancel')}
                </Button>
            </div>
        </form>
    );
};