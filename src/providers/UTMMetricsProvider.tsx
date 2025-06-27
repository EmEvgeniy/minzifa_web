'use client';

import { useMetricsStore } from '@/store/useMetricsStore';
import { useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export const UTMMetricsProvider = ({ children }: { children: ReactNode }) => {
    const searchParams = useSearchParams();
    const setMetrics = useMetricsStore((state) => state.setMetrics);

    useEffect(() => {
        const storageKey = 'utm_metrics';
        const stored = sessionStorage.getItem(storageKey);

        const fetchLocation = async () => {
            try {
                const res = await fetch('https://ipapi.co/json/');
                const data = await res.json();
                return {
                    ip: data.ip || '',
                    city: data.city || '',
                    region: data.region || '',
                    country: data.country_name || '',
                };
            } catch (error) {
                console.warn('Ошибка при получении геолокации', error);
                return {
                    ip: '',
                    city: '',
                    region: '',
                    country: '',
                };
            }
        };

        const collectAndStoreMetrics = async () => {
            const location = await fetchLocation();

            const referrer = document.referrer;
            const isInternal = referrer.startsWith(window.location.origin);

            const metrics = {
                page: window.location.origin + window.location.pathname + window.location.search,
                referrer: referrer || 'direct',
                utm_source: searchParams.get('utm_source') || '',
                utm_medium: searchParams.get('utm_medium') || '',
                utm_campaign: searchParams.get('utm_campaign') || '',
                utm_content: searchParams.get('utm_content') || '',
                utm_term: searchParams.get('utm_term') || '',
                referrer_type: isInternal ? 'internal' : 'external',

                // userAgent info
                user_agent: navigator.userAgent || '',
                // location info
                ip: location.ip,
                city: location.city,
                region: location.region,
                country: location.country,
            };

            setMetrics(metrics);
            sessionStorage.setItem(storageKey, JSON.stringify(metrics));
        };

        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setMetrics(parsed);
                return;
            } catch (err) {
                console.warn('Ошибка при чтении sessionStorage utm_metrics', err);
            }
        }

        collectAndStoreMetrics();
    }, [searchParams, setMetrics]);

    return <>{children}</>;
};
