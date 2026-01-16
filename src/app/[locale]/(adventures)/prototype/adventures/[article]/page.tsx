import Image from 'next/image';
import { notFound } from 'next/navigation';
import { mockArticles, getArticleBySlug, getRelatedArticles } from '@/components/Adventures/data/mockData';
import SocialShare from '@/components/Adventures/UI/SocialShare/SocialShare';
import ArticleCard from '@/components/Adventures/UI/ArticleCard/ArticleCard';
import MarkdownRenderer from '@/components/Adventures/Article/Renderer/MarkdownRenderer';
import Breadcrumbs from '@/components/Adventures/UI/Breadcrumbs';
import RelatedArticlesSlider from '@/components/Adventures/Article/UI/RelatedArticlesSlider';

interface ArticlePageProps {
    params: Promise<{ article: string, locale: string }>;
}

export async function generateStaticParams() {
    const locales = ['en', 'de'];
    const paths: { locale: string; article: string }[] = [];

    locales.forEach((locale) => {
        mockArticles.forEach((article) => {
            paths.push({
                locale,
                article: article.slug,
            });
        });
    });

    return paths;
}

export async function generateMetadata({ params }: ArticlePageProps) {
    const { article, locale } = await params;
    // Assuming we might need to handle locale in getArticleBySlug if we update metadata language
    const articleData = getArticleBySlug(article, locale); // params hash locale? interface says { article: string }?
    // Let's check interface
    // ArticlePageProps defined with params: Promise<{ article: string }> in original file.
    // I need to update interface to include locale.

    if (!articleData) {
        return { title: 'Article Not Found' };
    }

    return {
        title: `${articleData.title} | Paths of the Silk Road`,
        description: articleData.excerpt,
    };
}

import { getTranslations } from 'next-intl/server';

export default async function ArticlePage({ params }: { params: Promise<{ article: string, locale: string }> }) {
    const { article, locale } = await params;
    const articleData = getArticleBySlug(article, locale);
    const t = await getTranslations('adventures.article');
    const tComponents = await getTranslations('adventures.components');

    if (!articleData) {
        notFound();
    }

    const relatedArticles = getRelatedArticles(articleData.slug, 4, locale);

    const breadcrumbItems = [
        { label: t('home'), href: '/prototype/adventures' },
        { label: articleData?.category?.name || 'Category', href: `/prototype/adventures/category/${articleData?.category?.slug}` },
        { label: articleData.title }
    ];

    return (
        <article className="min-h-screen pb-20 bg-background">
            {/* Header Section: Title & Meta */}
            <div className="container pt-8 pb-8 md:pt-12 md:pb-10">

                {/* Breadcrumbs */}
                <div className="mb-8">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>

                <div className="max-w-4xl mx-auto text-left lg:text-center">
                    <div className="flex items-center justify-start lg:justify-center gap-3 mb-6">
                        <span className="p-3 bg-white text-text-accent text-xs font-semibold tracking-wider uppercase rounded-xl">
                            {articleData?.category?.name}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-title text-black mb-8 leading-[1.1] md:leading-[1.1]">
                        {articleData.title}
                    </h1>

                    <div className="flex items-center justify-start lg:justify-center gap-4 text-sm text-text-secondary flex-wrap">
                        <span className="order-2 lg:order-0 font-medium text-foreground">{t('writtenBy')} <b>{articleData.author.name}</b></span>
                        <span className="order-1 lg:order-0 text-foreground">|</span>
                        <span className='order-0 lg:order-0'>
                            {new Date(articleData.publishedAt).toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </span>
                        <span className="text-foreground">|</span>
                        <span>{articleData.readTime} {t('read')}</span>
                    </div>
                </div>
            </div>

            {/* Hero Image */}
            <div className="container !px-0 mb-10 md:mb-18">
                <div className="relative w-full aspect-[4/3] md:aspect-[6/3.375] overflow-hidden bg-gray-100">
                    <Image
                        src={articleData.image}
                        alt={articleData.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="container relative">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Left Sidebar: Social Share (Desktop Sticky) */}
                    <div className="hidden lg:block lg:col-span-2">
                        <div className="sticky top-32">
                            <SocialShare title={articleData.title} vertical />
                        </div>
                    </div>

                    {/* Mobile Social Share (Visible only on small screens) */}
                    <div className="order-3 lg:order-0 lg:hidden mb-8 flex justify-center">
                        <SocialShare title={articleData.title} vertical={false} />
                    </div>

                    {/* Article Body */}
                    <div className="order-1 lg:order-0 col-span-1 lg:col-span-8 lg:col-start-3">
                        <MarkdownRenderer source={articleData.content} />
                    </div>

                    <hr className="order-2 lg:order-0 my-12 border-[#D0D0D0] col-span-12" />
                </div>

            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
                <section className="max-w-[300px] pt-12 md:max-w-[630px] mx-auto">
                    <div className="flex items-center justify-between gap-4 mb-12">
                        <div className="h-0.5 w-8 md:w-24 lg:w-44 bg-[#2D3A31]" />
                        <h2 className="text-2xl lg:text-3xl font-title font-bold text-[#2D3A31]">{tComponents('youMightLike')}</h2>
                        <div className="h-0.5 w-8 md:w-24 lg:w-44 bg-[#2D3A31]" />
                    </div>

                    <RelatedArticlesSlider articles={relatedArticles} />
                </section>
            )}
        </article>
    );
}
