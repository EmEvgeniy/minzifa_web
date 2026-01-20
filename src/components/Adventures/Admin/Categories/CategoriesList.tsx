'use client';

import { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import { useCategories } from '@/api/adventures/categories';
import { useArticles } from '@/api/adventures/articles';
import { SearchBar } from '@/components/Adventures/Admin/UI/SearchBar';

interface CategoriesListProps {
    locale: string;
}

export default function CategoriesList({ locale }: CategoriesListProps) {
    const { data: categories, isLoading: isCategoriesLoading } = useCategories(locale);
    const { data: articles } = useArticles();
    const [searchQuery, setSearchQuery] = useState('');

    // Filter categories by search query and locale
    const filteredCategories = (categories || []).filter(category => {
        const name = category.name || '';
        const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLocale = category.lang === locale;
        return matchesSearch && matchesLocale;
    });

    // Get article count for each category
    const getCategoryArticleCount = (categoryId: number) => {
        return (articles || []).filter(article =>
            article.categories?.[0]?.id === categoryId
        ).length;
    };

    if (isCategoriesLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3ca542]"></div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Categories</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'} found
                    </p>
                </div>

                <Link
                    href={`/${locale}/prototype/adventures/admin/categories/create`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#3ca542] hover:bg-[#348e39] text-white font-semibold shadow-lg shadow-[#3ca542]/20 hover:shadow-xl hover:shadow-[#3ca542]/30 transition-all duration-300"
                >
                    <FiPlus className="w-5 h-5" />
                    <span>Create Category</span>
                </Link>
            </div>

            {/* Search */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <SearchBar
                    placeholder="Search categories..."
                    onSearch={setSearchQuery}
                    className="max-w-2xl"
                />
            </div>

            {/* Table */}
            {filteredCategories.length > 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                        Slug
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                        Articles
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {filteredCategories.map((category) => (
                                    <tr
                                        key={category.id}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 font-mono">
                                            #{category.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-slate-900 dark:text-white">
                                                {category.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                                                {category.slug}
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#3ca542]/10 text-[#3ca542]">
                                                {getCategoryArticleCount(category.id)} articles
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/${locale}/prototype/adventures/admin/categories/${category.id}`}
                                                    className="p-2 rounded-lg hover:bg-[#3ca542]/10 text-slate-600 dark:text-slate-400 hover:text-[#3ca542] transition-colors"
                                                    title="Edit"
                                                >
                                                    <FiEdit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => console.log('Delete category:', category.id)}
                                                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                                    title="Delete"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                        <FiPlus className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        No categories found
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                        Try adjusting your search
                    </p>
                </div>
            )}
        </div>
    );
}
