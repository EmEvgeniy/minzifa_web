import { DefaultComponentsProps } from '@/types';
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';
import ToursView from './ToursView';
import { getTranslations } from 'next-intl/server';
import Filter from './Filter';

export default async function MainSection({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale, namespace: 'all_tours' });
  const menu = t.raw('sort') as { title: string; value: string }[];
  const res = await fetch(
    `https://api.minzifatravel.com/api/v1/tours?limit=5&page=1&perPage=5&locale=${locale}`,
    {
      next: { revalidate: 60 * 10 },
    },
  );
  const initialTours = await res.json();

  return (
    <section className="container w-full h-full min-h-[70svh]">
      <div className="w-full flex flex-col gap-5 py-[30px]">
        <Breadcrumbs />
        <div className="w-full grid grid-cols-1 md:grid-cols-[300px_1fr] items-start justify-between gap-7">
          <div className="block [@media(max-width:1024px)]:hidden">
            <Filter locale={locale} />
          </div>

          <ToursView
            tourData={initialTours}
            locale={locale}
            menu={menu}
            showing={t('showing')}
            out={t('out')}
            nf={t('not_found')}
          />
        </div>
      </div>
    </section>
  );
}
