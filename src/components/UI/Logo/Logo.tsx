import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { logo } from '@/assets/icons';

export const Logo: FC = () => {
  return (
    <Link
      href={'/'}
      className="max-w-[200px] w-full flex items-center justify-center h-full max-h-[32px]"
    >
      <Image src={logo} alt="logo" className="w-full h-full object-cover" />
    </Link>
  );
};
