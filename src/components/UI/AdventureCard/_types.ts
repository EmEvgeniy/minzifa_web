export type AdventureCardType = {
  id: number;
  name: string;
  media: {
    id: number;
    file: string;
    alt_text: string;
  };
  tours_count: number;
  slug: string;
};
