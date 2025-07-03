import { Tour as TourData } from "@/components/Tour/_types";
import { TourWrapper } from "@/components/Tour/TourWrapper";
import Loader from "@/components/UI/Loader/Loader";
import type { Metadata } from 'next'
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
    params: Promise<{ locale: string; tour: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { tour: slug, locale } = await params;

    const tour: TourData = await fetch(`https://api.minzifatravel.com/api/v1/tours/${slug}?locale=${locale}`, {
        next: { revalidate: 60 },
    }).then((res) => res.json());

    return {
        title: tour?.seo_metadata?.title,
        description: tour?.seo_metadata?.description,
        keywords: tour?.seo_metadata?.keywords,
    }
}

export default async function Tour({ params }: Props) {
    const { tour: slug, locale } = await params;

    const res = await fetch(`https://api.minzifatravel.com/api/v1/tours/${slug}?locale=${locale}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) notFound();

    const tourData: TourData = await res.json();

    if (!tourData?.id) notFound();

    if (tourData?.photo) {
        tourData?.gallery.unshift(tourData?.photo);
    }

    return <Suspense fallback={<Loader />}>
        <TourWrapper tourData={tourData} />
    </Suspense>;
}