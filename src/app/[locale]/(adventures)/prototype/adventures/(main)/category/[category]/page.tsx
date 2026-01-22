import CategoryArticlesList from "@/components/Adventures/Category/CategoryArticlesList";
import CategoryHeader from "@/components/Adventures/Category/CategoryHeader";
import Pagination from "@/components/Adventures/UI/shared/Pagination";
import SubscribeSection from "@/components/Adventures/UI/SubscribeSection/SubscribeSection";
import { Article, ArticleStatuses, Category } from '@/types/adventures';
import { adventuresAxiosInstance } from "@/utils/adventures/axios";
import { notFound } from "next/navigation";

import { PaginatedData } from "@/types/common";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const ITEMS_PER_PAGE = 10;

// Enable ISR with 60 second revalidation
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
    try {
        const response = await adventuresAxiosInstance.get<Category[]>('/categories');
        const categories = Array.isArray(response.data) ? response.data : [];
        const locales = ['en', 'de'];
        const paths: { locale: string; category: string }[] = [];

        locales.forEach((locale) => {
            categories.forEach((category) => {
                paths.push({
                    locale,
                    category: category.slug,
                });
            });
        });

        return paths;
    } catch (error) {
        console.error('Failed to generate static params for categories:', error);
        return [];
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ category: string; locale: string }>;
}): Promise<Metadata> {
    const { category, locale } = await params;
    const t = await getTranslations({ locale, namespace: 'adventures.category' });

    try {
        const response = await adventuresAxiosInstance.get<Category[]>('/categories');
        const categories = Array.isArray(response.data) ? response.data : [];
        const categoryData = categories.find((c: Category) => c.slug === category);

        if (!categoryData) {
            return {
                title: t('notFound'),
            };
        }

        return {
            title: categoryData.name,
            description: categoryData.description || '',
        };
    } catch (error) {
        console.error('Failed to generate metadata for category:', error);
        return {
            title: t('notFound'),
        };
    }
}

export default async function CategoryPage({
    params,
    searchParams
}: {
    params: Promise<{ category: string; locale: string }>;
    searchParams: Promise<{ page?: string }>;
}) {
    const { category, locale } = await params;
    const { page } = await searchParams;
    const t = await getTranslations({ locale, namespace: 'adventures.category' });
    const tArticle = await getTranslations({ locale, namespace: 'adventures.article' });

    const currentPage = Number(page) || 1;
    let allArticles: Article[] = [];
    let categoryData: Category | null = null;

    try {
        // Fetch articles with locale, category and status filter, and fetch specific category data with lang
        const [articlesResponse, categoryResponse] = await Promise.all([
            adventuresAxiosInstance.get<PaginatedData<Article>>('/articles', {
                params: {
                    locale,
                    categories: [category],
                    status: ArticleStatuses.PUBLISHED,
                    perPage: ITEMS_PER_PAGE,
                    page: currentPage
                }
            }),
            adventuresAxiosInstance.get<Category>(`/categories/${category}`, {
                params: { lang: locale }
            })
        ]);

        allArticles = (articlesResponse.data.data || []).filter(article => article.lang === locale);
        categoryData = categoryResponse.data || null;

        // Ensure articles have category objects mapped (though backend should provide them)
        if (categoryData && allArticles.length > 0) {
            allArticles = allArticles.map(article => ({
                ...article,
                categories: article.categories?.map((cat: Category | number) =>
                    typeof cat === 'number' && cat === categoryData?.id ? categoryData : cat
                ).filter((cat): cat is Category => !!cat)
            }));
        }

    } catch (error) {
        console.error("Failed to fetch articles by category:", error);
    }

    if (!categoryData) {
        notFound();
    }

    const totalPages = Math.ceil(allArticles.length / ITEMS_PER_PAGE);
    const articles = allArticles.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const breadcrumbItems = [
        { label: tArticle('home'), href: '/prototype/adventures' },
        { label: categoryData.name }
    ];

    return (
        <div className="container py-12">
            <CategoryHeader category={categoryData} breadcrumbItems={breadcrumbItems} />

            {allArticles.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-8 flex flex-col gap-12">
                        <CategoryArticlesList articles={articles} />

                        {totalPages > 1 && (
                            <div className="flex justify-center pt-4">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    baseUrl={`/${locale}/prototype/adventures/category/${category}`}
                                />
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <SubscribeSection />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-500">{t('noArticles')}</p>
                </div>
            )}
        </div>
    );
}