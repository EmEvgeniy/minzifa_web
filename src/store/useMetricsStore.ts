// stores/useMetricsStore.ts
import { create } from 'zustand';

export interface UTMMetrics {
    page?: string;
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    user_agent?: string;
    ip?: string;
    city?: string;
    region?: string;
    country?: string;
}

interface MetricsStore {
    metrics: UTMMetrics;
    setMetrics: (data: Partial<UTMMetrics>) => void;
}

export const useMetricsStore = create<MetricsStore>((set) => ({
    metrics: {
        page: '',
        referrer: '',
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_content: '',
        utm_term: '',
        user_agent: '',
        ip: '',
        city: '',
        region: '',
        country: '',
    },
    setMetrics: (data) =>
        set((state) => ({
            metrics: {
                ...state.metrics,
                ...data,
            },
        })),
}));
