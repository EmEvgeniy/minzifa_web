import { Article, getArticlesByCategory, getCategories } from "@/components/Adventures/data/mockData";
import ArticleCard from "@/components/Adventures/UI/ArticleCard/ArticleCard";
import BlockTitle from "@/components/Adventures/UI/shared/BlockTitle";
import Pagination from "@/components/Adventures/UI/shared/Pagination";
import SubscribeSection from "@/components/Adventures/UI/SubscribeSection/SubscribeSection";
import { cn } from "@/utils";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Adventures/UI/Breadcrumbs";

import { getTranslations } from "next-intl/server";

const ITEMS_PER_PAGE = 10;

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

    const allCategories = getCategories(locale);

    const categoryData = allCategories.find((cat: any) => cat.slug === category);
    if (!categoryData) {
        notFound();
    }

    const allArticles = getArticlesByCategory(category, locale);
    const totalPages = Math.ceil(allArticles.length / ITEMS_PER_PAGE);

    const articles = allArticles.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="container py-12">
            <div className="mb-8">
                <Breadcrumbs
                    items={[
                        { label: tArticle('home'), href: '/prototype/adventures' },
                        { label: categoryData.name }
                    ]}
                />
            </div>
            <BlockTitle title={categoryData.name} className="text-2xl md:text-3xl lg:text-[56px] font-title font-medium normal-case" />

            {allArticles.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-8 flex flex-col gap-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {articles.map((article: Article, index: number) => (
                                <ArticleCard key={article.id} article={article} className={cn("lg:col-span-2", index % 5 === 0 ? "lg:col-span-2" : "lg:col-span-1")} />
                            ))}
                        </div>

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