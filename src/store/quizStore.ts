import { UTMMetrics } from '@/store/useMetricsStore';
import { create } from 'zustand';

export interface QuizFormData extends UTMMetrics {
    whereGo: string;
    whenGo: string;
    howManyPeople: string;
    howManyDays: string;
    budget: string;
    accomodation: string;
    name: string;
    email: string;
    phone: string;
    contactToTalk: string;
};

type QuizStoreData = {
    formData: QuizFormData;
    setFormData: (data: QuizFormData) => void;

    // Сеттеры для каждого поля
    setWhereGo: (value: string) => void;
    setWhenGo: (value: string) => void;
    setHowManyPeople: (value: string) => void;
    setHowManyDays: (value: string) => void;
    setBudget: (value: string) => void;
    setAccomodation: (value: string) => void;
    setName: (value: string) => void;
    setEmail: (value: string) => void;
    setPhone: (value: string) => void;
    setСontactToTalk: (value: string) => void;
};

export const useQuizStore = create<QuizStoreData>()((set) => ({
    formData: {
        whereGo: '',
        whenGo: '',
        howManyPeople: '',
        howManyDays: '',
        budget: '',
        accomodation: '',
        name: '',
        email: '',
        phone: '',
        contactToTalk: '',
    },

    setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),

    setWhereGo: (value) => set((state) => ({ formData: { ...state.formData, whereGo: value } })),
    setWhenGo: (value) => set((state) => ({ formData: { ...state.formData, whenGo: value } })),
    setHowManyPeople: (value) => set((state) => ({ formData: { ...state.formData, howManyPeople: value } })),
    setHowManyDays: (value) => set((state) => ({ formData: { ...state.formData, howManyDays: value } })),
    setBudget: (value) => set((state) => ({ formData: { ...state.formData, budget: value } })),
    setAccomodation: (value) => set((state) => ({ formData: { ...state.formData, accomodation: value } })),
    setName: (value) => set((state) => ({ formData: { ...state.formData, name: value } })),
    setEmail: (value) => set((state) => ({ formData: { ...state.formData, email: value } })),
    setPhone: (value) => set((state) => ({ formData: { ...state.formData, phone: value } })),
    setСontactToTalk: (value) => set((state) => ({ formData: { ...state.formData, contactToTalk: value } })),
}));
