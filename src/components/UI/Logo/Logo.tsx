'use client';

import Link from 'next/link';
import Image from 'next/image';
import { logo } from '@/assets/icons';
import { DefaultComponentsProps } from '@/types';

export default function Logo({ locale }: DefaultComponentsProps) {
  return (
    <Link
      href={`/${locale}`}
      className="max-w-[200px] w-full flex items-center justify-center h-full max-h-[32px] cursor-pointer"
    >
      <Image src={logo} alt="logo" className="w-full h-full object-cover" priority />
    </Link>
  );
}
