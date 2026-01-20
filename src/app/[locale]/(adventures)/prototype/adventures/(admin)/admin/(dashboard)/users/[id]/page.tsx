import EditUserWrapper from '@/components/Adventures/Admin/Users/EditUserWrapper';

export const metadata = {
    title: 'Edit User | Adventures Admin',
    description: 'Update user profile and permissions.',
};

export default async function EditUserPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <EditUserWrapper locale={locale} />;
}
