import React, { Suspense } from 'react';

import { Filter } from './Filter';
import { ToursView } from './ToursView';

import { DestinationDataResponse, ToursResponse, TourTypeDataResponse } from './_types';
import Loader from '@/components/UI/Loader/Loader';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';

type MainSectionProps = {
  tourData: ToursResponse;
  tourTypesData: TourTypeDataResponse;
  destinationsData: DestinationDataResponse;
};

export default function MainSection({
  tourData,
  tourTypesData,
  destinationsData,
}: MainSectionProps) {
  return (
    <section className="container w-full h-full min-h-[70svh]">
      <div className="w-full flex flex-col gap-5 py-[30px]">
        <Breadcrumbs />
        <div className="w-full grid grid-cols-1 md:grid-cols-[300px_1fr] items-start justify-between gap-7">
          <div className="block [@media(max-width:1024px)]:hidden">
            <Filter tourTypesData={tourTypesData} destinationsData={destinationsData} />
          </div>
          <Suspense fallback={<Loader />}>
            <ToursView tourData={tourData} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
