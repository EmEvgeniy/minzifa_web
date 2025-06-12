'use client';

import React, { ReactNode } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';
import { cn } from '@/utils/utils';

type TBreadCrumbProps = {
    homeElement?: ReactNode,
    separator?: ReactNode,
    containerClasses?: string,
    listClasses?: string,
    activeClasses?: string,
    capitalizeLinks?: boolean
}

const locales = ['en', 'ru'];

export const Breadcrumbs = ({
    homeElement = <span>Home</span>,
    separator = <span className="mx-2">/</span>,
    containerClasses = "flex items-center",
    listClasses = "text-gray-900 hover:underline",
    activeClasses = "text-gray-900",
    capitalizeLinks = true
}: TBreadCrumbProps) => {
    const t = useTranslations("breadcrumbs");
    const pathName = usePathname();
    const rawPathNames = pathName.split('/').filter(Boolean);

    // Удаляем локаль, если первый сегмент является одной из локалей
    const pathNames = locales.includes(rawPathNames[0]) ? rawPathNames.slice(1) : rawPathNames;

    // Получаем базовый путь (с локалью, если есть)
    const baseLocale = locales.includes(rawPathNames[0]) ? `/${rawPathNames[0]}` : '';

    return (
        <nav aria-label="breadcrumb">
            <ul className={cn(containerClasses, "list-none flex items-center")}>
                <li className={cn(listClasses)}>
                    <Link href={baseLocale ?? "/"}>{homeElement ?? t('home')}</Link>
                </li>
                {pathNames.length > 0 && separator}
                {
                    pathNames.map((segment, index) => {
                        const href = '/' + pathNames.slice(0, index + 1).join('/');
                        const isLast = index === pathNames.length - 1;
                        const linkText = capitalizeLinks
                            ? segment.charAt(0).toUpperCase() + segment.slice(1)
                            : segment;
                        const itemClasses = isLast
                            ? `${listClasses} ${activeClasses}`
                            : listClasses;

                        return (
                            <React.Fragment key={index}>
                                <li className={cn(itemClasses)}>
                                    {
                                        isLast
                                            ? <span>{linkText}</span>
                                            : <Link href={href}>{linkText}</Link>
                                    }
                                </li>
                                {!isLast && separator}
                            </React.Fragment>
                        );
                    })
                }
            </ul>
        </nav>
    );
};
