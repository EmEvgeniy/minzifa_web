import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function WriteForUsPage() {
    const t = useTranslations('adventures.writeForUs');

    return (
        <div className="bg-[#F9F9F7] min-h-screen pb-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2670&auto=format&fit=crop"
                    alt="Writing Journey"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">{t('heroTitle')}</h1>
                    <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
                        {t('heroSubtitle')}
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 lg:px-6 -mt-20 relative z-20">
                <div className="bg-white p-8 md:p-12 lg:p-16 shadow-sm max-w-4xl mx-auto">

                    {/* Intro */}
                    <div className="prose prose-lg max-w-none text-[#2C2C2C] mb-12">
                        <p className="font-serif text-2xl leading-relaxed text-center mb-10 text-[#1A1A1A]">
                            {t('intro')}
                        </p>
                        <hr className="w-24 border-t-2 border-[#3CA542] mx-auto my-10" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 mb-16">
                        <div>
                            <h3 className="font-serif text-2xl mb-4 text-[#1A1A1A]">{t('whatWeLove')}</h3>
                            <ul className="space-y-3 text-[#4A4A4A]">
                                <li className="flex gap-3">
                                    <span className="text-[#3CA542]">•</span>
                                    <span>{t('whatWeLove1')}</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-[#3CA542]">•</span>
                                    <span>{t('whatWeLove2')}</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-[#3CA542]">•</span>
                                    <span>{t('whatWeLove3')}</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-[#3CA542]">•</span>
                                    <span>{t('whatWeLove4')}</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-serif text-2xl mb-4 text-[#1A1A1A]">{t('whatWeAvoid')}</h3>
                            <ul className="space-y-3 text-[#4A4A4A]">
                                <li className="flex gap-3">
                                    <span className="text-red-400">•</span>
                                    <span>{t('whatWeAvoid1')}</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-red-400">•</span>
                                    <span>{t('whatWeAvoid2')}</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-red-400">•</span>
                                    <span>{t('whatWeAvoid3')}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* How to Pitch */}
                    <div className="bg-[#F5F9F6] p-8 md:p-10 rounded-sm mb-12">
                        <h3 className="font-serif text-2xl mb-6 text-[#1A1A1A]">{t('howToPitch')}</h3>
                        <p className="mb-6 text-[#4A4A4A] leading-relaxed">
                            {t('pitchText')}
                        </p>
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-wider mb-2 text-[#2C2C2C]">{t('emailSpecific')}</h4>
                                <a href="mailto:editor@minzifatravel.com" className="text-[#3CA542] text-xl font-medium hover:underline">
                                    editor@minzifatravel.com
                                </a>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-wider mb-2 text-[#2C2C2C]">{t('generalInquiries')}</h4>
                                <a href="mailto:info@minzifatravel.com" className="text-[#3CA542] text-xl font-medium hover:underline">
                                    info@minzifatravel.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div className="text-center text-sm text-gray-500 italic">
                        {t('disclaimer')}
                    </div>

                </div>
            </div>
        </div>
    );
}

