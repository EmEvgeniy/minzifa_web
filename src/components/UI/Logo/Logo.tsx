import Link from 'next/link';
import Image from 'next/image';
import { logo } from '@/assets/icons';
import { DefaultComponentsProps } from '@/types';

export default async function Logo({ locale }: DefaultComponentsProps) {
  return (
    <Link
      href={`/${locale}`}
      prefetch={false}
      className="max-w-[200px] w-full flex items-center justify-center h-full max-h-[32px] cursor-pointer"
    >
      <Image src={logo} alt="logo" className="w-full h-full object-cover" priority />
    </Link>
  );
}
