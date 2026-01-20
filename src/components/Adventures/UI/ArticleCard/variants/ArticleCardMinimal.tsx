'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types/adventures';
import { useLocale } from 'next-intl';

interface Props {
    article: Article;
    className?: string;
}

export default function ArticleCardMinimal({ article, className = '' }: Props) {
    const locale = useLocale();
    return (
        <Link
            href={`/${locale}/prototype/adventures/${article.slug}`}
            className={`group flex gap-3 mb-5 last:mb-0 ${className}`}
        >
            <div className="relative w-[90px] aspect-square shrink-0 overflow-hidden rounded">
                <Image
                    src={article.image || 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop'}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-col min-w-0">
                <h3 className="font-title font-bold text-sm text-text group-hover:text-foreground/80 transition-colors line-clamp-3 leading-[1.2] mb-1.5">
                    {article.title}
                </h3>
                <span className="text-gray-400 text-[10px] uppercase tracking-wider font-medium">
                    {article.published_at ? new Date(article.published_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    }) : 'Not published'}
                </span>
            </div>
        </Link>
    );
}
