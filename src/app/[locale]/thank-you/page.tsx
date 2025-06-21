import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string; }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = 'thank-you';
    const locale = (await params).locale;

    const data = await fetch(`https://api.minzifatravel.com/api/v1/pages/${slug}?locale=${locale}`, {
        next: { revalidate: 60 },
    }).then((res) => res.json());

    return {
        title: data?.seo_metadata?.title,
        description: data?.seo_metadata?.description,
        keywords: data?.seo_metadata?.keywords,
    }
}

export const ThankYou = () => {
    return <div>Thank you</div>;
};