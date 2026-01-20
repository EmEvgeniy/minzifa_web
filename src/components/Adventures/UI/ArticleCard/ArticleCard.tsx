import type { Article } from '@/types/adventures';
import ArticleCardVertical from './variants/ArticleCardVertical';
import ArticleCardHorizontal from './variants/ArticleCardHorizontal';
import ArticleCardMinimal from './variants/ArticleCardMinimal';
import ArticleCardOverlay from './variants/ArticleCardOverlay';

export type ArticleCardVariant = 'vertical' | 'horizontal' | 'minimal' | 'overlay';

interface ArticleCardProps {
    article: Article;
    variant?: ArticleCardVariant;
    className?: string;
    showExcerpt?: boolean; // Для горизонтального варианта
}

export default function ArticleCard({
    article,
    variant = 'vertical',
    className = '',
    showExcerpt = false
}: ArticleCardProps) {
    if (!article) return null;

    switch (variant) {
        case 'vertical':
            return <ArticleCardVertical article={article} className={className} showExcerpt={showExcerpt} />;
        case 'horizontal':
            return <ArticleCardHorizontal article={article} showExcerpt={showExcerpt} className={className} />;
        case 'minimal':
            return <ArticleCardMinimal article={article} className={className} />;
        case 'overlay':
            return <ArticleCardOverlay article={article} className={className} />;
        default:
            return <ArticleCardVertical article={article} className={className} showExcerpt={showExcerpt} />;
    }
}
