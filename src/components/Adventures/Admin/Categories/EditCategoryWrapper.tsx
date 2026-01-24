'use client';

import CategoryForm from "@/components/Adventures/Admin/Categories/CategoryForm";
import { useCategory } from "@/api/adventures/categories";
import { useParams } from "next/navigation";

export default function EditCategoryPage() {
    const params = useParams();
    const id = params.id as string;
    const locale = params.locale as string;
    const { data: category, isLoading } = useCategory(id);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3ca542]"></div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Category not found</h2>
            </div>
        );
    }

    const name = category.name;
    const description = category.description;
    const lang = category.lang;

    const initialData = {
        id: category.id,
        slug: category.slug,
        image: category.image || '',
        lang,
        name,
        description,
        seo: category.seo || { title: '', description: '', keywords: '' }
    };

    return <CategoryForm locale={locale} mode="edit" initialData={initialData} />;
}
