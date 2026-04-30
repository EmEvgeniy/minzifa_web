import { DestinationCard } from '../Destinations/_types';
import { apiGet, cn } from '@/utils';

import HeroSearch from './HeroSearch';
import HeroSlider from './HeroSlider';
import { Banner } from './types';

export default async function Hero({ locale }: { locale: string }) {
  const destinations = await apiGet<DestinationCard[]>(`destinations?all=1&locale=${locale}`, {
    next: { revalidate: 60 * 5 },
  });

  const banners = await apiGet<Banner[]>(`banners?location=home`, {
    next: { revalidate: 60 * 5 },
  });

  return (
    <section
      className={cn('flex flex-col gap-[28px] mt-[21px] mb-[43px]', 'md:gap-[42px] md:mb-[64px]')}
    >
      <HeroSearch data={destinations} />
      <HeroSlider banners={banners} />
    </section>
  );
}
