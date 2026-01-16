'use client';

import React, { useState, useEffect } from 'react';
import ArticleCard from '@/components/Adventures/UI/ArticleCard/ArticleCard';
import { Article } from '@/components/Adventures/data/mockData';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { cn } from '@/utils';

interface RelatedArticlesSliderProps {
    articles: Article[];
    itemsPerPage?: number;
    className?: string;
    gridClassName?: string;
    loop?: boolean;
}

export default function RelatedArticlesSlider({
    articles,
    itemsPerPage = 2,
    className = "",
    gridClassName = "grid-cols-1 md:grid-cols-2 gap-4",
    loop = true
}: RelatedArticlesSliderProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(articles.length / itemsPerPage);

    // Reset pagination if content changes
    useEffect(() => {
        setCurrentPage(0);
    }, [articles.length, itemsPerPage]);

    const handleNext = () => {
        if (!loop && currentPage === totalPages - 1) return;
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const handlePrev = () => {
        if (!loop && currentPage === 0) return;
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const startIndex = currentPage * itemsPerPage;
    const currentArticles = articles.slice(startIndex, startIndex + itemsPerPage);

    // Only show controls if there is more than 1 page
    const showControls = totalPages > 1;

    // Helper to determine button state
    const isPrevDisabled = !loop && currentPage === 0;
    const isNextDisabled = !loop && currentPage === totalPages - 1;

    return (
        <div className={cn("relative", className)}>
            {/* Mobile View: Horizontal Scroll */}
            <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 no-scrollbar gap-4">
                {articles.map((article) => (
                    <div key={article.id} className="min-w-[85%] sm:min-w-[60%] snap-center h-full">
                        <ArticleCard
                            article={article}
                            variant="vertical"
                            className="h-full shadow-sm border border-gray-100"
                        />
                    </div>
                ))}
            </div>

            {/* Desktop View: Paginated Grid */}
            <div className="hidden md:block min-h-[400px]">
                <div
                    key={currentPage}
                    className={cn(
                        "grid animate-slide-fade",
                        gridClassName
                    )}
                >
                    {currentArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                    {Array.from({ length: Math.max(0, itemsPerPage - currentArticles.length) }).map((_, idx) => (
                        <div key={`empty-${idx}`} className="hidden md:block" />
                    ))}
                </div>
            </div>

            {/* Controls */}
            {showControls && (
                <div className="hidden md:flex gap-2.5 mt-8 justify-start items-center">
                    <button
                        onClick={handlePrev}
                        disabled={isPrevDisabled}
                        className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center transition-colors text-white",
                            isPrevDisabled
                                ? "bg-[#D0D0D0] cursor-not-allowed opacity-50"
                                : "bg-[#2D3A31] hover:bg-[#1a231d]"
                        )}
                        aria-label="Previous articles"
                    >
                        <FaChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={isNextDisabled}
                        className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center transition-colors text-white",
                            isNextDisabled
                                ? "bg-[#D0D0D0] cursor-not-allowed opacity-50"
                                : "bg-[#2D3A31] hover:bg-[#1a231d]"
                        )}
                        aria-label="Next articles"
                    >
                        <FaChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
