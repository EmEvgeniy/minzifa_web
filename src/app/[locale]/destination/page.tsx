import { Main } from '@/components/Destination';

import React from 'react';

export default function page() {
  return (
    <section
      className="container flex items-center justify-center min-h-[50svh] h-full py-[150px] 
  max-[768px]:py-[100px] max-[500px]:pt-[100px]"
    >
      <Main />
    </section>
  );
}
