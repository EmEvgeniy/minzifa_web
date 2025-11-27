'use client';

import { LangBtn } from '../../UI';
import { NavWrapper } from './NavWrapper';
import { Nav } from './Nav';
import { IoLogoWhatsapp } from 'react-icons/io';
import Link from 'next/link';
import { contacts } from '@/store/contacts';
import { useTranslations } from 'next-intl';
import { NavItemType } from './_types';
import Logo from '../../UI/Logo/Logo';
import Button from '@/components/UI/Button/Button';
import { useAuthStore } from '@/store';
import { RiUserLine } from 'react-icons/ri';
import AuthHeader from '@/components/Auth/AuthHeader';

export default function Desktop({ locale }: { locale: string }) {
    const t = useTranslations();
    const navItems = t.raw('navigation.nav') as NavItemType[];

    const wa = contacts?.social_media?.find((item) => item.name === 'WhatsApp');
    const whatsappLink = wa?.url?.[locale];

    const { isAuthenticated, setAuthPopup } = useAuthStore();

    const handleLogin = () => setAuthPopup(true);

    return (
        <header
            className="px-20 w-full fixed top-10 left-1/2 -translate-x-1/2 [@media(max-width:1024px)]:hidden flex items-center justify-between gap-5 z-50">
            <div
                className="bg-[rgba(22,55,45,0.7)] backdrop-blur-[6px] w-full py-5 px-5 rounded-[20px] flex items-center justify-between">
                <Logo locale={locale} className="w-[200px]" />
                <NavWrapper>
                    <Nav menu={navItems} locale={locale} />
                </NavWrapper>
                <div className="flex items-center gap-5">
                    <hr className="w-[2px] h-[40px] bg-white/30" />
                    <LangBtn />
                    {isAuthenticated ? (
                        <AuthHeader />
                    ) : (
                        <Button className={"flex items-center gap-2 bg-[#16372D] text-white px-5 py-2.5 rounded-lg hover:bg-[#0f2921] transition-colors"} onClick={handleLogin}>
                            <RiUserLine size={20} />
                            {t('auth.nav.login')}
                        </Button>
                    )}
                </div>
            </div>

            <Link
                href={whatsappLink as string}
                target="_blank"
                className="flex items-center justify-center gap-5 rounded-full bg-[#66B93E] px-10 [@media(max-width:1250px)]:px-5 py-[21px] text-white transition hover:bg-green-600 shadow-2xl"
            >
                <IoLogoWhatsapp size={24} />
                <span className="text-[18px] font-semibold">Whatsapp</span>
            </Link>

        </header>
    );
}
