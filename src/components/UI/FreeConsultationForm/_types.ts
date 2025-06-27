import { UTMMetrics } from "@/store/useMetricsStore";

export interface FreeConsultationFormRequest extends UTMMetrics {
  name: string;
  email: string;
  phone: string;
  message: string;
}