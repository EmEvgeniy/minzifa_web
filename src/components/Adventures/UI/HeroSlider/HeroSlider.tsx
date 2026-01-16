'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Article } from '@/components/Adventures/data/mockData';
import { useLocale } from 'next-intl';

interface HeroSliderProps {
    articles: Article[];
}

export default function HeroSlider({ articles }: HeroSliderProps) {
    const locale = useLocale();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % articles.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length);
    };

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextSlide();
        }
        if (isRightSwipe) {
            prevSlide();
        }
    };

    return (
        <div
            className="relative aspect-[3/3.4] lg:aspect-[16/9] overflow-hidden lg:rounded-2xl group touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {articles.map((article, index) => (
                <div
                    key={article.id || index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                        }`}
                >
                    <Link
                        href={`/${locale}/prototype/adventures/${article.slug}`}
                        className="block w-full h-full relative"
                    >
                        {/* Image */}
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="100vw"
                            priority={index === 0}
                        />
                        {/* Gradient overlay - усиленное затемнение */}
                        <div className="absolute inset-0 bg-black/50" />

                        {/* Category + Title - по центру */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-16">
                            {/* Category - простой текст без фона */}
                            <span className="text-white text-sm font-medium tracking-wider uppercase mb-3 drop-shadow">
                                {article.category.name}
                            </span>
                            {/* Title */}
                            <h1 className="text-white text-2xl md:text-3xl lg:text-[56px] font-title leading-tight max-w-4xl drop-shadow-lg mb-8">
                                {article.title}
                            </h1>
                            <button className="bg-white text-black px-6 py-3 lg:px-12 lg:py-4 rounded-sm text-sm lg:text-base">Read more</button>
                        </div>
                    </Link>
                </div>
            ))}

            {/* Left arrow - по центру слева */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    prevSlide();
                }}
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer"
            >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Right arrow - по центру справа */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    nextSlide();
                }}
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer"
            >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}
