import { DefaultComponentsProps } from '@/types';
import { getTranslations } from 'next-intl/server';

export default async function TourByRequest({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale, namespace: 'Tour' });

  const handleScroll = () => {
    document.getElementById('free-consultation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={'sticky top-36'}>
      <div className="bg-white rounded-2xl p-6 flex flex-col gap-5">
        <div className="text-base">{t('by_request.text')}</div>
        <button
          onClick={() => handleScroll()}
          className="text-center w-full rounded-4xl bg-[#27A430] text-white p-4 cursor-pointer transition-all duration-300 hover:bg-[#208B28]"
        >
          {t('by_request.button')}
        </button>
      </div>
    </div>
  );
}
