'use client';

import { useState, useEffect, useRef } from 'react';
import { LangBtn } from '../UI';
import { NavWrapper } from './NavWrapper';
import { Nav } from './Nav';
import { IoLogoWhatsapp } from 'react-icons/io';
import Link from 'next/link';
import { contacts } from '@/store/contacts';
import { useTranslations } from 'next-intl';
import { NavItemType } from './_types';
import Logo from '../UI/Logo/Logo';
import { DefaultComponentsProps } from '@/types';
import { Button } from '@/components/UI/Button/Button';
import { useAuthStore } from '@/store';
import { RiUserLine } from 'react-icons/ri';
import { AuthPopup } from '../Auth/AuthPopup';

// Кастомные стили для кнопок
const buttonClasses = {
  login:
    'flex items-center gap-2 bg-[#16372D] text-white px-5 py-2.5 rounded-lg hover:bg-[#0f2921] transition-colors',
  user: 'flex items-center gap-2 text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors',
  logout: 'text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors text-left w-full',
};

const dropdownClasses =
  'absolute top-full right-0 mt-2 bg-[rgba(22,55,45,0.9)] backdrop-blur-[6px] border border-white/10 rounded-lg shadow-lg min-w-[200px] z-50';

export default function Desktop({ locale }: DefaultComponentsProps) {
  const t = useTranslations();
  const navItems = t.raw('navigation.nav') as NavItemType[];

  const wa = contacts?.social_media?.find((item) => item.name === 'WhatsApp');
  const whatsappLink = wa?.url?.[locale] || '#';

  const { user, isAuthenticated } = useAuthStore();
  const [authPopupOpen, setAuthPopupOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const open = isDropdownOpen;

  const handleLogin = () => setAuthPopupOpen(true);
  const handleLogout = () => useAuthStore.getState().logout();
  const handleAuthPopupClose = () => setAuthPopupOpen(false);
  const handleMenuClick = () => setIsDropdownOpen(!isDropdownOpen);
  const handleMenuClose = () => setIsDropdownOpen(false);

  // Закрываем dropdown при клике вне меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="px-20 w-full fixed top-10 left-1/2 -translate-x-1/2 [@media(max-width:1024px)]:hidden flex items-center justify-between gap-5 z-50">
      <div className="bg-[rgba(22,55,45,0.7)] backdrop-blur-[6px] w-full py-5 px-5 rounded-[20px] flex items-center justify-between">
        <Logo locale={locale} />
        <NavWrapper>
          <Nav menu={navItems} locale={locale} />
        </NavWrapper>
        <div className="flex items-center gap-5">
          <hr className="w-[2px] h-[40px] bg-white/30" />
          <LangBtn />
          {isAuthenticated ? (
            <>
              <div className="relative">
                <button onClick={handleMenuClick} className={buttonClasses.user}>
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <RiUserLine size={16} />
                  </div>
                  {user?.name}
                </button>
                {open && (
                  <div className={dropdownClasses}>
                    <Link
                      href={`/${locale}/profile`}
                      className="block px-4 py-3 text-white text-base hover:bg-white/10 transition-colors"
                      onClick={handleMenuClose}
                    >
                      {t('auth.nav.profile')}
                    </Link>
                    <Link
                      href={`/${locale}/chats`}
                      className="block px-4 py-3 text-white text-base hover:bg-white/10 transition-colors"
                      onClick={handleMenuClose}
                    >
                      {t('auth.nav.chats')}
                    </Link>
                    <button onClick={handleLogout} className={`${buttonClasses.logout} block`}>
                      {t('auth.nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              className={buttonClasses.login}
              onClick={handleLogin}
            >
              <RiUserLine size={20} />
              {t('auth.nav.login')}
            </Button>
          )}
        </div>
      </div>

      <Link
        href={whatsappLink}
        target="_blank"
        className="flex items-center justify-center gap-5 rounded-full bg-[#66B93E] px-10 [@media(max-width:1250px)]:px-5 py-[21px] text-white transition hover:bg-green-600 shadow-2xl"
      >
        <IoLogoWhatsapp size={24} />
        <span className="text-[18px] font-semibold">Whatsapp</span>
      </Link>

      <AuthPopup open={authPopupOpen} onClose={handleAuthPopupClose} />
    </header>
  );
}
