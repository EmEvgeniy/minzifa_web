export interface CreateYourTripFormProps {
    className?: string;
    popupClose?: () => void;
}

export interface CreateYourTripFormRequest {
    destinations: string[];
    travellers: string;
    days: string;
    hotels: string;
    experience: string;
    name: string;
    email: string;
    phone: string;
    
    page?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
}

export interface QuestionData {
    question: string;
    answers?: string[];
    type?: string;
    name?: string;
    inputs?: string[];
    hint?: string;
}