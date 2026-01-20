'use client';

import { useParams } from 'next/navigation';
import { useAdventuresUser } from '@/api/adventures/users';
import UserForm from '@/components/Adventures/Admin/Users/UserForm';
import { useTranslations } from 'next-intl';

interface EditUserWrapperProps {
    locale: string;
}

export default function EditUserWrapper({ locale }: EditUserWrapperProps) {
    const { id } = useParams();
    const { data: user, isLoading: isUserLoading } = useAdventuresUser(id as string);

    const t = useTranslations('adventures.admin.users');

    if (isUserLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3ca542]"></div>
        </div>
    );

    if (!user) return <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">{t('noMatches')}</div>;

    const initialFormData = {
        name: user.name,
        email: user.email || '',
        role: (user as any).role || 'EDITOR',
        avatar: user.avatar || '',
        password: ''
    };

    return <UserForm locale={locale} id={id as string} initialData={initialFormData} mode="edit" />;
}
