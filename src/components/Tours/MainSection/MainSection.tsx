import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import ToursSection from '@/components/Tours/ToursSection/ToursSection';
import { getTranslations } from 'next-intl/server';
import { availableFilters } from '@/components/TourFilters/_types';
import { PaginatedData } from '@/types';
import { AllToursCardType, TourType } from './_types';
import { DestinationCard } from '@/components/Home/Destinations/_types';

const filters: availableFilters[] = [
  'price',
  'duration',
  'seasons',
  'hotels',
  'tourType',
  'tourTypes',
  'destinations',
];

export default async function MainSection({
  locale,
  initTours,
  initDestinations,
  initTourTypes,
}: {
  locale: string;
  initTours?: PaginatedData<AllToursCardType>;
  initDestinations?: DestinationCard[];
  initTourTypes?: TourType[];
}) {
  const t = await getTranslations({ locale });

  return (
    <section className="container w-full h-full min-h-[70svh]">
      <div className="w-full flex flex-col gap-5 py-[30px]">
        <Breadcrumbs locale={locale} link={{ link: '', title: t('breadcrumbs.allTours') }} />
        <ToursSection
          locale={locale}
          showFilter={filters}
          initTours={initTours}
          initDestinations={initDestinations}
          initTourTypes={initTourTypes}
        />
      </div>
    </section>
  );
}
