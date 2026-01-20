'use client';

import { useState, useMemo } from 'react';
import { FiPlus } from 'react-icons/fi';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useArticles, useDeleteArticle, useUpdateArticle } from '@/api/adventures/articles';
import { useCategories } from '@/api/adventures/categories';
import { useAdventuresUsers } from '@/api/adventures/users';
import { ArticleCard } from '@/components/Adventures/Admin/UI/ArticleCard';
import { SearchBar } from '@/components/Adventures/Admin/UI/SearchBar';
import { FilterPills, type FilterOption } from '@/components/Adventures/Admin/UI/FilterPills';
import { useAdventuresAuthStore } from '@/store/adventures/useAdventuresAuthStore';
import { AdventureUser, ArticleStatuses } from '@/types/adventures';

interface ArticlesListProps {
    locale: string;
}

export default function ArticlesList({ locale }: ArticlesListProps) {
    const { user } = useAdventuresAuthStore();
    const currentUser = user as AdventureUser;
    const userRole = currentUser?.role;

    const { data: articles, isLoading: isArticlesLoading } = useArticles({
        user_id: userRole === 'EDITOR' ? currentUser?.id : "",
    });

    const { data: categories, isLoading: isCategoriesLoading } = useCategories();
    const { data: users, isLoading: isUsersLoading } = useAdventuresUsers();
    const deleteArticle = useDeleteArticle();
    const updateArticle = useUpdateArticle();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Map category IDs to category objects and user IDs to user objects
    const articlesWithCategories = useMemo(() => {
        if (!articles || !categories || !users) return [];
        return articles.map(article => ({
            ...article,
            categories: article.categories
                ?.map((catId: any) => {
                    if (typeof catId === 'number') {
                        return categories.find(c => c.id === catId);
                    }
                    return catId;
                })
                .filter(Boolean),
            user: users.find(u => u.id === article.userId) || article.user
        }));
    }, [articles, categories, users]);

    // Prepare category filter options
    const categoryOptions: FilterOption[] = useMemo(() => {
        if (!categories) return [];
        return categories.map(cat => ({
            id: cat.slug,
            label: cat.name,
            count: articlesWithCategories?.filter(a => a.categories?.[0]?.slug === cat.slug).length || 0,
        }));
    }, [categories, articlesWithCategories]);

    // Filter articles
    const filteredArticles = useMemo(() => {
        if (!articlesWithCategories) return [];
        return articlesWithCategories?.filter(article => {
            // Search filter
            const matchesSearch = searchQuery === '' ||
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

            // Category filter
            const matchesCategory = selectedCategories.length === 0 ||
                (article.categories?.[0]?.slug && selectedCategories.includes(article.categories[0].slug));

            return matchesSearch && matchesCategory;
        });
    }, [articlesWithCategories, searchQuery, selectedCategories]);

    // Handlers
    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) return;

        try {
            await deleteArticle.mutateAsync(id);
            toast.success('Article deleted successfully');
        } catch (error) {
            console.error('Failed to delete article:', error);
            toast.error('Failed to delete article. Please try again.');
        }
    };

    const handleMoveToDraft = async (article: any) => {
        if (!confirm('Move this article to draft? It will no longer be visible to the public.')) return;

        try {
            await updateArticle.mutateAsync({
                id: String(article.id),
                data: {
                    status: ArticleStatuses.DRAFT,
                    image: article.image,
                    categories: article.categories?.map((c: any) => c.id || c)
                } as any
            });
            toast.success('Article moved to drafts');
        } catch (error) {
            console.error('Failed to move article to draft:', error);
            toast.error('Failed to move article to drafts. Please try again.');
        }
    };

    if (isArticlesLoading || isCategoriesLoading || isUsersLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3ca542]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Articles</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} found
                    </p>
                </div>

                <Link
                    href={`/${locale}/prototype/adventures/admin/articles/create`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#3ca542] hover:bg-[#348e39] text-white font-semibold shadow-lg shadow-[#3ca542]/20 hover:shadow-xl hover:shadow-[#3ca542]/30 transition-all duration-300"
                >
                    <FiPlus className="w-5 h-5" />
                    <span>Create Article</span>
                </Link>
            </div>

            {/* Filters */}
            <div className="space-y-6 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <SearchBar
                    placeholder="Search articles by title or excerpt..."
                    onSearch={setSearchQuery}
                    className="max-w-2xl"
                />

                <FilterPills
                    label="Categories"
                    options={categoryOptions}
                    selected={selectedCategories}
                    onChange={setSelectedCategories}
                />
            </div>

            {/* Articles Grid */}
            {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            locale={locale}
                            userRole={userRole}
                            onDelete={handleDelete}
                            onMoveToDraft={() => handleMoveToDraft(article)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                        <FiPlus className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        No articles found
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                        Try adjusting your search or filters
                    </p>
                </div>
            )}
        </div>
    );
}
