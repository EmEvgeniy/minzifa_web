import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import { eco_bg } from '@/assets/img';
import { eco_icon } from '@/assets/icons';
import { ISeoMetadata } from '@/types';

interface HeroSectionProps {
    locale: string;
    seo_metadata: ISeoMetadata | null;
    t: (key: string) => string;
}

export default function HeroSection({ locale, seo_metadata, t }: HeroSectionProps) {
    const heroBackground = eco_bg;
    const heroIcon = eco_icon;

    return (
        <section className="min-h-[90svh] w-full relative bg-[#16372D] flex items-center justify-center max-[768px]:min-h-[70svh]">
            <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
            <ImageWithFallback
                src={heroBackground}
                alt={seo_metadata?.title as string}
                className="object-cover absolute top-0 z-10"
            />
            <div className="container absolute z-30 top-35 max-[1024px]:top-25 w-full">
                <Breadcrumbs
                    mainStyle="text-white"
                    listClasses="text-white"
                    locale={locale}
                    link={{ link: '', title: t('breadcrumbs.eco') }}
                />
            </div>
            <div className="container relative z-30 flex flex-col items-center justify-center gap-5">
                <ImageWithFallback
                    src={heroIcon}
                    alt="Eco icon"
                    width={100}
                    height={100}
                    className="w-[65px] h-[65px]"
                />
                <h1 className="text-white text-[56px] flex flex-col text-center max-[768px]:text-[35px] max-[500px]:text-[24px] font-title uppercase">
                    {t('eco.title')}
                </h1>
            </div>
        </section>
    );
}