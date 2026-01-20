'use client';

import Link from 'next/link';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import type { Category } from '@/types/adventures';

interface CategoryCardProps {
    category: Category;
    articleCount: number;
    locale: string;
    onDelete?: (id: number) => void;
}

const CATEGORY_COLORS = [
    'from-[#3ca542] to-emerald-600',
    'from-blue-500 to-cyan-500',
    'from-emerald-500 to-teal-500',
    'from-amber-500 to-orange-500',
    'from-rose-500 to-red-500',
    'from-[#3ca542] to-lime-600',
];

export const CategoryCard = ({ category, articleCount, locale, onDelete }: CategoryCardProps) => {
    const colorIndex = Number(category.id) % CATEGORY_COLORS.length || 0;
    const gradientClass = CATEGORY_COLORS[colorIndex];

    return (
        <div className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-[#3ca542] dark:hover:border-[#3ca542] transition-all duration-300 hover:shadow-xl hover:shadow-[#3ca542]/10">
            {/* Gradient Header */}
            <div className={`h-24 bg-gradient-to-br ${gradientClass} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"></div>
                <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {category.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Link
                        href={`/${locale}/prototype/adventures/admin/categories/${category.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#3ca542] hover:bg-[#348e39] text-white text-sm font-medium transition-colors"
                    >
                        <FiEdit className="w-4 h-4" />
                        <span>Edit</span>
                    </Link>

                    <button
                        onClick={() => onDelete?.(category?.id)}
                        className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                        <FiTrash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
