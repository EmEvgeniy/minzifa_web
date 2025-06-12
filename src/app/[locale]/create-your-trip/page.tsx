import { create } from '@/assets/img';
import { CreateYourTripFormWrapper } from '@/components/Create-Your-Trip';
import Image from 'next/image';
import React from 'react';

export default function page() {
  return (
    <section className="bg-[#16372D] w-full h-full min-h-[90svh] relative flex items-center">
      <div className="w-full absolute top-0 h-full bg-[rgba(22,55,45,0.7)] backdrop-blur-[1px] z-20" />
      <Image src={create} alt="background-image" fill className="absolute top-0 object-cover" />
      <CreateYourTripFormWrapper />
    </section>
  );
}
