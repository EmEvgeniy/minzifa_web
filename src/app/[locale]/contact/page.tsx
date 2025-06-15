import { contact_us } from '@/assets/img';
import { Form, LeftInfo } from '@/components/ContactUs';
import Image from 'next/image';
import React from 'react';

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
