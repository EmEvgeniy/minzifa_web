import { IMediaData } from '@/types';

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
  photo: IMediaData | null;
  price: number;
  rating: number;
  slug: string;
  valute: string;
  tour_type?: string;
};
