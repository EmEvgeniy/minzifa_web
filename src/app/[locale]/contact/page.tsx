import { contact_us } from '@/assets/img';
import { Form, LeftInfo } from '@/components/ContactUs';
import Image from 'next/image';
import React from 'react';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string; }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = 'contact-us';
    const locale = (await params).locale;

    const data = await fetch(`https://api.minzifatravel.com/api/v1/pages/${slug}?locale=${locale}`, {
        next: { revalidate: 60 },
    }).then((res) => res.json());

    return {
        title: data?.seo_metadata?.title,
        description: data?.seo_metadata?.description,
        keywords: data?.seo_metadata?.keywords,
    }
}

export default function page() {
  return (
    <section className="bg-[#16372D] w-full relative min-h-[90svh] h-full flex items-center justify-center py-[150px] max-[1024px]:min-h-[100svh] max-[768px]:py-[100px]">
      <Image src={contact_us} fill alt="contact_us" className=" object-cover absolute top-0 z-10" />
      <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
      <div className="container flex items-start justify-between gap-5 w-full relative z-30 h-full max-[768px]:flex-col max-[768px]:items-center max-[768px]:justify-center">
        <LeftInfo />
        <div className="w-full block max-[768px]:hidden">
          <Form />
        </div>
      </div>
    </section>
  );
}
