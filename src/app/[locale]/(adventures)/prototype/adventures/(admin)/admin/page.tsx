import { redirect } from 'next/navigation';

export default async function AdventuresAdminRootPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // Redirect to the main dashboard page (articles)
    // The AdventuresAuthGuard in the layout will handle the redirect to login if the user is not authenticated.
    redirect(`/${locale}/prototype/adventures/admin/articles`);
}
