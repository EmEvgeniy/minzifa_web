'use client';

import Link from 'next/link';
import { Article } from '@/components/Adventures/data/mockData';
import ArticleCard from '@/components/Adventures/UI/ArticleCard/ArticleCard';
import BlockTitle from '../../UI/shared/BlockTitle';
import { useLocale } from 'next-intl';
import { FaChevronRight } from 'react-icons/fa6';

interface Props {
    featuredArticle: Article;
    gridArticles: Article[];
    title: string;
    viewAllText: string;
}

export default function GoodIdeasSection({ featuredArticle, gridArticles, title, viewAllText }: Props) {
    const locale = useLocale();
    return (
        <div className="mb-16">
            <BlockTitle title={title} />

            <div className="space-y-8">
                <ArticleCard
                    article={featuredArticle}
                    variant="horizontal"
                    showExcerpt={true}
                    className="!p-6"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gridArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} variant="horizontal" />
                    ))}
                </div>

                <div className="flex justify-end mt-4">
                    <Link href={`/${locale}/prototype/adventures/ideas`} className="flex items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-foreground transition-colors uppercase tracking-[0.2em]">
                        {viewAllText} <FaChevronRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
