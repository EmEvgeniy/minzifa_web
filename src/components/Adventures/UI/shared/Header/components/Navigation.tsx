'use client';

import Link from 'next/link';
import { ADVENTURES_NAV_LINKS } from '@/utils/adventures/navigation';
import { useCategories } from '@/api/adventures/categories';
import Dropdown from './Dropdown';
import { useLocale, useTranslations } from 'next-intl';

interface NavigationProps {
    hidden?: boolean;
    centered?: boolean;
}

export default function Navigation({ hidden = false, centered = false }: NavigationProps) {
    const locale = useLocale();
    const t = useTranslations('adventures.header');
    const { data: categories } = useCategories(locale);
    const navLinks = ADVENTURES_NAV_LINKS.map(link => ({
        ...link,
        label: t(link.label)
    }));

    if (hidden) return null;

    return (
        <nav className={`flex items-center ${centered ? 'justify-center' : ''} gap-5 text-[13px] w-full`}>
            {navLinks.map((link) => (
                link.hasDropdown ? (
                    <Dropdown
                        key={link.label}
                        trigger={<span>{link.label}</span>}
                    >
                        {link.href === '/prototype/adventures' ? (
                            <>
                                {(categories || []).map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/${locale}${link.href}/category/${category.slug}`}
                                        className="block px-4 py-2 text-sm text-text hover:bg-gray-50 transition-colors whitespace-nowrap"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </>
                        ) : (
                            <Link
                                href={`/${locale}${link.href}/popular`}
                                className="block px-4 py-2 text-sm text-text hover:bg-gray-50 transition-colors"
                            >
                                {t('popular')}
                            </Link>
                        )}
                    </Dropdown>
                ) : (
                    <Link
                        key={link.label}
                        href={`/${locale}${link.href}`}
                        className="cursor-pointer hover:opacity-70 transition-opacity"
                    >
                        {link.label}
                    </Link>
                )
            ))}
        </nav>
    );
}
