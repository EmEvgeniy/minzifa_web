import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="w-full ">
      <p className="text-5xl">{t('title')}g</p>
    </div>
  );
}
