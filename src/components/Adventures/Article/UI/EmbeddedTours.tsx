'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface TourItem {
    title: string;
    image: string;
    duration: string;
    price: string;
    link: string;
}

interface EmbeddedToursProps {
    items: TourItem[];
    title?: string;
}

const EmbeddedTours: React.FC<EmbeddedToursProps> = ({
    items,
    title = 'Headlines here to main content',
}) => {
    const locale = useLocale();
    return (
        <section>
            <h3 className="text-3xl font-title mb-10">{title}</h3>
            <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 md:grid md:grid-cols-3 md:gap-2.5 md:overflow-visible md:pb-0 md:mx-0 md:px-0 no-scrollbar">
                {items.map((item, index) => (
                    <Link
                        key={index}
                        href={`/${locale}${item.link}`}
                        className="group relative flex flex-col min-w-[88%] sm:min-w-[60%] snap-center mr-2.5 last:mr-0 md:min-w-0 md:mr-0"
                    >
                        {/* Image Container */}
                        <div className="relative aspect-[3/2.1] lg:aspect-[2.9/2.71] w-full overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                            {/* Title Overlay */}
                            <div className="absolute bottom-4 left-4 right-4">
                                <h4 className="font-text font-bold text-base text-white leading-tight drop-shadow-md">
                                    {item.title}
                                </h4>
                            </div>
                        </div>

                        {/* Dark Footer Bar */}
                        <div className="bg-[#1a3528] p-2 flex items-center justify-between">
                            <span className="text-white text-sm font-normal uppercase tracking-widest">
                                {item.duration}
                            </span>
                            <div className="border border-white px-2 py-1 text-white text-xs font-normal tracking-widest uppercase group-hover:bg-white group-hover:text-[#1a3528] transition-colors">
                                View Trip
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default EmbeddedTours;
