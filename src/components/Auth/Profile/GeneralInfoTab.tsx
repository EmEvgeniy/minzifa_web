'use client';

import { usePatchMutation } from '@/api/patch.api';
import Button from '@/components/UI/Button/Button';
import { Input } from '@/components/UI/Form';
import Loader from '@/components/UI/Loader/Loader';
import { ITourist, useAuthStore } from '@/store';
import { useSnackStore } from '@/store/useSnackStore';
import { authApi } from '@/utils/http';
import { ProfileEditFormType, profileEditSchema } from '@/validation/profileEditSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PhoneInputComp } from '../../UI';
import { AvatarUpload } from '../AvatarUpload';

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
    const { setUser } = useAuthStore();
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
    const [isDeletingAvatar, setIsDeletingAvatar] = useState(false);
    const [avatarError, setAvatarError] = useState<string | undefined>();

    const { mutate } = usePatchMutation<ProfileUpdateResponse, ProfileEditFormType>(
        ['profile-update'],
        (response) => {
            setUser(response.user);
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

            const response = await authApi<{ user: ITourist }>('/auth/avatar/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.user) {
                setUser(response.user);
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

    return (
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
                className="text-base md:text-sm"
            />

            <Input
                {...register('email')}
                type="email"
                label={t('profile.email')}
                placeholder={t('profile.email')}
                error={!!errors.email}
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
                        error={!!errors.phone}
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