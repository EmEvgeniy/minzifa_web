'use client';

import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaExpand, FaXmark } from 'react-icons/fa6';

interface ArticleGridGalleryProps {
    images: string[];
}

const ArticleGridGallery: React.FC<ArticleGridGalleryProps> = ({ images }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);



    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeLightbox = () => {
        setIsOpen(false);
        document.body.style.overflow = 'unset'; // Restore scrolling
    };

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleNext, handlePrev]);

    if (!images || images.length === 0) return null;

    return (
        <div className="my-12">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        onClick={() => openLightbox(idx)}
                        className="relative aspect-square md:aspect-[4/5] lg:aspect-square rounded-sm overflow-hidden group cursor-pointer"
                    >
                        <Image
                            src={img}
                            alt={`Gallery image ${idx + 1}`}
                            fill
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                        {/* Zoom Icon Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-black/50 p-3 rounded-full text-white backdrop-blur-sm">
                                <FaExpand className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-50"
                        aria-label="Close gallery"
                    >
                        <FaXmark className="w-8 h-8" />
                    </button>

                    {/* Image Container */}
                    <div className="relative w-full h-full max-w-7xl max-h-screen p-4 md:p-10 flex items-center justify-center">
                        <div
                            key={currentIndex}
                            className="relative w-full h-full animate-fade-in"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={images[currentIndex]}
                                alt={`Gallery image ${currentIndex + 1}`}
                                fill
                                className="object-contain"
                                priority
                                sizes="100vw"
                            />
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-4 z-50 rounded-full hover:bg-white/10"
                        aria-label="Previous image"
                    >
                        <FaChevronLeft className="w-8 h-8" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-4 z-50 rounded-full hover:bg-white/10"
                        aria-label="Next image"
                    >
                        <FaChevronRight className="w-8 h-8" />
                    </button>

                    {/* Counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 font-text text-sm tracking-wider bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArticleGridGallery;
