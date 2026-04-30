import { getTranslations } from 'next-intl/server';
import { AdventureCardType } from '@/components/UI/AdventureCard/_types';
import { apiGet } from '@/utils/serverApi';
import AdventureCard from '@/components/UI/AdventureCard/AdventureCard';
import Wrapper from './Wrapper';

export default async function Adventure({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const data = (await apiGet(`types?show_in_main=1&locale=${locale}`, {
    next: { revalidate: 60 * 5 },
  })) as AdventureCardType[];

  if (!data.length) return null;

  return (
    <section className="mb-[70px] md:mb-[112px]">
      <div className="container px-2.5 flex flex-col gap-8">
        <h4 className="text-foreground text-[32px] font-title font-bold [@media(max-width:768px)]:text-[24px] w-full">
          {t('adventureTitle')}
        </h4>
        <div className="hidden lg:grid lg:gap-6 lg:grid-cols-4">
          {data?.slice(0, 7).map((type: AdventureCardType, index: number) => (
            <AdventureCard
              key={type.id}
              type={type}
              locale={locale}
              className={index === 0 ? 'row-span-2' : ''}
            />
          ))}
        </div>

        <div className="block md:hidden">
          <Wrapper data={data} />
        </div>
      </div>
    </section>
  );
}
