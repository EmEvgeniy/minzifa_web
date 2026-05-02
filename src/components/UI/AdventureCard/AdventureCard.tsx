'use client';

import type { AdventureCardType } from './_types';
import Link from 'next/link';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';
import { cn } from '@/utils';
import Image from 'next/image';

type Props = {
  type: AdventureCardType;
  locale: string;
  className?: string;
};

export default function AdventureCard({ type, locale, className }: Props) {
  return (
    <div
      className={cn('relative flex flex-col gap-4', className)}
      style={{ willChange: 'transform' }}
    >
      <Link href={`/${locale}/tours?types[]=${type.name}`}>
        <div className="absolute inset-0 z-10" />
      </Link>
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        <ImageWithFallback
          src={type?.media?.file as string}
          alt={type?.media?.alt_text || 'adventure'}
          width={400}
          height={300}
          sizes="(max-width: 768px) 40vw, (max-width: 1024px) 30vw, 400px"
          className="aspect-3/4 lg:aspect-[3/2.18] object-cover"
        />
        {type?.icon?.file && (
          <Image
            src={type?.icon?.file as string}
            alt={'icon'}
            width={100}
            height={100}
            className="absolute bottom-3 w-[42px] h-[42px] left-3 object-contain text-white z-20"
          />
        )}
        <div className="absolute inset-0 bg-black/30 z-0" />
      </div>
      <h5 className="text-[20px] text-foreground font-semibold leading-100 tracking-normal">
        {type.name}
      </h5>
    </div>
  );
}
