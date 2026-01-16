'use client';

import Link from 'next/link';
import { Article } from '@/components/Adventures/data/mockData';
import ArticleCard from '@/components/Adventures/UI/ArticleCard/ArticleCard';
import BlockTitle from '../../UI/shared/BlockTitle';
import { useLocale } from 'next-intl';
import { FaChevronRight } from 'react-icons/fa6';

interface Props {
    mainArticle: Article;
    listArticles: Article[];
    title: string;
    viewAllText: string;
}

export default function GoodLifeSection({ mainArticle, listArticles, title, viewAllText }: Props) {
    const locale = useLocale();
    return (
        <div className="mb-16">
            <BlockTitle title={title} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <ArticleCard article={mainArticle} variant="vertical" />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="space-y-4">
                        {listArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} variant="horizontal" />
                        ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Link href={`/${locale}/prototype/adventures/life`} className="flex items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-foreground transition-colors uppercase tracking-[0.2em]">
                            {viewAllText} <FaChevronRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
