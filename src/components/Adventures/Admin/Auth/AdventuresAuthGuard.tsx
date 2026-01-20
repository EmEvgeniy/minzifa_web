'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAdventuresAuthStore } from '@/store/adventures/useAdventuresAuthStore';
import { useLocale } from 'next-intl';
import { useCurrentUser } from '@/api/adventures/profile';

interface AdventuresAuthGuardProps {
    children: React.ReactNode;
}

export const AdventuresAuthGuard = ({ children }: AdventuresAuthGuardProps) => {
    const { isAuthenticated, token, user, setUser } = useAdventuresAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const [isMounted, setIsMounted] = useState(false);
    const isAuthPage = pathname.includes('/login') || pathname.includes('/register');

    // Sync user data if authenticated and NOT on login/register pages
    const { data: userData } = useCurrentUser({
        enabled: isMounted && !isAuthPage && !!token
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (userData) {
            setUser(userData);
        }
    }, [userData, setUser]);

    useEffect(() => {
        if (!isMounted) return;

        const loginPath = `/${locale}/prototype/adventures/admin/login`;
        const articlesPath = `/${locale}/prototype/adventures/admin/articles`;
        const isAdminRoute = pathname.includes('/prototype/adventures/admin') && !isAuthPage;

        if (isAdminRoute && !isAuthenticated && !token) {
            router.replace(loginPath);
            return;
        }

        // Role-based protection
        if (isAdminRoute && isAuthenticated && user) {
            const userRole = user.role;

            // EDITOR/SEO can only access articles and profile
            if (userRole === 'EDITOR' || userRole === 'SEO') {
                const isRestricted = pathname.includes('/admin/users') || pathname.includes('/admin/categories');
                if (isRestricted) {
                    router.replace(articlesPath);
                }
            }

            // MODERATOR cannot access users
            if (userRole === 'MODERATOR' && pathname.includes('/admin/users')) {
                router.replace(articlesPath);
            }
        }
    }, [isAuthenticated, token, user, pathname, router, locale, isMounted, isAuthPage]);

    if (!isMounted) return null;

    const isAdminRoute = pathname.includes('/prototype/adventures/admin') && !isAuthPage;

    if (isAdminRoute && !isAuthenticated && !token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3ca542]"></div>
            </div>
        );
    }

    return <>{children}</>;
};
