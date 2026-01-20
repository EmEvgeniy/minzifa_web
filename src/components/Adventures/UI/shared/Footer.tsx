'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FaXTwitter, FaLinkedinIn, FaFacebookF } from 'react-icons/fa6';
import { FaPinterestP } from 'react-icons/fa';

export default function Footer() {
    const t = useTranslations('adventures.footer');
    const [email, setEmail] = useState('');
    const currentYear = new Date().getFullYear();

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Subscribe:', email);
        setEmail('');
    };

    return (
        <footer id="site-footer" className="text-text border-t border-gray-200">
            {/* Main Footer Content */}
            <div className="container py-12 lg:py-16">
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-12">

                    {/* 1. Logo Section (Mobile Order: 1, Desktop: 1) */}
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start order-1">
                        <div className="w-full flex flex-col items-center lg:items-start mb-6 lg:mb-0">
                            {/* Mobile: Logo with Lines */}
                            <div className="flex items-center w-full lg:w-auto lg:hidden mb-1">
                                <Image
                                    src="/adventures/logo-black.svg"
                                    alt="Minzifa Travel"
                                    width={180}
                                    height={45}
                                    className="h-auto w-full"
                                />
                            </div>

                            {/* Desktop Logo */}
                            <Image
                                src="/adventures/logo-black.svg"
                                alt="Minzifa Travel"
                                width={240}
                                height={54}
                                className="hidden lg:block h-auto w-[240px] mb-2"
                            />
                        </div>

                        {/* Desktop: Contact Info (Hidden on Mobile, moved to bottom) */}
                        <div className="hidden lg:flex flex-col items-start mt-6">
                            <a
                                href="mailto:info@minzifatravel.com"
                                className="text-sm font-medium hover:text-foreground transition-colors mb-6 block"
                            >
                                info@minzifatravel.com
                            </a>

                            <div className="flex items-center gap-3">
                                <a href="#" className="w-8 h-8 rounded-full bg-[#3CA542] text-white flex items-center justify-center hover:bg-[#349139] transition-colors">
                                    <FaXTwitter className="w-4 h-4" />
                                </a>
                                <a href="#" className="w-8 h-8 rounded-full bg-[#3CA542] text-white flex items-center justify-center hover:bg-[#349139] transition-colors">
                                    <FaLinkedinIn className="w-4 h-4" />
                                </a>
                                <a href="#" className="w-8 h-8 rounded-full bg-[#3CA542] text-white flex items-center justify-center hover:bg-[#349139] transition-colors">
                                    <FaFacebookF className="w-4 h-4" />
                                </a>
                                <a href="#" className="w-8 h-8 rounded-full bg-[#3CA542] text-white flex items-center justify-center hover:bg-[#349139] transition-colors">
                                    <FaPinterestP className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* 2. Subscribe Section (Mobile Order: 2, Desktop: 3) */}
                    <div className="lg:col-span-4 order-2 lg:order-3">
                        <h4 className="text-[13px] font-bold mb-4 lg:mb-5 text-gray-900">{t('subscribeTitle')}</h4>
                        <form onSubmit={handleSubscribe} className="flex flex-col lg:flex-row gap-3 lg:gap-2 mb-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('subscribePlaceholder')}
                                className="w-full lg:flex-1 px-4 py-3 lg:py-2.5 bg-white rounded-[4px] lg:rounded-lg text-sm border border-gray-200 focus:border-green-500 outline-none transition-all placeholder:text-gray-400"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full lg:w-auto px-6 py-3 lg:py-2.5 bg-[#3CA542] hover:bg-[#349139] text-white rounded-[4px] lg:rounded-lg text-sm font-bold shadow-sm transition-all cursor-pointer whitespace-nowrap"
                            >
                                {t('subscribeBtn')}
                            </button>
                        </form>
                        <p className="text-[11px] text-gray-500 max-w-[280px] leading-tight">
                            {t.rich('subscribeDisclaimer', {
                                link: (chunks) => <Link href="/privacy" className="text-[#3CA542] hover:underline">{chunks}</Link>
                            })}
                        </p>
                    </div>

                    {/* 3. Links Section (Mobile Order: 3, Desktop: 2) */}
                    <div className="lg:col-span-4 order-3 lg:order-2 grid grid-cols-2 gap-4 lg:gap-10">
                        {/* Company */}
                        <div>
                            <h4 className="text-[13px] font-bold mb-4 lg:mb-5 text-gray-900">{t('company')}</h4>
                            <ul className="space-y-3">
                                <li><Link href="/about" className="text-[13px] text-gray-600 hover:text-foreground transition-colors">{t('about')}</Link></li>
                                <li><Link href="/trips" className="text-[13px] text-gray-600 hover:text-foreground transition-colors">{t('findTrips')}</Link></li>
                                <li><Link href="/prototype/adventures/become-an-author" className="text-[13px] text-gray-600 hover:text-foreground transition-colors">{t('writeForUs')}</Link></li>
                                <li><Link href="#" className="text-[13px] text-gray-600 hover:text-foreground transition-colors">{t('contact')}</Link></li>
                            </ul>
                        </div>

                        {/* Blog Navigation */}
                        <div>
                            <h4 className="text-[13px] font-bold mb-4 lg:mb-5 text-gray-900">{t('blogNavigation')}</h4>
                            <ul className="space-y-3">
                                <li><Link href="/prototype/adventures" className="text-[13px] text-gray-600 hover:text-foreground transition-colors">{t('articles')}</Link></li>
                                <li><Link href="/prototype/adventures/stories" className="text-[13px] text-gray-600 hover:text-foreground transition-colors">{t('stories')}</Link></li>
                                <li><Link href="/prototype/adventures/category/travel" className="text-[13px] text-gray-600 hover:text-foreground transition-colors">{t('travel')}</Link></li>
                                <li><Link href="#" className="text-[13px] text-gray-600 hover:text-foreground transition-colors">{t('life')}</Link></li>
                                <li><Link href="/themes" className="text-[13px] text-gray-600 hover:text-foreground transition-colors">{t('tourThemes')}</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* 4. Contact Info (Mobile Order: 4 - Only Mobile) */}
                    <div className="lg:hidden flex flex-col items-start order-4 mt-2">
                        <a
                            href="mailto:info@minzifatravel.com"
                            className="text-sm font-medium hover:text-foreground transition-colors mb-4 block"
                        >
                            info@minzifatravel.com
                        </a>

                        <div className="flex items-center gap-3">
                            <a href="#" className="w-9 h-9 rounded-full bg-[#3CA542] text-white flex items-center justify-center hover:bg-[#349139] transition-colors">
                                <FaXTwitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-[#3CA542] text-white flex items-center justify-center hover:bg-[#349139] transition-colors">
                                <FaLinkedinIn className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-[#3CA542] text-white flex items-center justify-center hover:bg-[#349139] transition-colors">
                                <FaFacebookF className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-[#3CA542] text-white flex items-center justify-center hover:bg-[#349139] transition-colors">
                                <FaPinterestP className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="lg:border-t border-gray-200">
                <div className="container py-8 lg:py-8">
                    <div className="flex flex-col lg:flex-row w-full justify-between items-start gap-6 lg:gap-4 text-[11px] text-gray-500">
                        {/* Mobile: Links stacked */}
                        <div className="lg:hidden flex flex-col gap-3 w-full">
                            <Link href="/privacy" className="hover:text-foreground underline decoration-gray-300 transition-colors underline-offset-4">
                                {t('privacy')}
                            </Link>
                            <Link href="/cookies" className="hover:text-foreground underline decoration-gray-300 transition-colors underline-offset-4">
                                {t('cookie')}
                            </Link>
                        </div>

                        {/* Desktop: Links Split */}
                        <div className="hidden lg:flex order-1 justify-start">
                            <Link href="/privacy" className="hover:text-foreground underline decoration-gray-300 transition-colors underline-offset-4">
                                {t('privacy')}
                            </Link>
                        </div>

                        {/* Copyright & Address */}
                        <div className="order-last lg:order-2 flex flex-col items-start lg:items-center text-left lg:text-center w-full lg:w-auto">
                            <p className="mb-1">
                                © 2014-{currentYear} Minzifa Travel. {t('rights')}
                            </p>
                            <p className="opacity-70">
                                {t('address')}
                            </p>
                        </div>

                        {/* Desktop: Cookie Link */}
                        <div className="hidden lg:flex order-3 justify-end">
                            <Link href="/cookies" className="hover:text-foreground underline decoration-gray-300 transition-colors underline-offset-4">
                                {t('cookie')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}