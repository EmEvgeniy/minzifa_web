import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/utils/utils';

type TBreadCrumbProps = {
  homeElement?: React.ReactNode;
  separator?: React.ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
  locale: string;
  link?: { title: string; link: string };
  link2?: { title: string; link: string };
  className?: string;
};

export default async function Breadcrumbs({
  homeElement,
  locale,
  separator = <span className="mx-2">/</span>,
  containerClasses = 'flex items-center',
  listClasses = 'text-[#16372D] hover:underline',
  link,
  link2,
  className,
}: TBreadCrumbProps) {
  const t = await getTranslations({ locale, namespace: 'breadcrumbs' });

  return (
    <nav aria-label="breadcrumb" className={cn('block', className)}>
      <ul className={cn(containerClasses, 'list-none flex items-center flex-wrap')}>
        <li className={cn(listClasses)}>
          <Link href={`/${locale}`}>{homeElement ?? t('home')}</Link>
        </li>

        {link && (
          <li className="flex items-center">
            {separator}
            {!link2 ? (
              <p>{link.title}</p>
            ) : link.link ? (
              <Link className={cn(listClasses)} href={link.link}>
                {link.title}
              </Link>
            ) : (
              <p>{link.title}</p>
            )}
            {link2 && separator}
          </li>
        )}
        {link && link2 && (
          <li className="flex items-center">
            <p className="truncate max-w-[230px]">{link2.title}</p>
          </li>
        )}
      </ul>
    </nav>
  );
}
