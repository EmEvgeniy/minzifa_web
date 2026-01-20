import LoginForm from '@/components/Adventures/Admin/Auth/LoginForm';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateStaticParams() {
    return ['en', 'de'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'adventures.admin.auth.login' });

    return {
        title: `${t('title')} | Adventures Admin | Minzifa Travel`,
        description: t('subtitle'),
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default function AdventuresLoginPage() {
    return <LoginForm />;
}