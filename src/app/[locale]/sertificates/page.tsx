export const dynamic = 'force-static';

import Breadcrumbs from "@/components/UI/Breadcrumbs/Breadcrumbs";
import { DefaultPageProps } from "@/types";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import Img1 from "@/assets/img/sertificates/01.jpg";
import Img2 from "@/assets/img/sertificates/02.jpg";
import Img3 from "@/assets/img/sertificates/03.jpg";

export function generateStaticParams() {
    return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
    const locale = (await params).locale;
    const t = await getTranslations({ locale });

    return t.raw('sertificates.seo_metadata');
}

const images = [
    {
        src: Img1,
        alt: 'sertificate'
    },
    {
        src: Img2,
        alt: 'sertificate'
    },
    {
        src: Img3,
        alt: 'sertificate'
    },
]

export default async function page({ params }: DefaultPageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    return (
        <section className="container py-[150px] flex flex-col gap-5 max-[768px]:py-[100px]">
            <Breadcrumbs locale={locale} link={{ link: '', title: t('breadcrumbs.sertificates') }} />
            <h1 className="text-[42px] max-[768px]:text-[30px] max-[550px]:text-[24px] font-title">
                {t('sertificates.title')}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {images.map((image, index) => <Image key={index} src={image.src} alt={image.alt} />)}
            </div>
        </section>
    );
}
