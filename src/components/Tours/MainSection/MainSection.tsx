import React from 'react';

import { useTranslations } from 'next-intl';
import { Filter } from './Filter';
import { ToursView } from './ToursView';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';

export const MainSection = () => {
  const t = useTranslations('breadcrumbs');

  return (
    <section className="container w-full h-full min-h-[70svh]">
      <div className="w-full flex flex-col gap-5 py-[30px]">
        <Breadcrumbs link={{ link: '', title: t('all_tours') }} />
        <div className="w-full flex items-start justify-between gap-5">
          <Filter />
          <ToursView />
        </div>
      </div>
    </section>
  );
};
