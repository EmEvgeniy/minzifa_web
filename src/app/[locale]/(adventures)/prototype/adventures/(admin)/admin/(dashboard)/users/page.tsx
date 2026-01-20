import UsersList from '@/components/Adventures/Admin/Users/UsersList';

export const metadata = {
    title: 'Users Management | Adventures Admin',
    description: 'Manage authors and editors for the Adventures section.',
};

export default async function UsersPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <UsersList locale={locale} />;
}
