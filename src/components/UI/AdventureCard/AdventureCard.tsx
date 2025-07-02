import React from 'react';
import type { AdventureCardType } from './_types';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

type Props = {
  type: AdventureCardType;
};

export const AdventureCard: React.FC<Props> = ({ type }) => {
  const locale = useLocale();

  return (
    <Link
      prefetch={true}
      href={`/${locale}/tours`}
      className="rounded-[16px] bg-cover bg-center w-full aspect-square bg-white shadow-sm flex flex-col justify-center items-center relative overflow-hidden cursor-pointer"
    >
      {type?.media?.file && (
        <Image
          src={type?.media?.file}
          fill
          className="absolute  w-full h-full  object-cover"
          alt={type?.media?.alt_text || 'adventure'}
        />
      )}
      {/* Накладка */}
      <div className="absolute inset-0 bg-black opacity-30 z-0" />
      <div className="p-5 text-center relative z-1">
        <p className="mb-[10px] font-normal text-2xl text-white [@media(max-width:425px)]:text-[15px]">
          {type.name}
        </p>
        <span className="mb-3 font-normal text-base text-custom-green-900 rounded-full bg-[#CFDFD9] opacity-70  px-2 py-1 [@media(max-width:425px)]:text-[12px]">
          {type.tours_count} tours
        </span>
      </div>
    </Link>
  );
};
