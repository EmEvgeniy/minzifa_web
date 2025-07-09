import MobileDrawler from './MobileDrawler';
import { DefaultComponentsProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import MobileBtn from './MobileBtn';
import Filter from '../MainSection/Filter';

export default async function MobileMenu({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale });

  return (
    <div className="max-[1024px]:block hidden">
      <MobileBtn btn={t('Filters')} />
      <MobileDrawler btn={t('Filters')} elem={<Filter locale={locale} />} />
    </div>
  );
}
