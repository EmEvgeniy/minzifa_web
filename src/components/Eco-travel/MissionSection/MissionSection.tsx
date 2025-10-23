import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { lr } from '@/assets/img';
import { ISeoMetadata } from '@/types';

interface MissionSectionProps {
    seo_metadata: ISeoMetadata;
    missionContent: string[];
    t: (key: string) => string;
}

export default function MissionSection({ t, missionContent, seo_metadata }: MissionSectionProps) {
    const missionBackgroundLeft = lr;
    const missionBackgroundRight = lr;

    return (
        <section className="bg-[#16372D] w-full min-h-[385px] relative h-full mb-[70px] overflow-hidden">
            <ImageWithFallback
                src={missionBackgroundLeft}
                alt={seo_metadata?.title as string}
                width={800}
                height={600}
                className="opacity-10 object-cover absolute top-0 left-[-20%] z-10 w-[823.5px] h-[536px]"
            />
            <ImageWithFallback
                src={missionBackgroundRight}
                alt={seo_metadata?.title as string}
                width={800}
                height={600}
                className="opacity-10 object-cover absolute rotate-180 top-0 right-[-20%] z-10 w-[823.5px] h-[536px] max-[768px]:hidden"
            />
            <div className="container relative z-30 text-white py-[70px] flex flex-col items-center justify-center gap-10 max-[1024px]:gap-5">
                <h2 className="text-[42px] text-center max-[1024px]:text-[35px] max-[500px]:text-[24px]">
                    {t('eco.mission.title')}
                </h2>
                {missionContent.map((text: string, index: number) => (
                    <p className="text-[18px] text-center flex flex-col gap-5 max-[500px]:text-[16px]" key={`mission-${index}`}>{text}</p>
                ))}
            </div>
        </section>
    );
}