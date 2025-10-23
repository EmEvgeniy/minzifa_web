import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { eco_icon4 } from '@/assets/icons';
import { child } from '@/assets/img';

interface ChildrenSectionProps {
    t: (key: string) => string;
    block2: { title: string; text: string; img: string }[];
}

export default function ChildrenSection({ t, block2 }: ChildrenSectionProps) {
    // const childrenBackground = lr2;
    const childrenIcon = eco_icon4;
    const childImage = child;

    return (
        <section className="bg-[#16372D] w-full py-[40px] relative overflow-hidden">
            {/* <ImageWithFallback
                src={childrenBackground}
                alt="Children section background"
                width={800}
                height={600}
                className="absolute top-0 right-0 object-cover rotate-180"
            /> */}
            <div className="container flex flex-col items-center gap-5 text-white relative z-30">
                <ImageWithFallback
                    src={childrenIcon}
                    alt="Children icon"
                    width={65}
                    height={65}
                    className="w-[65px] h-[65px]"
                />
                <h2 className="text-[42px] max-[1024px]:text-[35px] max-[768px]:text-[24px] ">
                    {t('eco.children.title')}
                </h2>
                <p className="text-[18px] max-[768px]:text-[16px] max-[768px]:text-center">
                    {t('eco.children.sub_title')}
                </p>
                <div className="grid grid-cols-4 gap-5 pt-[30px] max-[1150px]:grid-cols-3 max-[920px]:grid-cols-2 max-[550px]:grid-cols-1 max-[550px]:justify-items-center">
                    {block2.map((el, i) =>
                        el.img === 'true' ? (
                            <ImageWithFallback
                                src={childImage}
                                alt="Child image"
                                width={1000}
                                height={1000}
                                key={i}
                                className="object-cover rounded-full w-[285px] h-[285px]"
                            />
                        ) : (
                            <div
                                key={i}
                                className="bg-white rounded-2xl opacity-80 text-[#16372D] w-full h-full p-5 backdrop-blur-lg flex flex-col justify-between gap-3"
                            >
                                <p className="text-2xl font-semibold">{el.title}</p>
                                <p className="text-base">{el.text}</p>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}