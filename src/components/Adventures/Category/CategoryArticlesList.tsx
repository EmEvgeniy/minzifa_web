import { Article } from '@/types/adventures';
import ArticleCard from '@/components/Adventures/UI/ArticleCard/ArticleCard';
import { cn } from '@/utils';

interface CategoryArticlesListProps {
    articles: Article[];
}

export default function CategoryArticlesList({ articles }: CategoryArticlesListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {articles.map((article: Article, index: number) => (
                <ArticleCard
                    key={article.id}
                    article={article}
                    className={cn(
                        "lg:col-span-2",
                        index % 5 === 0 ? "lg:col-span-2" : "lg:col-span-1"
                    )}
                />
            ))}
        </div>
    );
}
