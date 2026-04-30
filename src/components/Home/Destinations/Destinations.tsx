import { getTranslations } from 'next-intl/server';
import { apiGet } from '../../../utils/serverApi';
import { DestinationCard } from './_types';
import Wrapper from './Wrapper';

export default async function Destinations({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const data = (await apiGet(`destinations?main_page=1&locale=${locale}`, {
    next: { revalidate: 60 * 5 },
  })) as DestinationCard[];

  return (
    <section className="mb-[70px] md:mb-[112px]">
      <div className="container px-2.5 flex flex-col gap-8">
        <h4 className="text-foreground text-[32px] font-title font-bold [@media(max-width:768px)]:text-[24px] w-full">
          {t('destinationTitle')}
        </h4>
        <Wrapper data={data} locale={locale} />
      </div>
    </section>
  );
}
