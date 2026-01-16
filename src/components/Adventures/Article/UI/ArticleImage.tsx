'use client';

import React from 'react';
import Image from 'next/image';

interface ArticleImageProps {
    src: string;
    alt: string;
    caption?: string;
    className?: string;
}

const ArticleImage: React.FC<ArticleImageProps> = ({ src, alt, caption, className = "" }) => {
    return (
        <figure className={`my-12 ${className}`}>
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
            </div>
            {caption && (
                <figcaption className="mt-3 text-sm text-text-secondary text-left font-medium italic">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
};

export default ArticleImage;
