'use client';

import { useState } from 'react';
import { FiPlus, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { useAdventuresUsers, useDeleteAdventuresUser } from '@/api/adventures/users';
import { useArticles } from '@/api/adventures/articles';
import { SearchBar } from '@/components/Adventures/Admin/UI/SearchBar';
import { UserTable } from '@/components/Adventures/Admin/UI/UserTable';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

interface UsersListProps {
    locale: string;
}

export default function UsersList({ locale }: UsersListProps) {
    const t = useTranslations('adventures.admin.users');
    const { data: users, isLoading: isUsersLoading } = useAdventuresUsers();
    const { data: articles } = useArticles();
    const deleteUser = useDeleteAdventuresUser();
    const [searchQuery, setSearchQuery] = useState('');

    // Filter users
    const filteredUsers = (users || []).filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get article count for each user
    const getUserArticleCount = (userId: string) => {
        return (articles || []).filter(article => article.author?.id === userId).length;
    };

    const handleDelete = async (id: string) => {
        if (window.confirm(t('form.deleteConfirm'))) {
            try {
                await deleteUser.mutateAsync(id);
                toast.success(t('toasts.deleteSuccess'));
            } catch (error) {
                toast.error(t('toasts.deleteError'));
            }
        }
    };

    if (isUsersLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3ca542]"></div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                        {t('title')}
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {t('count', { count: filteredUsers.length })}
                    </p>
                </div>

                <Link
                    href={`/${locale}/prototype/adventures/admin/users/create`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#3ca542] hover:bg-[#348e39] text-white font-bold shadow-lg shadow-[#3ca542]/20 hover:shadow-xl hover:shadow-[#3ca542]/30 transition-all active:scale-[0.98]"
                >
                    <FiPlus className="w-5 h-5" />
                    <span>{t('addNew')}</span>
                </Link>
            </div>

            {/* Search */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <SearchBar
                    placeholder={t('search')}
                    onSearch={setSearchQuery}
                    className="max-w-xl"
                />
            </div>

            {/* Users Table */}
            {filteredUsers.length > 0 ? (
                <UserTable
                    users={filteredUsers}
                    getUserArticleCount={getUserArticleCount}
                    locale={locale}
                    onDelete={handleDelete}
                />
            ) : (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-700 mb-6">
                        <FiUser className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {t('noMatches')}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                        {t('search')}
                    </p>
                </div>
            )}
        </div>
    );
}
