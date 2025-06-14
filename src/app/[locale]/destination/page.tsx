import { Main } from '@/components/Destination';

import React from 'react';

export default function page() {
  return (
    <section
      className="container flex items-center justify-center min-h-[50svh] h-full py-[12%] 
  max-[768px]:py-[15%] max-[500px]:py-[20%]"
    >
      <Main />
    </section>
  );
}
