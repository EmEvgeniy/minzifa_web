'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

interface AuthLayoutProps {
    children: React.ReactNode;
    heroTitle: string;
    heroSubtitle: string;
}

export default function AuthLayout({ children, heroTitle, heroSubtitle }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex bg-white dark:bg-slate-950 overflow-hidden">
            {/* Top Right Controls */}
            <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
                <LanguageSwitcher />
                <ThemeSwitcher />
            </div>

            {/* Left Side: Image */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:block lg:w-1/2 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-[#3ca542]/0 mix-blend-multiply z-10" />
                <Image
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070"
                    alt="Silk Road"
                    fill
                    className="object-cover scale-105 hover:scale-100 transition-transform duration-[10s] ease-linear"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-20" />

                <div className="absolute bottom-12 left-12 z-30 max-w-md">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-4xl font-bold text-white mb-4 leading-tight"
                    >
                        {heroTitle}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-slate-200 text-lg font-light"
                    >
                        {heroSubtitle}
                    </motion.p>
                </div>
            </motion.div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#3ca542]/5 blur-[100px] -z-10 rounded-full" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] -z-10 rounded-full" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {children}

                    <footer className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
                        &copy; {new Date().getFullYear()} Minzifa Travel. All rights reserved.
                    </footer>
                </motion.div>
            </div>
        </div>
    );
}
