export type DefaultPageProps = {
  params: Promise<{ locale: string; slug?: string }>;
};
export type DefaultComponentsProps = {
  locale: string;
  showFilter?: ("price" | "duration" | "seasons" | "hotels" | "tourType" | "destinations")[];
};
