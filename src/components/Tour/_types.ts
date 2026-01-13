import { ISeoMetadata } from '@/types';

export type OrderTourDetailData = {
  tour_id?: number | null | undefined;
  tour_name?: string | null | undefined;
  tour_start?: string | null | undefined;
  tour_end?: string | null | undefined;
  count?: string | null | undefined;
  price_id?: number | null | undefined;
  price?: string | null | undefined;
  total_price?: string | null | undefined;
};

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
  meals_included: string[];
  accomodation: string;
  gallery: TourImage[];
};

export type GroupPrice = {
  date_start: string;
  sale_price: number;
  is_best_price: boolean;
  time_for_sale: number;
  price_for_double: number;
  price_for_single: number;
  tour_total_seats: number;
};

export interface IPrivatePrice {
  tour_total_seats?: string;
  price_for_3_hotels?: string;
  price_for_4_hotels?: string;
  price_for_5_hotels?: string;
}

export type TourPrices = IPrivatePrice & {
  valute: string;
  valute_label?: string;
  price_basis?: string;
  price_basis_label?: string;
  data?: GroupPrice[];
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
  tour_type: string;
  lang: string;
  trip_code: string;
  name: string;
  subtitle: string;
  description: string;
  hightlights: Highlights;
  facts: Facts;
  seo_metadata: ISeoMetadata;
  slug: string;
  photo: TourImage;
  gallery: TourImage[];
  days: number;
  seasons: Season[];
  destinations: Destination[];
  types: Type[];
  itineraries: Itinerary[];
  prices: TourPrices;
  hotels: Hotel[];
  includes: Include[];
  reviews: Review[];
  transports: {
    one_two_people: string;
    six_twelve_people: string;
    three_five_people: string;
  };
};
