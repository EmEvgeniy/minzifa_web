'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import LanguageDropdown from './Header/components/LanguageDropdown';
import SearchBar from './Header/components/SearchBar';
import Navigation from './Header/components/Navigation';
import MobileMenu from './Header/components/MobileMenu';
import { FaBars } from 'react-icons/fa6';
import { useLocale } from 'next-intl';

export default function Header() {
    const locale = useLocale();
    const [isStaticSearchOpen, setIsStaticSearchOpen] = useState(false);
    const [isStickySearchOpen, setIsStickySearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close sticky search when scrolling back to top to avoid confusion
    useEffect(() => {
        if (!isScrolled) {
            setIsStickySearchOpen(false);
        }
    }, [isScrolled]);

    return (
        <div className="relative z-50">
            {/* Top Bar / Logo Area */}
            <header className="lg:border-none border-b border-[#E6E6E6]">
                <div className="container py-4">
                    {/* Логотип SVG - полная ширина с линиями */}
                    <Link href={`/${locale}/prototype/adventures`} className="shrink-0">
                        <div className="flex justify-center mb-3">
                            <Image
                                src="/adventures/logo-black.svg"
                                alt="Paths of the Silk Road"
                                width={780}
                                height={123}
                                className="w-full max-w-[780px] h-auto"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Навигация в одну линию - ширина как логотип (780px) */}
                    <div className="hidden lg:flex items-center justify-between mx-auto w-full max-w-[780px] relative">
                        {/* Wrapper for full-width search overlay context */}
                        <div className="flex items-center justify-between w-full h-full">
                            <div className={`items-center justify-center transition-opacity duration-300 ${isStaticSearchOpen ? 'hidden' : 'flex'}`}>
                                <Navigation centered />
                            </div>

                            <div className={`flex items-center gap-6 transition-opacity duration-300 ${isStaticSearchOpen ? 'flex-1' : ''}`}>
                                {!isStaticSearchOpen && <LanguageDropdown />}
                                <SearchBar
                                    isActive={isStaticSearchOpen}
                                    onOpen={() => setIsStaticSearchOpen(true)}
                                    onClose={() => setIsStaticSearchOpen(false)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="lg:hidden flex justify-between items-center mt-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 text-text"
                            aria-label="Open menu"
                        >
                            <FaBars className="w-6 h-6" />
                        </button>
                        <LanguageDropdown />
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            </header>

            {/* Sticky Header - Limited to container width and centered */}
            <div
                className={`fixed top-0 left-1/2 -translate-x-1/2 w-full shadow-lg bg-background transition-all duration-300 transform z-50 ${isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
                    }`}
            >
                <div className="mx-auto w-full max-w-[1170px] h-14 lg:h-16 relative flex items-center justify-between lg:justify-center gap-4 lg:gap-8 px-4">
                    {/* Mobile Menu Trigger (Sticky) */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 -ml-2 text-text"
                            aria-label="Open menu"
                        >
                            <FaBars className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation elements (Desktop) */}
                    <div className={`hidden lg:flex items-center justify-center transition-opacity duration-300 ${isStickySearchOpen ? 'hidden' : 'flex'}`}>
                        <Navigation />
                    </div>

                    {/* Search & Actions Area */}
                    <div className={`flex items-center gap-4 lg:gap-8 transition-opacity duration-300 ${isStickySearchOpen ? 'flex-1 px-4' : ''}`}>
                        {!isStickySearchOpen && <LanguageDropdown />}
                        <div className="hidden lg:block">
                            <SearchBar
                                isActive={isStickySearchOpen}
                                onOpen={() => setIsStickySearchOpen(true)}
                                onClose={() => setIsStickySearchOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}