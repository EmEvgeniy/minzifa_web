'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/components/Adventures/data/mockData';
import { useLocale } from 'next-intl';

interface Props {
    article: Article;
    className?: string;
}

export default function ArticleCardOverlay({ article, className = '' }: Props) {
    const locale = useLocale();
    return (
        <Link
            href={`/${locale}/prototype/adventures/${article.slug}`}
            className={`group relative block aspect-[1.3/1] overflow-hidden rounded-2xl ${className}`}
        >
            <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

            {/* Content Centered */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-white font-title font-bold text-xl lg:text-2xl leading-tight mb-2 max-w-[80%] mx-auto drop-shadow-sm">
                    {article.title}
                </h3>
                <span className="text-white/90 text-xs lg:text-sm drop-shadow-sm font-medium">
                    {article.author.name || 'Alimov Alim'}
                </span>
            </div>
        </Link>
    );
}
