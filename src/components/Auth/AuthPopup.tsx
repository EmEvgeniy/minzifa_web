'use client';

import { useAuthStore } from '@/store';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/UI/Tabs';
import { useTranslations } from 'next-intl';
import { Popup } from '../UI';
import Button from '../UI/Button/Button';
import { FaTimes } from 'react-icons/fa';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function AuthPopup() {
    const t = useTranslations();
    const searchParams = useSearchParams();

    const { authPopup, setAuthPopup } = useAuthStore();

    // Автоматическое открытие popup при ?require-auth=1
    useEffect(() => {
        const requireAuth = searchParams.get('require-auth');

        if (requireAuth === '1') {
            setAuthPopup(true);

            // Удаляем параметр из URL, чтобы popup не открывался снова
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('require-auth');
            window.history.replaceState({}, '', newUrl);
        }
    }, []);

    const handleClose = () => {
        setAuthPopup(false);
    };

    if (!authPopup) return null;

    return (
        <Popup
            open={authPopup}
            handleCloseAction={handleClose}
            content={(
                <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[#16372D]">
                            {t('auth.title')}
                        </h2>
                    </div>

                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">{t('auth.login.title')}</TabsTrigger>
                            <TabsTrigger value="register">{t('auth.register.title')}</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login" className="mt-6">
                            <LoginForm />
                        </TabsContent>

                        <TabsContent value="register" className="mt-6">
                            <RegisterForm />
                        </TabsContent>
                    </Tabs>
                </div>
            )}
            className="w-full max-w-md"
            timesButton={
                <Button
                    onClick={handleClose}
                    color="link"
                    className="text-gray-500 hover:text-gray-700 p-0 h-auto min-h-0 absolute top-4 right-4 z-10"
                >
                    <FaTimes size={16} />
                </Button>
            }
        />
    );
}
