import { getTranslations } from 'next-intl/server';
import Logo from '../../UI/Logo/Logo';
import SocialMedia from '../../UI/SocialMedia/SocialMedia';
import { contacts } from '@/store/contacts';

export default async function FooterLeft({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'footer' });

  return (
    <div className="flex flex-col gap-3 items-start justify-between">
      <Logo locale={locale} className="w-[160px] lg:w-[230px]" alt="Minzifa Travel" />
      <div className="flex flex-col gap-3">
        <p className="text-[24px]">{t('title')}</p>
        <SocialMedia
          className={'hidden lg:flex flex-row gap-2'}
          linkClassName={'bg-white rounded-full p-2.5'}
          iconColor="#022B1B"
          socials={[
            contacts.social_media[1],
            contacts.social_media[0],
            contacts.social_media[3],
            contacts.social_media[4],
            contacts.social_media[6],
          ]}
        />
      </div>
    </div>
  );
}
