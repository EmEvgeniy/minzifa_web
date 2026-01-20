import ArticlesList from '@/components/Adventures/Admin/Articles/ArticlesList';

export const metadata = {
    title: 'Articles Management | Adventures Admin',
    description: 'Manage articles for the Adventures section.',
};

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <ArticlesList locale={locale} />;
}
