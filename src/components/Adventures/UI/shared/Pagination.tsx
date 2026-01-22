'use client';

import Link from 'next/link';
import { cn } from '@/utils';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl?: string;
    className?: string;
}

export default function Pagination({
    currentPage,
    totalPages,
    baseUrl,
    className
}: PaginationProps) {
    const createPageUrl = (page: number) => {
        if (!baseUrl) return '#';
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}page=${page}`;
    };

    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let start = Math.max(1, currentPage - 2);
            const end = Math.min(totalPages, start + 4);

            if (end - start < 4) {
                start = Math.max(1, end - 4);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }
        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className={cn("flex items-center gap-4 font-text", className)}>
            {/* Previous Button */}
            {currentPage > 1 && (
                <Link
                    href={baseUrl ? createPageUrl(currentPage - 1) : '#'}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2F4F3E] text-white shadow-lg shadow-[#2F4F3E]/20 hover:bg-[#253e31] transition-all mr-2"
                    aria-label="Previous page"
                >
                    <FaChevronLeft size={14} />
                </Link>
            )}

            {pages.map((page) => {
                const isActive = page === currentPage;

                if (baseUrl) {
                    return (
                        <Link
                            key={page}
                            href={createPageUrl(page)}
                            className={cn(
                                "w-9 h-9 flex items-center justify-center rounded-lg text-base font-semibold transition-all duration-200",
                                isActive
                                    ? "bg-[#2F4F3E] text-white shadow-lg shadow-[#2F4F3E]/20"
                                    : "text-gray-400 hover:text-[#2F4F3E] hover:bg-gray-50"
                            )}
                        >
                            {page}
                        </Link>
                    );
                }

                return (
                    <button
                        key={page}
                        className={cn(
                            "w-9 h-9 flex items-center justify-center rounded-lg text-base font-semibold transition-all duration-200",
                            isActive
                                ? "bg-[#2F4F3E] text-white shadow-lg shadow-[#2F4F3E]/20"
                                : "text-gray-400 hover:text-[#2F4F3E] hover:bg-gray-50"
                        )}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next Button */}
            {currentPage < totalPages && (
                <Link
                    href={baseUrl ? createPageUrl(currentPage + 1) : '#'}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2F4F3E] text-white shadow-lg shadow-[#2F4F3E]/20 hover:bg-[#253e31] transition-all ml-2"
                    aria-label="Next page"
                >
                    <FaChevronRight size={14} />
                </Link>
            )}
        </div>
    );
}
