'use client';

import { useArticle } from '@/api/adventures/articles';
import { ArticleEditor } from '@/components/Adventures/Admin/ArticleEditor/ArticleEditor';
import { ArticleFormData } from '@/components/Adventures/Admin/ArticleEditor/types';
import { ArticleStatuses } from '@/types/adventures';

interface EditArticleWrapperProps {
    id: string;
    locale: string;
}

export default function EditArticleWrapper({ id, locale }: EditArticleWrapperProps) {
    const { data: article, isLoading } = useArticle(id);

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3ca542]"></div>
        </div>
    );

    if (!article) return <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">Article not found</div>;

    // Map existing article data to form shape
    const initialFormData: ArticleFormData & { id: number } = {
        id: article.id,
        lang: article.lang || locale || 'en',
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt || '',
        content: article.content,
        publishedAt: article.publishedAt || new Date().toISOString().split('T')[0],
        image: article.image || '',
        status: article?.status || ArticleStatuses.DRAFT,
        categories: article.categories?.map((cat: any) => typeof cat === 'object' && cat !== null ? cat.id : cat) || [],
        seo: {
            title: article.seo?.title || article.title,
            description: article.seo?.description || article.excerpt || '',
            keywords: article.seo?.keywords || ''
        },
        tags: article.tags || [],
        readTime: String(article.readTime) || "0",
        userId: article.userId || 0,
    };

    return <ArticleEditor initialData={initialFormData} mode="edit" locale={locale} />;
}
