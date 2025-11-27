'use client';

import { useMetricsStore, UTMMetrics } from '@/store/useMetricsStore';
import { useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const fetchLocation = async (): Promise<Partial<UTMMetrics>> => {
    try {
        const res = await fetch('https://ipapi.co/json/');
        if (!res.ok) throw new Error('Geo API error');
        const data = await res.json();
        return {
            ip: data.ip || '',
            city: data.city || '',
            region: data.region || '',
            country: data.country_name || '',
        };
    } catch (error) {
        console.warn('Ошибка при получении геолокации', error);
        return {};
    }
};

const collectAndStoreMetrics = async (
    searchParams: URLSearchParams,
    setMetrics: (data: Partial<UTMMetrics>) => void,
    storageKey: string
) => {
    const location = await fetchLocation();

    const referrer = document.referrer || 'direct';

    const metrics: Partial<UTMMetrics> = {
        page: `${window.location.origin}${window.location.pathname}${window.location.search}`,
        referrer,
        utm_source: searchParams.get('utm_source') || '',
        utm_medium: searchParams.get('utm_medium') || '',
        utm_campaign: searchParams.get('utm_campaign') || '',
        utm_content: searchParams.get('utm_content') || '',
        utm_term: searchParams.get('utm_term') || '',
        user_agent: navigator.userAgent || '',
        ...location,
    };

    setMetrics(metrics);
    sessionStorage.setItem(storageKey, JSON.stringify(metrics));
};

export const UTMMetricsProvider = ({ children }: { children: ReactNode }) => {
    const searchParams = useSearchParams();
    const setMetrics = useMetricsStore((state) => state.setMetrics);
    const storageKey = 'utm_metrics';

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const stored = sessionStorage.getItem(storageKey);

        if (stored) {
            try {
                const parsed = JSON.parse(stored);

                // Только если в URL есть UTM и они НЕ сохранены — обновляем
                if (searchParams.size > 0 && !parsed.utm_source) {
                    collectAndStoreMetrics(searchParams, setMetrics, storageKey);
                    return;
                }

                // Иначе обновляем только страницу
                const updated = {
                    ...parsed,
                    page: `${window.location.origin}${window.location.pathname}${window.location.search}`,
                    referrer: document.referrer || parsed.referrer
                };

                setMetrics(updated);
                sessionStorage.setItem(storageKey, JSON.stringify(updated));
                return;
            } catch (err) {
                console.warn('Ошибка при чтении sessionStorage utm_metrics', err);
            }
        }

        // Если данных нет — собираем первый раз
        collectAndStoreMetrics(searchParams, setMetrics, storageKey);
    }, [searchParams, setMetrics]);

    return <>{children}</>;
};
