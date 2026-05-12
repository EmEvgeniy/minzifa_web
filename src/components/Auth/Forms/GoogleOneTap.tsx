'use client';

import { ITourist, useAuthStore } from '@/store';
import { useAuthPostMutation } from '@/api/post.api';
import Script from "next/script";
import { useEffect, useState } from 'react';
import { useSnackStore } from '@/store/useSnackStore';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface GoogleCredentialResponse {
    credential: string;
}

interface GoogleNotification {
    isNotDisplayed: () => boolean;
    isSkippedMoment: () => boolean;
    isDismissedMoment: () => boolean;
}

interface GoogleAccounts {
    id: {
        initialize: (config: {
            client_id: string;
            use_fedcm_for_prompt: boolean;
            callback: (response: GoogleCredentialResponse) => void;
        }) => void;
        prompt: (callback: (notification: GoogleNotification) => void) => void;
    };
}

declare global {
    interface Window {
        google: {
            accounts: GoogleAccounts;
        };
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
        (data: { success: boolean; user: ITourist }) => {
            if (data.success && data.user) {
                login(data.user);
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
                callback: async (response: GoogleCredentialResponse) => {
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

            window.google.accounts.id.prompt((notification: GoogleNotification) => {
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
