import { Fragment } from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { cn } from '@/utils/utils';

type TBreadCrumbProps = {
  homeElement?: React.ReactNode;
  separator?: React.ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

const locales = ['en', 'ru'];

export default async function Breadcrumbs({
  homeElement,
  separator = <span className="mx-2">/</span>,
  containerClasses = 'flex items-center',
  listClasses = 'text-[#16372D] hover:underline',
  activeClasses = 'text-[#16372D]',
  capitalizeLinks = true,
}: TBreadCrumbProps) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || ''; // Передаётся вручную (см. ниже)
  const rawPathNames = pathname.split('/').filter(Boolean);

  const locale = locales.includes(rawPathNames[0]) ? rawPathNames[0] : 'en';
  const pathNames = locales.includes(rawPathNames[0]) ? rawPathNames.slice(1) : rawPathNames;
  const baseLocale = locales.includes(rawPathNames[0]) ? `/${rawPathNames[0]}` : '';

  const t = await getTranslations({ locale, namespace: 'breadcrumbs' });

  return (
    <nav aria-label="breadcrumb" className="block [@media(max-width:768px)]:hidden">
      <ul className={cn(containerClasses, 'list-none flex items-center')}>
        <li className={cn(listClasses)}>
          <Link href={baseLocale ?? '/'}>{homeElement ?? t('home')}</Link>
        </li>
        {pathNames.length > 0 && separator}
        {pathNames.map((segment: string, index: number) => {
          const href = baseLocale + '/' + pathNames.slice(0, index + 1).join('/');
          const isLast = index === pathNames.length - 1;
          const linkText = capitalizeLinks
            ? segment.charAt(0).toUpperCase() + segment.slice(1)
            : segment;
          const itemClasses = isLast ? `${listClasses} ${activeClasses}` : listClasses;

          return (
            <Fragment key={index}>
              <li className={cn(itemClasses)}>
                {isLast ? <span>{linkText}</span> : <Link href={href}>{linkText}</Link>}
              </li>
              {!isLast && separator}
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
}
