'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useSearchParams } from 'next/navigation';
import { authAxiosInstance } from '@/utils/axios';
import { AxiosError } from 'axios';
import GoogleOneTap from '@/components/Auth/Forms/GoogleOneTap';

interface AuthCheckProviderProps {
    children: ReactNode;
}

export function AuthCheckProvider({ children }: AuthCheckProviderProps) {
    const { logout, setAuthPopup } = useAuthStore();
    const searchParams = useSearchParams();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const token = useAuthStore.getState().token;
            if (!token) {
                setChecked(true);
                return;
            }

            try {
                await authAxiosInstance.get('/auth/check');
            } catch (e: AxiosError | any) {
                if (e.response?.status === 401 || e.response?.status === 419) {
                    logout();
                }
            } finally {
                setChecked(true);
            }
        };

        checkSession();

        if (searchParams.get('require-auth') === '1') {
            setAuthPopup(true);
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('require-auth');
            window.history.replaceState({}, '', newUrl);
        }
    }, []);

    if (!checked) return null;

    return <>{children}</>;
}
