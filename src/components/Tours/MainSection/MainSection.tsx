import React from 'react';

import { Filter } from './Filter';
import { ToursView } from './ToursView';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';

export const MainSection = () => {
  return (
    <section className="container w-full h-full min-h-[70svh]">
      <div className="w-full flex flex-col gap-5 py-[30px]">
        <Breadcrumbs />
        <div className="w-full grid grid-cols-1 md:grid-cols-[300px_1fr] items-start justify-between gap-7">
          <div className="block [@media(max-width:1024px)]:hidden">
            <Filter />
          </div>
          <ToursView />
        </div>
      </div>
    </section>
  );
};
