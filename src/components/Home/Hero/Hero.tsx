import { DestinationCard } from '../Destinations/_types';
import { apiGet, cn } from '@/utils';

import HeroSearch from './HeroSearch';
import HeroSlider from './HeroSlider';
import { Banner } from './types';

export default async function Hero({ locale }: { locale: string }) {
  let destinations: DestinationCard[] = [];
  let banners: Banner[] = [];

  try {
    destinations = await apiGet<DestinationCard[]>(`destinations?all=1&locale=${locale}`, {
      next: { revalidate: 60 * 5 },
    });
  } catch (err: unknown) {
    const e = err as { status?: number; statusText?: string; url?: string };
    console.warn('Failed to fetch home destinations:', e?.status, e?.statusText, e?.url);
  }

  try {
    banners = await apiGet<Banner[]>(`banners?location=home`, {
      next: { revalidate: 60 * 5 },
    });
  } catch (err: unknown) {
    const e = err as { status?: number; statusText?: string; url?: string };
    console.warn('Failed to fetch home banners:', e?.status, e?.statusText, e?.url);
  }

  const normalizedBanners = banners.filter(
    (banner) =>
      Boolean(banner?.link && typeof banner.link === 'string' && banner.link.trim()) &&
      Boolean(banner?.media?.file),
  );

  return (
    <section
      className={cn('flex flex-col gap-[28px] mt-[21px] mb-[43px]', 'md:gap-[42px] md:mb-[64px]')}
    >
      <HeroSearch data={destinations} />
      <HeroSlider banners={normalizedBanners} />
    </section>
  );
}
