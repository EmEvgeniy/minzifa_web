'use client';

import { GoogleReCaptchaProvider } from '@google-recaptcha/react';
import { useLocale } from 'next-intl';

interface ReCaptchaProviderProps {
    children: React.ReactNode;
    siteKey: string;
}

export function ReCaptchaProvider({ children, siteKey }: ReCaptchaProviderProps) {
    const locale = useLocale();

    return (
        <GoogleReCaptchaProvider type="v3" siteKey={siteKey} language={locale} isEnterprise>
            {children}
        </GoogleReCaptchaProvider>
    );
}