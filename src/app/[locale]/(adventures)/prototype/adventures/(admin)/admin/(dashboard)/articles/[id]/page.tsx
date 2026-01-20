import EditArticleWrapper from '@/components/Adventures/Admin/Articles/EditArticleWrapper';

export const metadata = {
    title: 'Edit Article | Adventures Admin',
    description: 'Edit existing travel story.',
};

export default async function EditArticlePage({ params }: { params: Promise<{ id: string, locale: string }> }) {
    const p = await params;
    return <EditArticleWrapper id={p.id} locale={p.locale} />;
}
