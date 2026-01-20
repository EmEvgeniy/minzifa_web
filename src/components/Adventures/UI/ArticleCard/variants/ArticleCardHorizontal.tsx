'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types/adventures';
import { useLocale } from 'next-intl';

interface Props {
    article: Article;
    className?: string;
    showExcerpt?: boolean;
}

export default function ArticleCardHorizontal({ article, className = '', showExcerpt = false }: Props) {
    const locale = useLocale();
    return (
        <Link
            href={`/${locale}/prototype/adventures/${article.slug}`}
            className={`group flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow ${className}`}
        >
            <div className={`relative w-28 lg:w-32 ${showExcerpt ? 'lg:w-80 lg:aspect-[1.5/1]' : 'aspect-[1.4/1]'} shrink-0 overflow-hidden rounded-lg`}>
                <Image
                    src={article.image || 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop'}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-col min-w-0 pr-2">
                <h3 className={`font-title font-bold text-sm lg:text-base text-text group-hover:text-foreground/80 transition-colors line-clamp-2 leading-tight mb-1`}>
                    {article.title}
                </h3>
                <span className="text-gray-400 text-[10px] mb-2 block">by {article?.user?.name}</span>

                {showExcerpt && (
                    <p className="hidden md:block text-gray-600 text-xs lg:text-[13px] leading-relaxed line-clamp-3">
                        {article.excerpt}
                    </p>
                )}
            </div>
        </Link>
    );
}
