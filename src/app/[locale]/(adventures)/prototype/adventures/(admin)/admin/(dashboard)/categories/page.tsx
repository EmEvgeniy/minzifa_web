import CategoriesList from '@/components/Adventures/Admin/Categories/CategoriesList';

export const metadata = {
    title: 'Categories Management | Adventures Admin',
    description: 'Manage article categories for the Adventures section.',
};

export default async function CategoriesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <CategoriesList locale={locale} />;
}
