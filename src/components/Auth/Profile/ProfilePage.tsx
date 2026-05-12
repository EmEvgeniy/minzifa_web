'use client';

import { useTranslations } from 'next-intl';
import { ProfileEditForm } from './ProfileEditForm';

export default function ProfilePage() {
    const t = useTranslations('profile');

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 lg:mb-12">{t('title')}</h1>
            <div className="max-w-6xl flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="flex-1">
                    <div className="w-full mx-auto">
                        <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 lg:p-10 border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-xl">
                            <ProfileEditForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}