import { DestinationProps } from "@/components/TopNav/_types";

export type AllToursCardType = {
  id: number;
  name: string;
  days: number;
  destinations: string;
  slug: string;
  photo: {
    id: number;
    file: string;
    alt_text: string;
  };
  price: number;
  rating: number;
  destination: {
    name: string;
    slug: string;
  };
  full_slug: string;
  valute: string;
  created_at: string;
  updated_at: string;
};

export type ToursResponse = {
  data: AllToursCardType[];
  links: { url: string; label: string; active: boolean; }[];
  meta: {
    current_page: number | null;
    first_page_url: string | null;
    from: number | null;
    last_page: number | null;
    last_page_url: string | null;
    next_page_url: string | null;
    path: string | null;
    per_page: number | null;
    prev_page_url: number | null;
    to: number | null;
    total: number | null;
  };
};

export type TourType = {
  id: number;
  name: string;
  slug: string;
  media: {
    id: number;
    file: string;
    alt_text: string;
  };
  tours_count: number;
}

export type TourTypeDataResponse = TourType[];

export type DestinationDataResponse = DestinationProps[];
