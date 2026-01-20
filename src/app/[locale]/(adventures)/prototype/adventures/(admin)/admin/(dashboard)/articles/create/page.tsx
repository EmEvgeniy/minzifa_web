import { ArticleEditor } from "@/components/Adventures/Admin/ArticleEditor/ArticleEditor";

export const metadata = {
    title: 'Create Article | Adventures Admin',
    description: 'Write a new travel story for Silk Road.',
};

export default async function CreateArticlePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <ArticleEditor mode="create" locale={locale} />;
}
