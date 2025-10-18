import MobileDrawler from './MobileDrawler';
import { getTranslations } from 'next-intl/server';
import MobileBtn from './MobileBtn';
import MobileTourFilters from '@/components/TourFilters/MobileTourFilters';

export default async function MobileMenu({ locale }: { locale: string }) {
  const t = await getTranslations({ locale });

  return (
    <div className="max-[1024px]:block hidden">
      <MobileBtn btn={t('Filters')} />
      <MobileDrawler
        btn={t('Filters')}
        elem={
          <MobileTourFilters
            showFilter={['price', 'duration', 'seasons', 'hotels', 'tourType', 'destinations']}
          />
        }
      />
    </div>
  );
}
