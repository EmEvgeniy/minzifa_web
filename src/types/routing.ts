// Типы для роутинга и навигации

export type DefaultPageProps = {
  params: Promise<{ locale: string; slug?: string }>;
  searchParams?: Promise<{ page?: string }>;
};
