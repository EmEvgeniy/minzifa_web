import { DefaultComponentsProps } from '@/types';
import { FormTop } from './FormTop';
import { getTranslations } from 'next-intl/server';

export default async function CreateYourTripFormWrapper({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale, namespace: 'create-your-trip' });

  return (
    <div className="relative z-30 min-h-[70svh] container text-white flex flex-col items-center py-[150px] max-[550px]:py-[100px]">
      <h1 className="text-[56px] max-[1024px]:text-[42px] max-[768px]:text-[30px] font-title">
        {t('title')}
      </h1>
      <div className="w-full flex flex-col items-center gap-8 pt-[60px] max-[1024px]:pt-[40px]">
        <FormTop />
      </div>
    </div>
  );
}
