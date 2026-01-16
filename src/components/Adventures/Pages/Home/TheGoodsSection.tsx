'use client';

import Link from 'next/link';
import { Article } from '@/components/Adventures/data/mockData';
import ArticleCard from '@/components/Adventures/UI/ArticleCard/ArticleCard';
import BlockTitle from '../../UI/shared/BlockTitle';
import { FaChevronRight } from 'react-icons/fa6';
import { useLocale } from 'next-intl';

interface Props {
    mainArticle: Article;
    listArticles: Article[];
    title: string;
    viewAllText: string;
}

export default function TheGoodsSection({ mainArticle, listArticles, title, viewAllText }: Props) {
    const locale = useLocale();
    return (
        <div className="mb-12">
            <div className="mb-8 overflow-hidden">
                <BlockTitle title={title} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-7.5">
                    <div>
                        <ArticleCard article={mainArticle} variant="vertical" showExcerpt />
                    </div>
                    <div className="flex flex-col gap-4 lg:gap-7.5">
                        <div className="grid grid-cols-1 gap-4 lg:gap-7.5">
                            {listArticles.map((article) => (
                                <ArticleCard key={article.id} article={article} variant="horizontal" showExcerpt={false} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-8">
                    <Link href={`/${locale}/prototype/adventures/goods`} className="flex items-center gap-2 text-base font-medium text-gray-500 hover:text-foreground transition-colors uppercase">
                        {viewAllText} <FaChevronRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
