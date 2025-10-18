export type BestSellersPackagesCardType = {
  id: number;
  name: string;
  days: number;
  destination: {
    name: string;
    slug: string;
  };
  destinations: string;
  full_slug?: string;
  photo: {
    id: number;
    file: string;
    alt_text: string | null;
  };
  price: number;
  rating: number;
  slug: string;
  valute: string;
  tour_type?: string;
};
