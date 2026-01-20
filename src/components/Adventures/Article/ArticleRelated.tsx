import RelatedArticlesSlider from '@/components/Adventures/Article/UI/RelatedArticlesSlider';
import { Article } from '@/types/adventures';

interface ArticleRelatedProps {
    articles: Article[];
    title: string;
}

export default function ArticleRelated({ articles, title }: ArticleRelatedProps) {
    if (articles.length === 0) return null;

    return (
        <section className="max-w-[300px] pt-12 md:max-w-[630px] mx-auto">
            <div className="flex items-center justify-between gap-4 mb-12">
                <div className="h-0.5 w-8 md:w-24 lg:w-44 bg-[#2D3A31]" />
                <h2 className="text-2xl lg:text-3xl font-title font-bold text-[#2D3A31]">
                    {title}
                </h2>
                <div className="h-0.5 w-8 md:w-24 lg:w-44 bg-[#2D3A31]" />
            </div>

            <RelatedArticlesSlider articles={articles} />
        </section>
    );
}
