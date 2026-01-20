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

export default function ArticleCardVertical({ article, className = '', showExcerpt = false }: Props) {
    const locale = useLocale();
    return (
        <div className={`bg-white p-4 rounded-2xl ${className}`}>
            <Link href={`/${locale}/prototype/adventures/${article.slug}`} className="group block">
                <div className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-xl mb-4">
                    <Image
                        src={article.image || 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop'}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                <div className="px-1 pb-2">
                    <h3 className="font-title font-bold text-xl md:text-2xl text-[#1a1a1a] leading-tight mb-2 group-hover:text-[#2D3A31] transition-colors">
                        {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                        By {article?.user?.name}
                    </p>
                    {showExcerpt && (
                        <p className="text-gray-500 text-sm mt-2">
                            {article.excerpt}
                        </p>
                    )}
                </div>
            </Link>
        </div>
    );
}
