export type TourImage = {
    id: number;
    file: string;
    alt_text: string;
};

export type Highlights = {
    title: string;
    content: string[];
};

export type Facts = {
    title: string;
    content: {
        duration: string;
        group_size: string;
        hotels: string;
        transport: string;
    };
};

export type SeoMetadata = {
    title: string;
    description: string;
    keywords: string;
};

export type Season = {
    id: string;
    name: string;
    slug: string;
};

export type Destination = {
    id: number;
    name: string;
    slug: string;
};

export type Type = {
    id: number;
    name: string;
    slug: string;
};

export type Itinerary = {
    id: string;
    label: string;
    title: string;
    description: string;
    meals_included: string[]; // пример: ['breakfast']
    accomodation: string;
    gallery: TourImage[];
};

export type Price = {
    date_start: string; // ISO или любой формат даты
    time_for_sale: number;
    sale_price: number;
    price_for_double: number;
    price_for_single: number;
    tour_total_seats: number;
    valute: string;
    is_best_price: boolean;
};

export type Hotel = {
    id: string;
    name: string;
    description: string;
    slug: string;
    hotel_type: string;
    facilities: string[];
    gallery: TourImage[];
    country: string;
    city: string;
    nights: number;
    rating: number;
};

export type Include = {
    id: number;
    type: string;
    category: string;
    service: string;
};

export type UserAvatar = {
    id: number;
    file: string;
    alt_text: string;
};

export type ReviewUser = {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: UserAvatar[];
};

export type Review = {
    id: number;
    user: ReviewUser;
    name: string;
    comment: string;
    rating: number;
    gallery: TourImage[];
};

export type Tour = {
    id: number;
    lang: string;
    trip_code: string;
    name: string;
    subtitle: string;
    description: string;
    hightlights: Highlights;
    facts: Facts;
    seo_metadata: SeoMetadata;
    slug: string;
    gallery: TourImage[];
    days: number;
    seasons: Season[];
    destinations: Destination[];
    types: Type[];
    itineraries: Itinerary[];
    prices: Price[];
    hotels: Hotel[];
    includes: Include[];
    reviews: Review[];
};
