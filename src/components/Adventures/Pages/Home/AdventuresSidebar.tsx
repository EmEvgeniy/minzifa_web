'use client';

import type { Article } from '@/types/adventures';
import SubscribeSection from '@/components/Adventures/UI/SubscribeSection/SubscribeSection';
import ArticleCard from '../../UI/ArticleCard/ArticleCard';
import BlockTitle from '../../UI/shared/BlockTitle';
import { useLocale } from 'next-intl';
import Link from 'next/link';

interface Props {
    newsArticles: Article[];
    title: string;
    subscribeTitle: string;
}

export default function AdventuresSidebar({ newsArticles, title, subscribeTitle }: Props) {
    const locale = useLocale();
    return (
        <div className="lg:col-span-4 space-y-8">
            <div className="mb-10">
                <BlockTitle title={title} variant="secondary" />
                <div className="flex flex-col gap-4">
                    {newsArticles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            variant="minimal"
                        />
                    ))}
                </div>
            </div>

            <div className="sticky top-24">
                {/* Subscribe Section */}
                <SubscribeSection
                    title={subscribeTitle}
                    className="mb-8"
                />
            </div>
        </div>
    );
}
