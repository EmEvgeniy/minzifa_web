'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FaFile, FaFolder, FaUsers } from 'react-icons/fa6';
import { useAdventuresAuthStore } from '@/store/adventures/useAdventuresAuthStore';

interface SidebarProps {
    locale: string;
}

export const Sidebar = ({ locale }: SidebarProps) => {
    const t = useTranslations('adventures.admin.sidebar');
    const { user } = useAdventuresAuthStore();
    const userRole = user?.role || 'EDITOR';

    return (
        <aside className="w-64 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl flex flex-col h-screen fixed left-0 top-0 border-r border-slate-200 dark:border-slate-800 z-50 transition-colors duration-300 shadow-lg dark:shadow-slate-900/20">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <Link href={`/${locale}/prototype/adventures`} className="group flex items-center gap-3">
                    <img
                        src="/adventures/logo-black.svg"
                        alt="Adventures Logo"
                        className="h-8 w-auto dark:invert transition-all group-hover:scale-105"
                    />
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-4">
                <NavLink href={`/${locale}/prototype/adventures/admin/articles`} label={t('articles')} icon={<FaFile className="w-5 h-5" />} />

                {(userRole === 'ADMIN' || userRole === 'MODERATOR') && (
                    <NavLink href={`/${locale}/prototype/adventures/admin/categories`} label={t('categories')} icon={<FaFolder className="w-5 h-5" />} />
                )}

                {userRole === 'ADMIN' && (
                    <NavLink href={`/${locale}/prototype/adventures/admin/users`} label={t('users')} icon={<FaUsers className="w-5 h-5" />} />
                )}
            </nav>
        </aside>
    );
};

const NavLink = ({ href, label, icon }: { href: string; label: string; icon?: React.ReactNode }) => {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(`${href}/`);

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                ? 'bg-[#3ca542]/10 dark:bg-[#3ca542]/20 text-[#3ca542] dark:text-[#4bd651] font-semibold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
        >
            {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#3ca542] dark:bg-[#4bd651] rounded-r-full" />
            )}
            <span className={`transition-colors ${isActive ? 'text-[#3ca542] dark:text-[#4bd651]' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}>
                {icon || <span className="w-5 h-5 block bg-current opacity-20 rounded-full" />}
            </span>
            {label}
        </Link>
    );
};
