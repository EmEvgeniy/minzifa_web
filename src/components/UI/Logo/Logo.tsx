'use client';

import Link from 'next/link';
import { logo } from '@/assets/icons';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';
import { cn } from '@/utils';

export default function Logo({
  locale,
  wrapperClassName,
  className,
}: {
  locale: string;
  wrapperClassName?: string;
  className?: string;
}) {
  return (
    <Link href={`/${locale}`} className={cn('cursor-pointer', wrapperClassName)}>
      <ImageWithFallback
        src={logo}
        alt="Minzifa Travel"
        width={160}
        height={30}
        className={className}
        priority
      />
    </Link>
  );
}
