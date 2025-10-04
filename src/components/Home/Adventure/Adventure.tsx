import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { DefaultComponentsProps } from '@/types';
import { AdventureCardType } from '@/components/UI/AdventureCard/_types';
import { apiGet } from '@/utils/serverApi';
const AdventureCard = dynamic(() => import('@/components/UI/AdventureCard/AdventureCard'));

export default async function Adventure({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const data = (await apiGet(`types?main_page=1&limit=12&page=1&perPage=12&locale=${locale}`, {
    next: { revalidate: 60 * 5 },
  })) as AdventureCardType[];

  if (!data.length) return null;

  return (
    <section className="container my-[70px] flex flex-col gap-5 [@media(max-width:768px)]:my-[40px]">
      <h5 className="text-[42px] [@media(max-width:768px)]:text-[24px] font-semibold">
        {t('adventure_title')}
      </h5>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 [@media(max-width:1024px)]:grid-cols-3 [@media(max-width:768px)]:grid-cols-2">
        {data?.slice(0, 8).map((type: AdventureCardType) => (
          <AdventureCard key={type.id} type={type} locale={locale} />
        ))}
      </div>
    </section>
  );
}
