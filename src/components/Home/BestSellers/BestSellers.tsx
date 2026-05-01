import { getApiUrl } from '@/utils/config';
import { BestSellersPackagesCardType } from '@/components/UI/BestSellersPackagesCard/_types';
import Wrapper from './Wrapper';
import { apiGet } from '@/api';

export default async function ({ locale }: { locale: string }) {
  let data: BestSellersPackagesCardType[] = [];

  try {
    data = await apiGet(getApiUrl(`tours?main_page=1&locale=${locale}`), {
      next: { revalidate: 60 * 5 },
    });
  } catch (err: unknown) {
    const e = err as { status?: number; statusText?: string; url?: string };
    console.warn('Failed to fetch home best sellers section:', e?.status, e?.statusText, e?.url);
  }

  return (
    <section className="container px-2.5 flex flex-col gap-5 mb-[75px] md:mb-[88px]">
      <Wrapper data={data} locale={locale} />
    </section>
  );
}
