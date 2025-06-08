import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="w-full h-[200vh]">
      <p className="text-5xl">{t('title')}g</p>
    </div>
  );
}
