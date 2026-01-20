import CategoryForm from "@/components/Adventures/Admin/Categories/CategoryForm";

export const metadata = {
    title: 'Create Category | Adventures Admin',
    description: 'Add a new category for travel articles.',
};

export default async function CreateCategoryPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <CategoryForm locale={locale} mode="create" />;
}
