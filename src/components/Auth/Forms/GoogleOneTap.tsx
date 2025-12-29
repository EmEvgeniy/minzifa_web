'use client';

import { useAuthStore } from '@/store';
import { useAuthPostMutation } from '@/api/post.api';
import Script from "next/script";
import { useEffect, useState } from 'react';
import { useSnackStore } from '@/store/useSnackStore';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

declare global {
    interface Window {
        google: any;
    }
}

export default function GoogleOneTap() {
    const { isAuthenticated, login } = useAuthStore();
    const { setMessage } = useSnackStore();
    const t = useTranslations();
    const router = useRouter();
    const [scriptLoaded, setScriptLoaded] = useState(false);

    const { mutateAsync } = useAuthPostMutation(
        ['auth.google.one-tap'],
        (data: any) => {
            if (data.success && data.user && data.token) {
                login(data.user, data.token);
                setMessage(t('auth.login.success'));
                router.refresh();
            }
        },
        (error) => {
            console.error('One Tap login error:', error);
        }
    );

    useEffect(() => {
        if (!scriptLoaded || isAuthenticated) return;

        const initializeOneTap = () => {
            if (!window.google) return;

            window.google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
                use_fedcm_for_prompt: false,
                callback: async (response: any) => {
                    try {
                        await mutateAsync({
                            endpoint: 'auth/google/one-tap',
                            obj: { credential: response.credential }
                        });
                    } catch (error) {
                        console.error(error);
                    }
                },
            });

            window.google.accounts.id.prompt((notification: any) => {
                if (notification.isNotDisplayed()) console.log('UI blocked');
            });

        };

        initializeOneTap();
    }, [scriptLoaded, isAuthenticated, mutateAsync]);

    if (isAuthenticated) return null;

    return (
        <Script
            src="https://accounts.google.com/gsi/client"
            strategy="afterInteractive"
            onLoad={() => setScriptLoaded(true)}
        />
    );
}
