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
};
