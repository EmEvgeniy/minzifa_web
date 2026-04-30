import { getApiUrl } from '@/utils/config';
import { BestSellersPackagesCardType } from '@/components/UI/BestSellersPackagesCard/_types';
import Wrapper from './Wrapper';

export default async function ({ locale }: { locale: string }) {
  let data: BestSellersPackagesCardType[] = [];

  try {
    const response = await fetch(getApiUrl(`tours?main_page=1&locale=${locale}`), {
      next: { revalidate: 60 * 5 },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch home bestsellers: HTTP ${response.status}`);
    } else {
      const payload = (await response.json()) as unknown;
      data = Array.isArray(payload) ? (payload as BestSellersPackagesCardType[]) : [];
    }
  } catch (err: unknown) {
    const e = err as { message?: string };
    console.warn('Failed to fetch home bestsellers:', e?.message);
    data = [];
  }

  return (
    <section className="container px-2.5 flex flex-col gap-5 mb-[75px] md:mb-[88px]">
      <Wrapper data={data} locale={locale} />
    </section>
  );
}
