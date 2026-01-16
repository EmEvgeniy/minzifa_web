'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface ArticleSliderProps {
    images: string[];
    caption?: string;
}

const ArticleSlider: React.FC<ArticleSliderProps> = ({ images, caption }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="my-12">
            <div className="relative aspect-[4/3] w-full bg-gray-100 mb-4 select-none overflow-hidden rounded-sm">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                            }`}
                    >
                        <Image
                            src={img}
                            alt={`Slide ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-4 font-text text-text-secondary text-sm">
                <p className="flex-1 leading-relaxed">
                    {caption || "Gallery image description"}
                </p>

                <div className="flex items-center gap-4 shrink-0 select-none">
                    <span className="tabular-nums">
                        {currentIndex + 1}/{images.length}
                    </span>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={handlePrev}
                            className="p-1 hover:text-foreground transition-colors disabled:opacity-50"
                            aria-label="Previous image"
                        >
                            <FaChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-1 hover:text-foreground transition-colors disabled:opacity-50"
                            aria-label="Next image"
                        >
                            <FaChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleSlider;
