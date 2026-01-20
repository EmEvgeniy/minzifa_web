import { adventuresAxiosInstance } from "@/utils/adventures/axios";
import { Article, Category } from '@/types/adventures';
import CategoryHeader from "@/components/Adventures/Category/CategoryHeader";
import CategoryArticlesList from "@/components/Adventures/Category/CategoryArticlesList";
import Pagination from "@/components/Adventures/UI/shared/Pagination";
import SubscribeSection from "@/components/Adventures/UI/SubscribeSection/SubscribeSection";
import { notFound } from "next/navigation";

import { getTranslations } from "next-intl/server";
import { PaginatedData } from "@/types/common";

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
        // Fetch all articles and categories
        const [articlesResponse, categoriesResponse] = await Promise.all([
            adventuresAxiosInstance.get<PaginatedData<Article>>('/articles'),
            adventuresAxiosInstance.get<Category[]>('/categories')
        ]);

        const articles = articlesResponse.data.data;
        const categories = Array.isArray(categoriesResponse.data)
            ? categoriesResponse.data
            : [];

        // Map category IDs to category objects for all articles
        const articlesWithCategories = articles.map(article => ({
            ...article,
            categories: article.categories
                ?.map((catId: any) => {
                    if (typeof catId === 'number') {
                        return categories.find((c: Category) => c.id === catId);
                    }
                    return catId;
                })
                .filter(Boolean)
        }));

        // Filter articles by category slug
        allArticles = articlesWithCategories.filter(a => a?.categories?.[0]?.slug === category);

        // Get category data
        categoryData = categories.find((c: Category) => c.slug === category) || null;
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