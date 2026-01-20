import { adventuresAxiosInstance } from '@/utils/adventures/axios';
import { Article, Category, ArticleStatuses } from '@/types/adventures';
import HeroSlider from '@/components/Adventures/UI/HeroSlider/HeroSlider';
import TheGoodsSection from '../../../../../../components/Adventures/Pages/Home/TheGoodsSection';
import GoodStoriesSection from '../../../../../../components/Adventures/Pages/Home/GoodStoriesSection';
import GoodTripsSection from '../../../../../../components/Adventures/Pages/Home/GoodTripsSection';
import GoodLifeSection from '../../../../../../components/Adventures/Pages/Home/GoodLifeSection';
import GoodIdeasSection from '../../../../../../components/Adventures/Pages/Home/GoodIdeasSection';
import AdventuresSidebar from '../../../../../../components/Adventures/Pages/Home/AdventuresSidebar';
import { getTranslations } from 'next-intl/server';
import { PaginatedData } from '@/types/common';

export const metadata = {
    title: 'Adventures | Paths of the Silk Road',
    description: 'Discover travel stories, guides, and inspiration from the heart of Central Asia.',
};

export default async function AdventuresHome({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    let allArticles: Article[] = [];
    let categories: Category[] = [];

    try {
        const [articlesResponse, categoriesResponse] = await Promise.all([
            adventuresAxiosInstance.get<PaginatedData<Article>>('/articles', {
                params: { locale, status: ArticleStatuses.PUBLISHED }
            }),
            adventuresAxiosInstance.get('/categories', {
                params: { locale }
            })
        ]);

        allArticles = (articlesResponse.data.data || []).filter(article => article.lang === locale);
        categories = Array.isArray(categoriesResponse.data)
            ? categoriesResponse.data
            : [];

        // Map category IDs to category objects
        allArticles = allArticles.map(article => ({
            ...article,
            categories: article.categories
                ?.map((catId: any) => {
                    if (typeof catId === 'number') {
                        return categories.find((c: any) => c.id === catId);
                    }
                    return catId;
                })
                .filter(Boolean)
        }));
    } catch (error) {
        console.error("Failed to fetch articles:", error);
    }

    const t = await getTranslations({ locale, namespace: 'adventures.home' });
    const tComponents = await getTranslations({ locale, namespace: 'adventures.components' });

    // Распределение данных по секциям (using local array)
    const heroArticles = allArticles.slice(0, 3);

    // THE GOODS
    const goodsMain = allArticles[0];
    const goodsList = allArticles.slice(1, 5);

    // GOOD STORIES
    const storiesMain = allArticles.slice(4, 6);
    const storiesGrid = allArticles.slice(6, 10);

    // GOOD TRIPS
    const tripsArticles = allArticles.slice(2, 6);

    // GOOD LIFE
    const lifeMain = allArticles[1];
    const lifeList = allArticles.slice(7, 11);

    // GOOD IDEAS
    const ideasFeatured = allArticles[2];
    const ideasGrid = allArticles.slice(3, 7);

    // SIDEBAR
    const newsArticles = allArticles.slice(5, 10);

    return (
        <div className="min-h-screen bg-[#F5F4F1]">
            {/* Hero Slider */}
            <section className="max-w-[1170px] mx-auto px-0 lg:px-6 pt-4 lg:pt-10">
                <HeroSlider articles={heroArticles} />
            </section>

            {/* Global 2-Column Layout */}
            <section className="container py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Left Column (Main Content) */}
                    <div className="lg:col-span-8">
                        {/* THE GOODS section */}
                        <TheGoodsSection
                            mainArticle={goodsMain}
                            listArticles={goodsList}
                            title={t('theGoods')}
                            viewAllText={tComponents('viewAll')}
                            categorySlug="goods"
                        />

                        {/* GOOD STORIES section */}
                        <GoodStoriesSection
                            mainArticles={storiesMain}
                            gridArticles={storiesGrid}
                            title={t('goodStories')}
                            viewAllText={tComponents('viewAll')}
                            categorySlug="good-stories"
                        />

                        {/* GOOD TRIPS section */}
                        <GoodTripsSection
                            articles={tripsArticles}
                            title={t('goodTrips')}
                            viewAllText={tComponents('viewAll')}
                            categorySlug="good-trips"
                        />

                        {/* GOOD LIFE section */}
                        <GoodLifeSection
                            mainArticle={lifeMain}
                            listArticles={lifeList}
                            title={t('goodLife')}
                            viewAllText={tComponents('viewAll')}
                            categorySlug="good-life"
                        />

                        {/* GOOD IDEAS section */}
                        <GoodIdeasSection
                            featuredArticle={ideasFeatured}
                            gridArticles={ideasGrid}
                            title={t('goodIdeas')}
                            viewAllText={tComponents('viewAll')}
                            categorySlug="good-ideas"
                        />
                    </div>

                    {/* Right Column (Sidebar) */}

                    <AdventuresSidebar
                        newsArticles={newsArticles}
                        title={t('goodsNews')}
                        subscribeTitle={t('subscribe')}
                    />
                </div>
            </section>
        </div>
    );
}
