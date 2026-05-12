'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useSearchParams } from 'next/navigation';
import { authApi } from '@/utils/http';
import type { ITourist } from '@/types';

interface AuthCheckProviderProps {
    children: ReactNode;
}

export function AuthCheckProvider({ children }: AuthCheckProviderProps) {
    const { login, setAuthPopup } = useAuthStore();
    const searchParams = useSearchParams();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const user = await authApi<ITourist>('/auth/me');
                login(user);
            } catch {
                // Not authenticated — that's fine, user stays null
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
    }, [searchParams, setAuthPopup, login]);

    if (!checked) return null;

    return <>{children}</>;
}
