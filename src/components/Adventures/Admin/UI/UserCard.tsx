'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiFileText } from 'react-icons/fi';
import type { AdventureUser } from '@/types/adventures';
import { useTranslations } from 'next-intl';

interface UserCardProps {
    user: AdventureUser;
    articleCount: number;
    locale: string;
    onDelete?: (id: string) => void;
}

export const UserCard = ({ user, articleCount, locale, onDelete }: UserCardProps) => {
    const t = useTranslations('adventures.admin.users');

    return (
        <div className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-[#3ca542] dark:hover:border-[#3ca542] transition-all duration-300 hover:shadow-xl hover:shadow-[#3ca542]/10">
            {/* Header with gradient */}
            <div className="h-20 bg-gradient-to-br from-[#3ca542] to-emerald-600 relative">
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Avatar */}
            <div className="relative px-6 -mt-12">
                <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-900 shadow-lg">
                        <Image
                            src={user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name)}
                            alt={user.name}
                            width={96}
                            height={96}
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#3ca542] rounded-full border-2 border-white dark:border-slate-900"></div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-4 space-y-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                        {user.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {t('role')}
                    </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 py-3 px-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <FiFileText className="w-4 h-4" />
                        <span className="text-sm">
                            <span className="font-semibold text-slate-900 dark:text-white">{articleCount}</span> {t('articles')}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <Link
                        href={`/${locale}/prototype/adventures/admin/users/${user.id.toString()}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#3ca542] hover:bg-[#348e39] text-white text-sm font-medium transition-colors"
                    >
                        <FiEdit className="w-4 h-4" />
                        <span>{t('edit')}</span>
                    </Link>

                    <button
                        onClick={() => onDelete?.(user.id.toString())}
                        className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                        <FiTrash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
