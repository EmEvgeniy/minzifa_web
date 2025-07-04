import { Logo, LangBtn } from '../UI';
import { NavWrapper } from './NavWrapper';
import { Nav } from './Nav';
import { IoLogoWhatsapp } from 'react-icons/io';
import Link from 'next/link';
import { contacts } from '@/store/contacts';
import { getTranslations, getLocale } from 'next-intl/server';
import { NavItemType } from './_types';

export default async function Desctop() {
  const t = await getTranslations();
  const locale = await getLocale();
  const navItems = t.raw('navigation.nav') as NavItemType[];

  const wa = contacts?.social_media?.find((item) => item.name === 'WhatsApp');
  const whatsappLink = wa?.url?.[locale] || '#';

  return (
    <header className="container w-full fixed top-10 left-1/2 -translate-x-1/2 [@media(max-width:1024px)]:hidden flex items-center justify-between gap-5 z-50">
      <div className="bg-[rgba(22,55,45,0.7)] backdrop-blur-[6px] w-full py-5 px-5 rounded-[20px] flex items-center justify-between">
        <Logo />
        <NavWrapper>
          <Nav menu={navItems} />
        </NavWrapper>
      </div>

      <LangBtn />
      <Link
        href={whatsappLink}
        target="_blank"
        prefetch={false}
        className="flex items-center justify-center gap-5 rounded-full bg-[#66B93E] px-10 [@media(max-width:1250px)]:px-5 py-[21px] text-white transition hover:bg-green-600 shadow-2xl"
      >
        <IoLogoWhatsapp size={24} />
        <span className="text-[18px] font-semibold">Whatsapp</span>
      </Link>
    </header>
  );
}
