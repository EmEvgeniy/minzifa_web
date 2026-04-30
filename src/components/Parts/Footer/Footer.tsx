import FooterLeft from './FooterLeft';
import FooterMiddle from './FooterMiddle';
import { FooterRight } from './FooterRight';
import FooterImg from '../../../../public/bg_footer.svg';
import Image from 'next/image';
import SocialMedia from '@/components/UI/SocialMedia/SocialMedia';
import { contacts } from '@/store';

export default async function Footer({ locale }: { locale: string }) {
  return (
    <footer className="bg-foreground w-full relative">
      <div className="container px-2.5 py-[48px] lg:px-[40px] lg:py-[60px]">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <FooterLeft locale={locale} />
          <FooterMiddle locale={locale} />
          <SocialMedia
            className={'flex lg:hidden flex-row gap-2 my-8'}
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
          <FooterRight />
        </div>
      </div>
      <Image
        src={FooterImg}
        width={1000}
        height={1000}
        quality={70}
        alt="footer img"
        className="absolute bottom-0 right-0 pointer-events-none hidden lg:block"
      />
    </footer>
  );
}
