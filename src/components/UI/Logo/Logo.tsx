'use client';

import Link from 'next/link';
import { logo } from '@/assets/icons';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';
import { cn } from '@/utils';
import { ImageProps } from 'next/image';

interface LogoProps extends Omit<ImageProps, 'src'> {
  locale: string;
  wrapperClassName?: string;
  className?: string;
}

export default function Logo({ locale, wrapperClassName, className, ...props }: LogoProps) {
  return (
    <Link href={`/${locale}`} className={cn('cursor-pointer', wrapperClassName)}>
      <ImageWithFallback
        {...props}
        alt={props.alt ?? 'Minzifa Travel'}
        src={logo}
        className={className}
      />
    </Link>
  );
}
