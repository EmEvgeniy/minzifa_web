'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiFileText, FiUser, FiMail } from 'react-icons/fi';
import type { AdventureUser, AdventureRoles } from '@/types/adventures';
import { useTranslations } from 'next-intl';

interface UserTableProps {
    users: AdventureUser[];
    getUserArticleCount: (userId: string) => number;
    locale: string;
    onDelete?: (id: string) => void;
}

const RoleBadge = ({ role }: { role: AdventureRoles }) => {
    const styles = {
        ADMIN: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800',
        EDITOR: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
        MODERATOR: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800',
        SEO: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[role] || styles.EDITOR}`}>
            {role}
        </span>
    );
};

export const UserTable = ({ users, getUserArticleCount, locale, onDelete }: UserTableProps) => {
    const t = useTranslations('adventures.admin.users');

    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('member')}</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('role')}</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">{t('articles')}</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('joined')}</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <div className="font-bold text-slate-900 dark:text-white group-hover:text-[#3ca542] transition-colors line-clamp-1">
                                                {user.name}
                                            </div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <RoleBadge role={user.role as any} />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold">
                                        <FiFileText className="w-3.5 h-3.5" />
                                        {getUserArticleCount(user.id.toString())}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-slate-600 dark:text-slate-400">
                                        {user?.created_at ? new Date(user?.created_at).toLocaleDateString(locale, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        }) : '—'}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/${locale}/prototype/adventures/admin/users/${user.id.toString()}`}
                                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#3ca542] hover:text-white text-slate-600 dark:text-slate-400 transition-all"
                                            title={t('edit')}
                                        >
                                            <FiEdit className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => onDelete?.(user?.id?.toString())}
                                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-600 dark:text-slate-400 transition-all"
                                            title={t('form.delete')}
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
