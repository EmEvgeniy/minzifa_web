'use client';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { useLocale, useTranslations } from 'next-intl';
import { NavItemType } from './_types';

import { useRouter } from 'next/navigation';
import SocialMedia from '../UI/SocialMedia/SocialMedia';
import Logo from '../UI/Logo/Logo';

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const menu = t.raw('navigation.nav') as NavItemType[];
  const locale = useLocale();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (link: string) => {
    router.push(`/${locale}/${link}`);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="text-white hover:text-gray-300 transition-colors p-2"
        aria-label="Toggle menu"
      >
        <HiMenu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#16372D] z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="w-full h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-white/70 p-5 mb-5">
            <Logo locale={locale} className="w-[200px]" />
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Close menu"
            >
              <HiX size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="border-b-2 border-white/70 flex-grow">
            <ul className="space-y-2">
              {menu.map((item) => (
                <li key={item.link}>
                  <button
                    onClick={() => handleNavClick(item.link)}
                    className="w-full text-left text-white hover:bg-white/10 px-5 py-3 transition-colors text-lg"
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Media */}
          <div className="p-5">
            <SocialMedia className="justify-between" iconSize={18} />
          </div>
        </div>
      </div>
    </>
  );
};
