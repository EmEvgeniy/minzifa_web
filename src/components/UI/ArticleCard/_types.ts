export type ArticleCardType = {
  id: number;
  lang: string;
  name: string;
  published: string;
  description: string;
  slug: string;
  media: {
    id: number;
    file: string;
    alt_text: string;
  };
  img: string;
  category: {
    name: string;
    slug: string;
  };
  tags: [
    {
      name: string;
      slug: string;
    }
  ];
  seo_metadata: {
    title: string;
    description: string;
    keywords: string;
  };
};
