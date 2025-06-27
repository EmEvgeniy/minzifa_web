import { UTMMetrics } from "@/store/useMetricsStore";

export interface ConsultationQuizFormProps {
    className?: string;
    popupClose?: () => void;
}

export interface ConsultationQuizFormRequest extends UTMMetrics {
    visites: string;
    cities: string;
    days: string;
    travellers: string;
    name: string;
    email: string;
    phone: string;
}

export interface Question {
    question: string;
    name?: string;
    answers?: string[];
    type?: string;
    inputs?: { name: string; label: string; }[];
    autoNext?: boolean;
}