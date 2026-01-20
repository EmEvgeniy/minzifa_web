import Image from 'next/image';
import Breadcrumbs from '@/components/Adventures/UI/Breadcrumbs';
import { Article } from '@/types/adventures';

interface ArticleHeaderProps {
    article: Article;
    breadcrumbItems: Array<{ label: string; href?: string }>;
    locale: string;
    translations: {
        writtenBy: string;
        read: string;
    };
}

export default function ArticleHeader({ article, breadcrumbItems, locale, translations }: ArticleHeaderProps) {
    return (
        <>
            {/* Breadcrumbs & Title Section */}
            <div className="container pt-8 pb-8 md:pt-12 md:pb-10">
                <div className="mb-8">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>

                <div className="max-w-4xl mx-auto text-left lg:text-center">
                    <div className="flex items-center justify-start lg:justify-center gap-3 mb-6">
                        <span className="p-3 bg-white text-text-accent text-xs font-semibold tracking-wider uppercase rounded-xl">
                            {article?.categories?.[0]?.name}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-title text-black mb-8 leading-[1.1] md:leading-[1.1]">
                        {article.title}
                    </h1>

                    <div className="flex items-center justify-start lg:justify-center gap-4 text-sm text-text-secondary flex-wrap">
                        <span className="order-2 lg:order-0 font-medium text-foreground">
                            {translations.writtenBy} <b>{article?.user?.name || 'Unknown'}</b>
                        </span>
                        <span className="order-1 lg:order-0 text-foreground">|</span>
                        <span className='order-0 lg:order-0'>
                            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString(
                                locale === 'de' ? 'de-DE' : 'en-US',
                                { month: 'long', day: 'numeric', year: 'numeric' }
                            ) : 'Not published'}
                        </span>
                        <span className="text-foreground">|</span>
                        <span>{article.readTime} min {translations.read}</span>
                    </div>
                </div>
            </div>

            {/* Hero Image */}
            <div className="container !px-0 mb-10 md:mb-18">
                <div className="relative w-full aspect-[4/3] md:aspect-[6/3.375] overflow-hidden bg-gray-100">
                    <Image
                        src={article.image || 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop'}
                        alt={article.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                </div>
            </div>
        </>
    );
}
