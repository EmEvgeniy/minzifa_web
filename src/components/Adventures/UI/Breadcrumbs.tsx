'use client';

import Link from 'next/link';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className={`flex items-center text-sm ${className}`}>
            <ol className="flex items-center flex-wrap gap-2">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className="flex items-center">
                            {index > 0 && (
                                <span className="mx-2 text-gray-400 select-none">/</span>
                            )}

                            {isLast ? (
                                <span className="font-bold text-[#1a1a1a]" aria-current="page">
                                    {item.label}
                                </span>
                            ) : item.href ? (
                                <Link
                                    href={item.href}
                                    className="text-gray-400 hover:text-[#1a1a1a] transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-gray-400">
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
