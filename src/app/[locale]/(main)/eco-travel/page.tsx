import dynamic from 'next/dynamic';

import { Metadata } from 'next';
import { DefaultPageProps, ISeoMetadata } from '@/types';
import { apiGet } from '../../../../utils/serverApi';
import { getTranslations } from 'next-intl/server';

const HeroSection = dynamic(() => import('@/components/Eco-travel/HeroSection/HeroSection'));
const TeamSection = dynamic(() => import('@/components/Eco-travel/TeamSection/TeamSection'));
const MissionSection = dynamic(
  () => import('@/components/Eco-travel/MissionSection/MissionSection'),
);
// const EnvironmentCircle = dynamic(() => import('@/components/Eco-travel/EnvironmentCircle/EnvironmentCircle'));
// const MobileSlider = dynamic(() => import('@/components/Eco-travel/MobileSlider/MobileSlider'));
const Environment = dynamic(() => import('@/components/Eco-travel/Environment/Environment'));
const EnvironmentSection = dynamic(
  () => import('@/components/Eco-travel/EnvironmentSection/EnvironmentSection'),
);
const ChildrenSection = dynamic(
  () => import('@/components/Eco-travel/ChildrenSection/ChildrenSection'),
);
const AnimalSection = dynamic(() => import('@/components/Eco-travel/AnimalSection/AnimalSection'));
const Economy = dynamic(() => import('@/components/Eco-travel/Economy/Economy'));
const FreeConsultationForm = dynamic(
  () => import('@/components/UI/FreeConsultationForm/FreeConsultationForm'),
);

export function generateStaticParams() {
  return ['en', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DefaultPageProps): Promise<Metadata> {
  const rawLocale = (await params).locale;
  const locale = ['en', 'ru'].includes(rawLocale) ? rawLocale : 'en';
  const pagePath = `/${locale}/eco-travel`;

  const data = await apiGet<{ seo_metadata?: ISeoMetadata }>(
    `pages?page=${encodeURIComponent(pagePath)}`,
  );

  return {
    title: data?.seo_metadata?.title,
    description: data?.seo_metadata?.description,
    keywords: data?.seo_metadata?.keywords,
  };
}

export default async function page({ params }: DefaultPageProps) {
  const { locale } = await params;
  const pagePath = `/${locale}/eco-travel`;

  const { seo_metadata } = await apiGet<{ seo_metadata?: ISeoMetadata }>(
    `pages?page=${encodeURIComponent(pagePath)}`,
  );

  const t = await getTranslations({ locale });

  const teamContent = t.raw('eco.team.content');
  const missionContent = t.raw('eco.mission.content');
  const environmentContent = t.raw('eco.env.content');

  const block = t.raw('eco.environment.block');
  const block2 = t.raw('eco.children.block');
  const block3 = t.raw('eco.economy.block');

  if (!seo_metadata) return null;

  return (
    <>
      <HeroSection locale={locale} t={t} seo_metadata={seo_metadata} />
      <TeamSection t={t} teamContent={teamContent} />
      <MissionSection t={t} missionContent={missionContent} seo_metadata={seo_metadata} />
      {/* <EnvironmentCircle /> */}
      {/* <MobileSlider /> */}
      <Environment
        title={t('eco.environment.title')}
        block={block}
        subTitle={t('eco.environment.title2')}
        subTitle2={t('eco.environment.sub_title')}
      />
      <EnvironmentSection t={t} environmentContent={environmentContent} />
      <ChildrenSection t={t} block2={block2} />
      <AnimalSection t={t} />
      <Economy
        block={block3}
        title={t('eco.economy.title')}
        subTitle={t('eco.economy.sub_title')}
      />
      <div className="container">
        <FreeConsultationForm />
      </div>
    </>
  );
}
