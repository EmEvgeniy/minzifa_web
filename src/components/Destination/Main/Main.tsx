'use client';

import { DestinationCard } from '@/components/Home/Destinations/_types';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import Pagination from '@/components/UI/Pagination';
import { PaginatedData } from '@/types';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

export const Main = ({
  destinations,
  currentPage,
}: {
  destinations: PaginatedData<DestinationCard>;
  currentPage: number;
}) => {
  const locale = useLocale();
  const router = useRouter();

  const sectionRef = useRef<HTMLElement>(null);

  const totalPages = destinations?.meta?.last_page as number;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`/${locale}/destination?page=${page}`, { scroll: false });
    }

    if (sectionRef.current) {
      const element = sectionRef.current;
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <section ref={sectionRef} className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {destinations?.data?.map((destination: DestinationCard) => (
          <Link href={`/${locale}/destination/${destination?.slug}`} key={destination?.id}>
            <div className="w-full h-full rounded-[16px] bg-white opacity-80 text-center flex flex-col items-center justify-center text-xl font-semibold p-5 [@media(max-width:768px)]:min-h-[200px]">
              {destination?.icon?.file && (
                <ImageWithFallback
                  src={destination?.icon?.file ? destination?.icon?.file : ''}
                  alt={destination?.icon?.alt_text ? destination?.icon?.alt_text : 'image'}
                  width={150}
                  height={150}
                  className="object-cover mb-3"
                />
              )}
              <h2 className="text-2xl font-normal [@media(max-width:768px)]:text-[18px]">
                {destination?.name}
              </h2>
              <div className="text-base font-normal [@media(max-width:768px)]:text-[14px]">
                {destination?.tours_count} tours
              </div>
            </div>
          </Link>
        ))}
      </section>
      <Pagination
        className="my-10"
        currentPage={currentPage}
        onPageChange={goToPage}
        totalPages={totalPages}
      />
    </div>
  );
};
