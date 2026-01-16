'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiX, FiChevronDown, FiSearch, FiChevronUp } from 'react-icons/fi';
import { getNavLinks, getCategories } from '@/components/Adventures/data/mockData';
import LanguageDropdown from './LanguageDropdown';
import { cn } from '@/utils';
import { useLocale, useTranslations } from 'next-intl';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const locale = useLocale();
    const tHeader = useTranslations('adventures.header');
    const tFooter = useTranslations('adventures.footer');
    const navLinks = getNavLinks(locale);
    const categories = getCategories(locale);

    const [openAccordion, setOpenAccordion] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setOpenAccordion(null); // Reset accordion on close
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const toggleAccordion = (label: string) => {
        setOpenAccordion(openAccordion === label ? null : label);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-[#F5F5F0] flex flex-col pt-4 overflow-y-auto no-scrollbar">
            {/* Header */}
            <div className="container flex items-center justify-between mb-8">
                <button onClick={onClose} className="p-2 -ml-2 text-text">
                    <FiX className="w-6 h-6" />
                </button>
                <LanguageDropdown />
            </div>

            {/* Search */}
            <div className="container mb-8">
                <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder={tHeader('searchPlaceholder')}
                        className="w-full bg-white rounded-full py-4 pl-12 pr-4 text-base placeholder:text-gray-400 focus:outline-none ring-1 ring-transparent focus:ring-gray-200 transition-shadow shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Navigation */}
            <div className="container flex-1">
                <nav className="flex flex-col">
                    {navLinks.map((link) => (
                        <div key={link.label} className="border-b border-gray-200 last:border-0">
                            {link.hasDropdown ? (
                                <div>
                                    <button
                                        onClick={() => toggleAccordion(link.label)}
                                        className="flex items-center justify-between w-full py-5 text-left text-lg font-medium text-text group"
                                    >
                                        {link.label}
                                        <FiChevronDown
                                            className={cn(
                                                "w-5 h-5 transition-transform duration-300",
                                                openAccordion === link.label ? "rotate-180" : ""
                                            )}
                                        />
                                    </button>
                                    <div
                                        className={cn(
                                            "grid transition-all duration-300 ease-in-out overflow-hidden",
                                            openAccordion === link.label ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
                                        )}
                                    >
                                        <div className="overflow-hidden flex flex-col gap-3 pl-2">
                                            {link.href === '/prototype/adventures' ? (
                                                categories.map((category) => (
                                                    <Link
                                                        key={category.id}
                                                        href={`/${locale}${link.href}/category/${category.slug}`}
                                                        className="text-gray-500 hover:text-text py-1 transition-colors"
                                                        onClick={onClose}
                                                    >
                                                        {category.name}
                                                    </Link>
                                                ))
                                            ) : (
                                                <Link
                                                    href={`/${locale}${link.href}/popular`}
                                                    className="text-gray-500 hover:text-text py-1 transition-colors"
                                                    onClick={onClose}
                                                >
                                                    {tHeader('popular')}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href={`/${locale}${link.href}`}
                                    className="flex items-center justify-between w-full py-5 text-left text-lg font-medium text-text"
                                    onClick={onClose}
                                >
                                    {link.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            {/* Footer Action */}
            <div className="container py-8 mt-auto">
                <button className="w-full bg-[#2FA83E] text-white font-bold py-4 rounded-full text-lg hover:bg-[#268f33] transition-colors shadow-lg shadow-green-900/10">
                    {tFooter('subscribeBtn')}
                </button>
            </div>
        </div>
    );
}
