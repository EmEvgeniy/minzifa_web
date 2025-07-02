'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { logo } from '@/assets/icons';
import { useLocale } from 'next-intl';

export const Logo: FC = () => {
  const lang = useLocale();
  return (
    <Link
      href={`/${lang}`}
      prefetch={false}
      className="max-w-[200px] w-full flex items-center justify-center h-full max-h-[32px] cursor-pointer"
    >
      <Image src={logo} alt="logo" className="w-full h-full object-cover" />
    </Link>
  );
};
