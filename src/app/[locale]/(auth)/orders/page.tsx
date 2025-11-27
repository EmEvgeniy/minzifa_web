import { Orders } from "@/components/Auth/Orders/Orders";
import { DefaultPageProps } from "@/types";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    const locale = (await params).locale;
    const t = await getTranslations({ locale, namespace: 'orders.metadata' });

    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
        alternates: {
            canonical: `https://minzifatravel.com/${locale}/orders`,
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: `https://minzifatravel.com/${locale}/orders`,
            siteName: 'Minzifa Travel',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
        },
    };
}

export default async function OrderPage() {
    return <Orders />;
}