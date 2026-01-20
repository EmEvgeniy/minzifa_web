'use client';

import { useState, useEffect } from "react";
import { useForm, Controller, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { FiSave, FiArrowLeft, FiEye, FiSend, FiX, FiArchive } from 'react-icons/fi';
import { BlockEditor } from "../BlockEditor/BlockEditor";
import { ArticleSidebar } from "./ArticleSidebar";
import TextareaAutosize from 'react-textarea-autosize';
import { articleSchema, ArticleFormData } from "./types";
import { useCreateArticle, useUpdateArticle } from "@/api/adventures/articles";
import { ArticlePayload } from "@/types/adventures";
import { toast } from 'react-toastify';

import { useAdventuresAuthStore } from "@/store/adventures/useAdventuresAuthStore";
import { AdventureUser, ArticleStatuses } from "@/types/adventures";
import { error } from "console";

interface ArticleEditorProps {
    initialData?: ArticleFormData & { id?: number };
    mode: 'create' | 'edit';
    locale: string;
}

export const ArticleEditor = ({ initialData, mode, locale }: ArticleEditorProps) => {
    const router = useRouter();
    const { user } = useAdventuresAuthStore();
    const currentUser = user as AdventureUser;
    const userRole = currentUser?.role || 'EDITOR';

    const [isSubmitting, setIsSubmitting] = useState(false);

    const defaultValues: ArticleFormData = initialData || {
        lang: locale || "en",
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        categories: [],
        userId: 0,
        publishedAt: new Date().toISOString().split('T')[0],
        status: ArticleStatuses.DRAFT,
        image: "",
        readTime: "0",
        seo: {
            title: "",
            description: "",
            keywords: ""
        },
        tags: [],
    };

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors, isDirty },
    } = useForm<ArticleFormData>({
        resolver: zodResolver(articleSchema) as Resolver<ArticleFormData>,
        defaultValues
    });

    const titleValue = watch("title");

    useEffect(() => {
        if (mode === 'create' && titleValue) {
            const slug = titleValue
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '');
            setValue("slug", slug, { shouldValidate: true });
        }
    }, [titleValue, mode, setValue]);

    useEffect(() => {
        if (mode === 'create' && userRole === 'EDITOR' && currentUser?.id) {
            setValue("userId", currentUser.id, { shouldValidate: true });
        }
    }, [mode, userRole, currentUser, setValue]);

    const createArticle = useCreateArticle();
    const updateArticle = useUpdateArticle();

    const onSubmit = async (data: ArticleFormData) => {
        setIsSubmitting(true);
        try {
            if (mode === 'create') {
                await createArticle.mutateAsync(data as ArticlePayload);
            } else if (initialData?.id) {
                await updateArticle.mutateAsync({
                    id: String(initialData.id),
                    data: data as ArticlePayload
                });
            }

            toast.success(mode === 'create' ? 'Article created successfully!' : 'Changes saved successfully!', {
                position: "top-right",
                autoClose: 3000,
            });

            // Revalidate cache to prevent 404 on immediate visit
            const slug = mode === 'create' ? (data.slug || "") : (initialData?.slug || "");
            if (slug) {
                const { revalidateArticle } = await import("@/app/api/adventures/actions");
                await revalidateArticle(slug, locale);
            }

            if (mode === 'create') {
                router.push(`/${locale}/prototype/adventures/admin/articles`);
                router.refresh();
            } else {
                router.refresh();
            }
        } catch (e) {
            console.error('Error saving article:', e);
            toast.error('Failed to save article. Please try again.', {
                position: "top-right",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-[#F8F9FA] dark:bg-slate-950 transition-colors pb-20">
            <header className={`relative transition-all duration-200 border-b bg-transparent border-transparent`}>
                <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/${locale}/prototype/adventures/admin/articles`}
                            className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500"
                        >
                            <FiArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-500">
                                {mode === 'create' ? 'New Article' : 'Editing Article'}
                            </span>
                            <span className="text-xs text-slate-400">
                                {isDirty ? 'Unsaved changes' : 'All changes saved'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {initialData?.slug && (
                            <Link
                                href={`/prototype/adventures/${initialData.slug}`}
                                target="_blank"
                                className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <FiEye className="w-4 h-4" />
                                <span>Preview</span>
                            </Link>
                        )}

                        {/* Status Action Buttons */}
                        {userRole === 'ADMIN' || userRole === 'MODERATOR' ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setValue("status", ArticleStatuses.PUBLISHED);
                                        handleSubmit(onSubmit)();
                                    }}
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-all shadow-lg disabled:opacity-70"
                                >
                                    <FiSave className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
                                    {isSubmitting ? 'Publishing...' : 'Publish'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setValue("status", ArticleStatuses.CANCELLED);
                                        handleSubmit(onSubmit)();
                                    }}
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition-all shadow-lg disabled:opacity-70"
                                >
                                    <FiX className="w-4 h-4" />
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setValue("status", ArticleStatuses.ARCHIVED);
                                        handleSubmit(onSubmit)();
                                    }}
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-full hover:bg-amber-700 transition-all shadow-lg disabled:opacity-70"
                                >
                                    <FiArchive className="w-4 h-4" />
                                    Archive
                                </button>
                            </>
                        ) : userRole === 'EDITOR' ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setValue("status", ArticleStatuses.DRAFT);
                                        handleSubmit(onSubmit)();
                                    }}
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-600 rounded-full hover:bg-slate-700 transition-all shadow-lg disabled:opacity-70"
                                >
                                    <FiSave className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
                                    {isSubmitting ? 'Saving...' : 'Save as Draft'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setValue("status", ArticleStatuses.TO_REVIEW);
                                        handleSubmit(onSubmit)();
                                    }}
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg disabled:opacity-70"
                                >
                                    <FiSend className="w-4 h-4" />
                                    Send to Review
                                </button>
                            </>
                        ) : userRole === 'SEO' ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setValue("status", ArticleStatuses.TO_REVIEW);
                                    handleSubmit(onSubmit)();
                                }}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg disabled:opacity-70"
                            >
                                <FiSend className="w-4 h-4" />
                                {isSubmitting ? 'Sending...' : 'Send to Review'}
                            </button>
                        ) : null}
                    </div>
                </div>
            </header>

            <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 mt-8">
                {/* Main Content Area */}
                <main className="min-w-0 space-y-8">
                    {/* Title Input */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Title</h2>
                        <TextareaAutosize
                            {...register("title")}
                            disabled={userRole === 'SEO'}
                            placeholder="Article Title"
                            className="w-full bg-transparent text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 placeholder:text-slate-300 dark:placeholder:text-slate-700 resize-none outline-none leading-tight disabled:opacity-80"
                            minRows={1}

                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

                        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Excerpt</h2>
                        <TextareaAutosize
                            {...register("excerpt")}
                            disabled={userRole === 'SEO'}
                            placeholder="Write a short excerpt..."
                            className="w-full bg-transparent text-xl md:text-2xl text-slate-500 dark:text-slate-400 placeholder:text-slate-300 dark:placeholder:text-slate-700 resize-none outline-none leading-normal disabled:opacity-80"
                            minRows={1}
                        />
                    </div>

                    {/* Block Editor */}
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Content</h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <Controller
                            name="content"
                            control={control}
                            render={({ field }) => (
                                <BlockEditor
                                    initialContent={field.value}
                                    onChange={field.onChange}
                                    readOnly={userRole === 'SEO'}
                                />
                            )}
                        />
                        {errors.content && <p className="text-red-500 text-sm mt-2">{errors.content.message}</p>}
                    </div>
                </main>

                {/* Sidebar */}
                <aside className="hidden lg:block">
                    <div className="sticky top-24">
                        <ArticleSidebar
                            register={register}
                            control={control}
                            errors={errors}
                            userRole={userRole}
                        />
                    </div>
                </aside>
            </div>
        </form>
    );
};
