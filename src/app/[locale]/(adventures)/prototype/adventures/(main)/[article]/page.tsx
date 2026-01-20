import Image from 'next/image';
import { notFound } from 'next/navigation';
import { adventuresAxiosInstance } from '@/utils/adventures/axios';
import type { Article, Category } from '@/types/adventures';
import ArticleHeader from '@/components/Adventures/Article/ArticleHeader';
import ArticleContent from '@/components/Adventures/Article/ArticleContent';
import ArticleRelated from '@/components/Adventures/Article/ArticleRelated';
import { PaginatedData } from '@/types/common';
import { getTranslations } from 'next-intl/server';

interface ArticlePageProps {
    params: Promise<{ article: string, locale: string }>;
}

// Enable ISR with 60 second revalidation
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
    try {
        const response = await adventuresAxiosInstance.get<PaginatedData<Article>>('/articles');
        const articles = response.data.data;
        const locales = ['en', 'de'];
        const paths: { locale: string; article: string }[] = [];

        locales.forEach((locale) => {
            articles.forEach((article) => {
                paths.push({
                    locale,
                    article: article.slug,
                });
            });
        });

        return paths;
    } catch (error) {
        return [];
    }
}

export async function generateMetadata({ params }: ArticlePageProps) {
    const { article } = await params;

    try {
        const response = await adventuresAxiosInstance.get<{ success: Boolean; data: Article }>(`/articles/${article}`);
        const articleData = response.data.data;

        return {
            title: `${articleData.seo?.title} | Paths of the Silk Road`,
            description: articleData.seo?.description,
        };
    } catch (error) {
        notFound();
    }
}


export default async function ArticlePage({ params }: { params: Promise<{ article: string, locale: string }> }) {
    const { article, locale } = await params;

    let articleData: Article | null = null;
    let relatedArticles: Article[] = [];
    let categories: Category[] = [];

    try {
        // Fetch categories first
        const categoriesResponse = await adventuresAxiosInstance.get<Category[]>('/categories');
        categories = Array.isArray(categoriesResponse.data) ? categoriesResponse.data : [];

        // Fetch article
        const response = await adventuresAxiosInstance.get<{ success: Boolean; data: Article }>(`/articles/${article}`);

        if (response.data.success) {
            articleData = response.data.data;

            // Map category IDs to category objects
            if (articleData && Array.isArray(articleData.categories)) {
                articleData.categories = articleData.categories
                    .map((catId: any) => {
                        if (typeof catId === 'number') {
                            return categories.find(c => c.id === catId);
                        }
                        return catId;
                    })
                    .filter(Boolean) as Category[];
            }
        }

        // Fetch related articles
        try {
            const allResponse = await adventuresAxiosInstance.get<PaginatedData<Article>>('/articles');
            const allArticles = allResponse.data.data;

            // Map categories for all articles
            const articlesWithCategories = allArticles.map(a => {
                if (Array.isArray(a.categories)) {
                    a.categories = a.categories
                        .map((catId: any) => {
                            if (typeof catId === 'number') {
                                return categories.find(c => c.id === catId);
                            }
                            return catId;
                        })
                        .filter(Boolean) as Category[];
                }
                return a;
            });

            relatedArticles = articlesWithCategories
                .filter(a => a.id !== articleData?.id && a.categories?.[0]?.id === articleData?.categories?.[0]?.id)
                .slice(0, 4);
        } catch (relError) {
            console.error('Failed to fetch related articles:', relError);
        }
    } catch (error) {
        notFound();
    }

    const t = await getTranslations('adventures.article');
    const tComponents = await getTranslations('adventures.components');

    if (!articleData) {
        notFound();
    }

    const breadcrumbItems = [
        { label: t('home'), href: '/prototype/adventures' },
        { label: articleData?.categories?.[0]?.name || 'Category', href: `/prototype/adventures/category/${articleData?.categories?.[0]?.slug || ''}` },
        { label: articleData.title }
    ];

    return (
        <article className="min-h-screen pb-20 bg-background">
            <ArticleHeader
                article={articleData}
                breadcrumbItems={breadcrumbItems}
                locale={locale}
                translations={{
                    writtenBy: t('writtenBy'),
                    read: t('read')
                }}
            />

            <ArticleContent article={articleData} />

            <ArticleRelated
                articles={relatedArticles}
                title={tComponents('youMightLike')}
            />
        </article>
    );
}
