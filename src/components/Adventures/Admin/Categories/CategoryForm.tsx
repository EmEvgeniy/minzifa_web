'use client';

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImageSelector } from "../UI/ImageSelector";
import { LangSelector } from "../UI/LangSelector";
import { useCreateCategory, useUpdateCategory } from "@/api/adventures/categories";
import { toast } from "react-toastify";

// Schema definition based on the requested interface
const categorySchema = z.object({
    id: z.union([z.string(), z.number()]).optional(),
    lang: z.string().min(2, "Language is required"),
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and dashes"),
    image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    seo: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        keywords: z.string().optional(),
    }).optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
    locale: string;
    initialData?: Partial<CategoryFormData>;
    mode: 'create' | 'edit';
}

export default function CategoryForm({ locale, initialData, mode }: CategoryFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const createCategory = useCreateCategory();
    const updateCategory = useUpdateCategory();

    const {
        control,
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: initialData || {
            lang: locale || 'en',
            name: "",
            description: "",
            slug: "",
            image: "",
            seo: {
                title: "",
                description: "",
                keywords: "",
            }
        },
    });

    const nameValue = watch("name");
    const langValue = watch("lang");

    // Auto-generate slug from name if in create mode or slug is empty
    useEffect(() => {
        if (mode === 'create' && nameValue && langValue === 'en') {
            const slug = nameValue
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '');

            setValue("slug", slug, { shouldValidate: true });
        }
    }, [nameValue, langValue, mode, setValue]);

    const onSubmit = async (data: CategoryFormData) => {
        setIsSubmitting(true);
        try {
            const payload = {
                ...data,
            };

            if (mode === 'create') {
                await createCategory.mutateAsync(payload as any);
                toast.success('Category created successfully!');
            } else if (initialData?.id || data.id) {
                const id = (initialData?.id || data.id)!.toString();
                const { id: _, ...updatePayload } = payload;
                await updateCategory.mutateAsync({ id, data: updatePayload as any });
                toast.success('Category updated successfully!');
            }
            router.push(`/${locale}/prototype/adventures/admin/categories`);
            router.refresh();
        } catch (err: any) {
            console.error('Error saving category:', err);
            const errorMessage = err?.response?.data?.message || 'Failed to save category. Please try again.';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto pb-20 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {mode === 'create' ? 'Create Category' : 'Edit Category'}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        {mode === 'create' ? 'Define a new adventure category' : `Editing #${initialData?.id || ''}`}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href={`/${locale}/prototype/adventures/admin/categories`}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-semibold transition-all"
                    >
                        Cancel
                    </Link>
                    <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className={`px-8 py-2.5 bg-[#3ca542] text-white rounded-xl font-bold hover:bg-[#348e39] transition-all shadow-lg shadow-[#3ca542]/20 active:scale-[0.98] flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : null}
                        {mode === 'create' ? 'Create Category' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    {...register("name")}
                                    className={`w-full px-5 py-4 rounded-2xl border ${errors.name
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-slate-200 dark:border-slate-700 focus:ring-[#3ca542]/40 focus:border-[#3ca542]'
                                        } bg-slate-50/50 dark:bg-slate-800/30 text-slate-900 dark:text-white focus:outline-none focus:ring-4 transition-all text-lg font-medium`}
                                    placeholder="e.g. Silk Road Tours"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-500 ml-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                    Description
                                </label>
                                <textarea
                                    {...register("description")}
                                    rows={8}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:ring-[#3ca542]/40 focus:border-[#3ca542] bg-slate-50/50 dark:bg-slate-800/30 text-slate-900 dark:text-white focus:outline-none focus:ring-4 transition-all resize-none leading-relaxed"
                                    placeholder="Write a compelling description for this category..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEO Block */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 transition-colors">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">SEO Settings</h3>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Meta Title</label>
                                <input
                                    {...register("seo.title")}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-[#3ca542]/40 focus:border-[#3ca542] bg-slate-50/50 dark:bg-slate-800/30 text-slate-900 dark:text-white focus:outline-none focus:ring-4 transition-all"
                                    placeholder="Meta title for search engines"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Meta Keywords</label>
                                <input
                                    {...register("seo.keywords")}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-[#3ca542]/40 focus:border-[#3ca542] bg-slate-50/50 dark:bg-slate-800/30 text-slate-900 dark:text-white focus:outline-none focus:ring-4 transition-all"
                                    placeholder="keyword1, keyword2, adventure"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Meta Description</label>
                                <textarea
                                    {...register("seo.description")}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-[#3ca542]/40 focus:border-[#3ca542] bg-slate-50/50 dark:bg-slate-800/30 text-slate-900 dark:text-white focus:outline-none focus:ring-4 transition-all resize-none"
                                    placeholder="Brief meta description..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Settings Panel */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 space-y-6">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">Settings</h3>

                        {/* Language Selector */}
                        <Controller
                            name="lang"
                            control={control}
                            render={({ field }) => (
                                <LangSelector
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />

                        {/* Slug */}
                        <div className="space-y-2">
                            <label htmlFor="slug" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
                                URL Slug
                            </label>
                            <input
                                id="slug"
                                type="text"
                                {...register("slug")}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.slug ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3ca542]/40 font-mono text-sm transition-all`}
                            />
                            {errors.slug && (
                                <p className="mt-1 text-xs text-red-500 ml-1">{errors.slug.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Image Management */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                        <Controller
                            name="image"
                            control={control}
                            render={({ field }) => (
                                <ImageSelector
                                    value={field.value}
                                    onChange={field.onChange}
                                    label="Cover Image"
                                    description="Upload from your computer or provide an external URL"
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
