import UserForm from "@/components/Adventures/Admin/Users/UserForm";

export const metadata = {
    title: 'Add User | Adventures Admin',
    description: 'Add a new member to the Adventures team.',
};

export default async function CreateUserPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <UserForm locale={locale} mode="create" />;
}
