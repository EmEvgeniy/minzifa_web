'use client';
import { useGetQuery } from '@/api/get.api';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

interface DataResponse {
  media: { file: string };
  icon: { file: string };
  name: string;
}

export const Hero = () => {
  const t = useTranslations();
  const { slug } = useParams();
  const { data, isLoading } = useGetQuery<DataResponse>({
    key: ['destinations', `${slug}`],
    page: '',
    perPage: '',
    url: `destinations/${slug}`,
    searchItem: '',
    additionalParam: '',
  });

  return (
    <section className="min-h-[90svh] bg-[#16372D] w-full relative flex items-center justify-center">
      <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
      {!isLoading && data?.media?.file && (
        <Image src={data?.media?.file} alt="bg" fill className=" object-cover absolute top-0" />
      )}
      <div className="relative z-30 container flex flex-col items-center justify-center gap-5 text-white">
        <div className="w-[65px] h-[65px]">
          {!isLoading && data?.icon?.file && (
            <Image src={data?.icon?.file} alt="icon" width={65} height={65} />
          )}
        </div>
        <h1 className="text-[56px] font-title max-[1024px]:text-[35px] max-[550px]:text-[30px]">
          {data?.name}
        </h1>
        <p className="text-[24px] max-w-[70%] text-center max-[1024px]:max-w-full max-[1024px]:text-[20]">
          {t('destination.sub_title')}
        </p>
      </div>
    </section>
  );
};
