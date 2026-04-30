import { getApiUrl } from '@/utils/config';
import { BestSellersPackagesCardType } from '@/components/UI/BestSellersPackagesCard/_types';
import Wrapper from './Wrapper';

export default async function ({ locale }: { locale: string }) {
  let data: BestSellersPackagesCardType[] | null;

  try {
    data = await fetch(getApiUrl(`tours?main_page=1&locale=${locale}`), {
      next: { revalidate: 60 * 5 },
    }).then((res) => res.json());
  } catch {
    data = [];
  }

  return (
    <section className="container px-2.5 flex flex-col gap-5 mb-[75px] md:mb-[88px]">
      <Wrapper data={data} locale={locale} />
    </section>
  );
}
