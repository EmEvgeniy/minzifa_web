'use client';

import { ThemeSwitcher } from './ThemeSwitcher';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useAdventuresAuthStore } from '@/store/adventures/useAdventuresAuthStore';

export const AdminHeader = ({ locale }: { locale: string }) => {
    const pathname = usePathname();
    const { user } = useAdventuresAuthStore();

    // Get page title from pathname
    const getPageTitle = () => {
        const segments = pathname?.split('/').filter(Boolean) || [];
        const lastSegment = segments[segments.length - 1];

        // Check if last segment is a number (ID)
        if (!isNaN(Number(lastSegment))) {
            // Use parent segment instead
            const parentSegment = segments[segments.length - 2];
            return parentSegment ? parentSegment.charAt(0).toUpperCase() + parentSegment.slice(1) : 'Dashboard';
        }

        // Regular page
        const pageName = lastSegment || 'Dashboard';
        return pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/-/g, ' ');
    };

    const formattedTitle = getPageTitle();

    return (
        <header className="h-20 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 flex justify-between items-center px-8 fixed top-0 right-0 left-64 z-40 transition-all duration-300 shadow-sm">
            <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight font-title">
                    {formattedTitle === 'Admin' ? 'Dashboard' : formattedTitle}
                </h2>
            </div>

            <div className="flex items-center gap-6">
                <LanguageDropdown currentLocale={locale} />

                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>

                <ThemeSwitcher />

                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>

                <UserProfileDropdown locale={locale} user={user} />
            </div>
        </header>
    );
};

const LanguageDropdown = ({ currentLocale }: { currentLocale: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const toggleOpen = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const languages = [
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    ];

    const currentLang = languages.find(l => l.code === currentLocale) || languages[0];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleOpen}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 transition-all duration-200 text-slate-700 dark:text-slate-200 font-medium text-sm group"
            >
                <span className="text-base group-hover:scale-110 transition-transform duration-200">{currentLang.flag}</span>
                <span className="uppercase tracking-wider font-semibold text-xs">{currentLang.code}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-700 overflow-hidden py-1 z-50"
                    >
                        {languages.map((lang) => {
                            const newPath = pathname.replace(`/${currentLocale}`, `/${lang.code}`);
                            const isActive = currentLocale === lang.code;
                            return (
                                <Link
                                    key={lang.code}
                                    href={newPath}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all relative ${isActive
                                        ? 'bg-[#3ca542]/10 dark:bg-[#3ca542]/20 text-[#3ca542] dark:text-[#4bd651] font-semibold'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:pl-5'
                                        }`}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#3ca542]"></div>
                                    )}
                                    <span className="text-xl shadow-sm rounded-sm overflow-hidden">{lang.flag}</span>
                                    <span>{lang.label}</span>
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const UserProfileDropdown = ({ locale, user }: { locale: string; user: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { logout } = useAdventuresAuthStore();

    const toggleOpen = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            logout();
            window.location.href = `/${locale}/prototype/adventures/admin/login`;
        } catch (error) {
            console.error('Logout error:', error);
            setIsLoggingOut(false);
        }
    };

    const getInitials = (name: string) => {
        if (!name) return 'AD';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleOpen}
                className="flex items-center gap-3 pl-2 hover:opacity-80 transition-opacity"
            >
                <div className="text-right hidden sm:block">
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">
                        {user?.name || '...'}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                        {user?.email || ''}
                    </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3ca542] to-emerald-500 flex items-center justify-center text-white font-bold shadow-lg shadow-[#3ca542]/20 ring-2 ring-white dark:ring-slate-800 cursor-pointer hover:ring-emerald-100 dark:hover:ring-emerald-900/30 transition-all">
                    {getInitials(user?.name || '')}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-700 overflow-hidden py-1 z-50"
                    >
                        <Link
                            href={`/${locale}/prototype/adventures/admin/profile`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Profile</span>
                        </Link>

                        <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>

                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoggingOut ? (
                                <div className="w-5 h-5 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            )}
                            <span>Logout</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
