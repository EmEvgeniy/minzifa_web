import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { eco_icon2 } from '@/assets/icons';
import { respect } from '@/assets/img';

interface EnvironmentSectionProps {
    t: (key: string) => string;
    environmentContent: string[];
}

export default function EnvironmentSection({ t, environmentContent }: EnvironmentSectionProps) {
    const environmentIcon = eco_icon2;
    const respectImage = respect;

    return (
        <section className="container flex flex-col gap-5 items-center justify-center h-full py-[70px] max-[768px]:py-[40px] max-[768px]:gap-3">
            <ImageWithFallback
                src={environmentIcon}
                alt="Environment icon"
                width={100}
                height={100}
                className="w-[65px] h-[65px]"
            />
            <h5 className="text-[42px] max-w-[70%] text-center max-[1024px]:max-w-full max-[1024px]:text-[30px] max-[500px]:text-[24px]">
                {t('eco.env.title')}
            </h5>
            <p className="text-[24px] max-w-[70%] text-center max-[1024px]:max-w-full max-[768px]:text-[18px]">
                {t('eco.env.sub_title')}
            </p>
            <div className="w-full flex gap-5 min-h-[400px] h-full max-[768px]:flex-col-reverse max-[768px]:pt-[30px]">
                <div className="bg-[#BCCEC8] rounded-[16px]   flex flex-col justify-between p-5 gap-5 text-[18px] w-1/2 max-[768px]:w-full max-[500px]:text-[16px]">
                    {environmentContent?.map((item: string, index: number) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>

                <ImageWithFallback
                    src={respectImage}
                    alt="Respect nature image"
                    width={0}
                    height={0}
                    className="object-cover  h-full max-h-[400px] rounded-[16px] shadow-2xl w-1/2 max-[768px]:w-full"
                />
            </div>
        </section>
    );
}