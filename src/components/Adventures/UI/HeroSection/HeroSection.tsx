'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Article } from '@/types/adventures';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface HeroSectionProps {
    articles: Article[];
}

export default function HeroSection({ articles }: HeroSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (articles.length === 0) return null;

    const currentArticle = articles[currentIndex];

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="relative w-full aspect-[16/9] max-h-[70vh] overflow-hidden">
            {/* Background Image */}
            <Image
                src={currentArticle.image || 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop'}
                alt={currentArticle.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-end">
                <div className="container w-full pb-12 lg:pb-16">
                    <div className="max-w-2xl">
                        {/* Category */}
                        <span className="inline-block px-3 py-1 bg-foreground text-white text-xs font-medium rounded-full mb-4">
                            {currentArticle.category?.name}
                        </span>

                        {/* Title */}
                        <h1 className="text-white text-3xl lg:text-5xl font-title leading-tight mb-4">
                            {currentArticle.title}
                        </h1>

                        {/* Excerpt */}
                        <p className="text-white/80 text-base lg:text-lg mb-6 line-clamp-2">
                            {currentArticle.excerpt}
                        </p>

                        {/* Read More */}
                        <Link
                            href={`/prototype/adventures/${currentArticle.slug}`}
                            className="inline-flex items-center gap-2 text-white font-medium hover:underline"
                        >
                            Read article
                            <FiChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            {articles.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer"
                        aria-label="Previous"
                    >
                        <FiChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer"
                        aria-label="Next"
                    >
                        <FiChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                        {articles.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
