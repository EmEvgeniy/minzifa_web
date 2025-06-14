import { Articles } from '@/components';
import { Content } from '@/components/Adventure';
import React from 'react';

export default function page() {
  return (
    <section className=" pt-[10%] min-h-[100svh] max-[1200px]:pt-[17%] max-[550px]:pt-[20%]">
      <div className="container">
        <Content />
      </div>
      <Articles />
    </section>
  );
}
