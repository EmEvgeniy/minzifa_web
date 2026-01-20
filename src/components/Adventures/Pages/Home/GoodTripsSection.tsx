'use client';

import Link from 'next/link';
import type { Article } from '@/types/adventures';
import ArticleCard from '@/components/Adventures/UI/ArticleCard/ArticleCard';
import BlockTitle from '../../UI/shared/BlockTitle';
import { useLocale } from 'next-intl';
import { FaChevronRight } from 'react-icons/fa6';

interface Props {
    articles: Article[];
    title: string;
    viewAllText: string;
    categorySlug: string;
}

export default function GoodTripsSection({ articles, title, viewAllText, categorySlug }: Props) {
    const locale = useLocale();
    return (
        <div className="mb-16">
            <BlockTitle title={title} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="overlay" />
                ))}
            </div>

            <div className="flex justify-end mt-8">
                <Link href={`/${locale}/prototype/adventures/category/${categorySlug}`} className="flex items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-foreground transition-colors uppercase tracking-[0.2em]">
                    {viewAllText} <FaChevronRight size={16} />
                </Link>
            </div>
        </div>
    );
}
