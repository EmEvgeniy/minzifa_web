import { Tour as TourData } from "@/components/Tour/_types";
import { TourWrapper } from "@/components/Tour/TourWrapper";
import type { Metadata } from 'next'

type Props = {
    params: Promise<{ locale: string; tour: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = (await params).tour;
    const locale = (await params).locale;

    const tour: TourData = await fetch(`https://api.minzifatravel.com/api/v1/tours/${slug}?locale=${locale}`, {
        next: { revalidate: 60 },
    }).then((res) => res.json());

    return {
        title: tour?.seo_metadata?.title,
        description: tour?.seo_metadata?.description,
        keywords: tour?.seo_metadata?.keywords,
    }
}

export default function Tour() {
    return <TourWrapper />;
}