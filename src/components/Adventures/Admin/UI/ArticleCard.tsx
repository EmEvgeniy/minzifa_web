'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiEdit, FiTrash2, FiEye, FiClock, FiArchive } from 'react-icons/fi';
import { ArticleStatuses, type Article, AdventureRoles } from '@/types/adventures';

interface ArticleCardProps {
    article: Article;
    locale: string;
    userRole?: AdventureRoles;
    onDelete?: (id: string) => void;
    onMoveToDraft?: (id: string) => void;
}

export const ArticleCard = ({ article, locale, userRole, onDelete, onMoveToDraft }: ArticleCardProps) => {
    const isPublished = article.status === ArticleStatuses.PUBLISHED || !!article.publishedAt;
    const placeholderImage = 'https://placehold.co/600x400/png?text=No+Image';

    // Safety check for image URL
    const getSafeImageUrl = (url?: string) => {
        if (!url) return placeholderImage;
        if (url.startsWith('/') || url.startsWith('http')) return url;
        return placeholderImage;
    };

    const imageUrl = getSafeImageUrl(article.image);

    // Get category name from the first category object
    const firstCategory = article.categories?.[0];
    const categoryName = typeof firstCategory === 'object' && firstCategory?.name
        ? firstCategory.name
        : 'No Category';

    // Get author name from user object
    const authorName = article.user?.name || 'Unknown Author';

    // Role-based permissions
    const canDelete = userRole === AdventureRoles.ADMIN || userRole === AdventureRoles.MODERATOR;
    const canEdit = userRole !== AdventureRoles.SEO;
    const canMoveToDraft = userRole === AdventureRoles.EDITOR;
    const showSEO = userRole && [AdventureRoles.SEO, AdventureRoles.MODERATOR, AdventureRoles.ADMIN].includes(userRole);

    return (
        <div className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-[#3ca542] dark:hover:border-[#3ca542] transition-all duration-300 hover:shadow-xl hover:shadow-[#3ca542]/10 hover:-translate-y-1">
            {/* Image */}
            <Link href={`/${locale}/prototype/adventures/admin/articles/${article.id}`}>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                        src={imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-[#3ca542] dark:text-[#3ca542] border border-[#3ca542] dark:border-[#3ca542]">
                            {categoryName}
                        </span>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                        <span className={`
                            px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border
                            ${article.status === ArticleStatuses.PUBLISHED
                                ? 'bg-emerald-500/90 text-white border-emerald-400'
                                : article.status === ArticleStatuses.DRAFT
                                    ? 'bg-amber-500/90 text-white border-amber-400'
                                    : article.status === ArticleStatuses.TO_REVIEW
                                        ? 'bg-blue-500/90 text-white border-blue-400'
                                        : article.status === ArticleStatuses.ARCHIVED
                                            ? 'bg-slate-500/90 text-white border-slate-400'
                                            : article.status === ArticleStatuses.CANCELLED
                                                ? 'bg-red-500/90 text-white border-red-400'
                                                : 'bg-slate-500/90 text-white border-slate-400'
                            }
                        `}>
                            {article.status}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Content */}
            <div className="p-6 space-y-4">
                <Link href={`/${locale}/prototype/adventures/admin/articles/${article.id}`}>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-[#3ca542] dark:group-hover:text-[#3ca542] transition-colors">
                        {article.title}
                    </h3>
                </Link>

                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                        <span>{authorName}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <FiClock className="w-3.5 h-3.5" />
                        <span>{article.readTime || 5} min read</span>
                    </div>
                </div>

                {/* SEO Section - only for SEO+ roles */}
                {showSEO && article.seo && (
                    <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">SEO Metadata</h4>
                        <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                            {article.seo.title && (
                                <p><strong className="text-slate-700 dark:text-slate-300">Title:</strong> {article.seo.title}</p>
                            )}
                            {article.seo.description && (
                                <p className="line-clamp-2"><strong className="text-slate-700 dark:text-slate-300">Description:</strong> {article.seo.description}</p>
                            )}
                            {article.seo.keywords && (
                                <p className="line-clamp-1"><strong className="text-slate-700 dark:text-slate-300">Keywords:</strong> {article.seo.keywords}</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {canEdit && (
                        <Link
                            href={`/${locale}/prototype/adventures/admin/articles/${article.id}`}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#3ca542] hover:bg-[#348e39] text-white text-sm font-medium transition-colors"
                        >
                            <FiEdit className="w-4 h-4" />
                            <span>Edit</span>
                        </Link>
                    )}

                    <Link
                        href={`/${locale}/prototype/adventures/${article.slug}`}
                        target="_blank"
                        className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                        title="View Article"
                    >
                        <FiEye className="w-4 h-4" />
                    </Link>

                    {canMoveToDraft && (
                        <button
                            onClick={() => onMoveToDraft?.(String(article.id))}
                            className="px-4 py-2 rounded-xl bg-amber-100 dark:bg-amber-900/20 hover:bg-amber-200 dark:hover:bg-amber-900/30 text-amber-700 dark:text-amber-400 transition-colors"
                            title="Move to Draft"
                        >
                            <FiArchive className="w-4 h-4" />
                        </button>
                    )}

                    {canDelete && (
                        <button
                            onClick={() => onDelete?.(String(article.id))}
                            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            title="Delete Article"
                        >
                            <FiTrash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
