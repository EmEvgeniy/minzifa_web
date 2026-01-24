"use client";

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FiCamera, FiEdit3, FiHeart, FiMap } from 'react-icons/fi';


export default function WriteForUsPage() {
    const t = useTranslations('adventures.writeForUs');

    return (
        <div className="bg-[#FDFDFB] min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1652288246947-66e4a0aa7fad?q=80&w=2070&auto=format&fit=crop"
                    alt="Central Asia Landscape"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-serif text-5xl md:text-7xl text-white mb-6"
                    >
                        {t('heroTitle')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        {t('heroSubtitle')}
                    </motion.p>
                </div>
            </section>

            <div className="max-w-[1170px] mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Information Content */}
                    <div className="lg:col-span-12 space-y-16">
                        <section>
                            <h2 className="font-serif text-3xl text-slate-900 mb-8 pb-4 border-b border-slate-100">
                                {t('whatWeLove')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="w-10 h-10 rounded-full bg-[#3ca542]/10 flex items-center justify-center text-[#3ca542]">
                                        <FiHeart className="w-5 h-5" />
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">{t('whatWeLove1')}</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-10 h-10 rounded-full bg-[#3ca542]/10 flex items-center justify-center text-[#3ca542]">
                                        <FiMap className="w-5 h-5" />
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">{t('whatWeLove2')}</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-10 h-10 rounded-full bg-[#3ca542]/10 flex items-center justify-center text-[#3ca542]">
                                        <FiEdit3 className="w-5 h-5" />
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">{t('whatWeLove3')}</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-10 h-10 rounded-full bg-[#3ca542]/10 flex items-center justify-center text-[#3ca542]">
                                        <FiCamera className="w-5 h-5" />
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">{t('whatWeLove4')}</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="font-serif text-3xl text-slate-900 mb-8 pb-4 border-b border-slate-100">
                                {t('whatWeAvoid')}
                            </h2>
                            <ul className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                        <p className="text-slate-600">{t(`whatWeAvoid${i}`)}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
                            <h2 className="font-serif text-3xl text-slate-900 mb-6">
                                {t('howToPitch')}
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                {t('pitchText')}
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{t('emailSpecific')}</p>
                                    <p className="text-[#3ca542] font-medium">booking@minzifatravel.com</p>
                                </div>
                            </div>
                            <p className="mt-10 text-sm text-slate-400 italic">
                                {t('disclaimer')}
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            {/* Quote Section */}
            <section className="py-24 px-6 bg-[#F9F9F7]">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="h-1 w-16 bg-[#3ca542] mx-auto mb-10" />
                    <h2 className="font-serif text-3xl md:text-4xl italic text-slate-800 leading-relaxed">
                        "The world is a book and those who do not travel read only one page."
                    </h2>
                    <p className="mt-8 text-slate-400 font-light tracking-widest uppercase text-sm">
                        Minzifa Travel Editorial Team
                    </p>
                </div>
            </section>
        </div>
    );
}
