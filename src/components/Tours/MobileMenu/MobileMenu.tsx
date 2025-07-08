import MobileDrawler from './MobileDrawler';
import { DefaultComponentsProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import MobileBtn from './MobileBtn';

export default async function MobileMenu({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale });

  return (
    <div className="block md:hidden">
      <MobileBtn btn={t('Filters')} />
      <MobileDrawler locale={locale} btn={t('Filters')} />
    </div>
  );
}
