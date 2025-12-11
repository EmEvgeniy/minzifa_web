import { UTMMetrics } from '@/store/useMetricsStore';

export interface CreateYourTripFormProps {
  className?: string;
  popupClose?: () => void;
  locale: string;
}

export interface CreateYourTripFormRequest extends UTMMetrics {
  destinations: string[];
  travellers: string;
  days: string;
  hotels: string;
  experience: string;
  name: string;
  email: string;
  phone: string;
}

export interface QuestionData {
  question: string;
  answers?: string[];
  type?: string;
  name?: string;
  inputs?: string[];
  hint?: string;
}