'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useLocale, useTranslations } from 'next-intl';
import { NavItemType } from './_types';
import { useRouter } from 'next/navigation';
import Logo from '../../UI/Logo/Logo';

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const t = useTranslations();
  const menu = t.raw('navigation.nav') as NavItemType[];
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleNavClick = (link: string) => {
    router.push(`/${locale}/${link}`);
    setIsOpen(false);
  };

  // Portal content only rendered on client and when menu is open
  const portalContent = isClient && isOpen ? createPortal(
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-9999"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-80 bg-foreground/80 backdrop-blur-2xl z-10000 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="w-full h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-white/70 p-5 mb-5">
            <Logo locale={locale} className="w-[200px]" alt={'Minzifa Travel'} />
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Close menu"
            >
              <HiX size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="border-b-2 border-white/70 grow">
            <ul className="space-y-2">
              {menu.map((item, index) => (
                <li key={index}>
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
        </div>
      </div>
    </>,
    document.body
  ) : null;

  return (
    <>
      <button
        onClick={toggleMenu}
        className="text-white hover:text-gray-300 transition-colors p-2"
        aria-label="Toggle menu"
      >
        <HiMenu size={24} />
      </button>
      {portalContent}
    </>
  );
};
