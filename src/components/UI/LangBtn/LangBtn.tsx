'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import { LangBtnType } from './_types';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa6';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export const LangBtn: FC<LangBtnType> = ({ langs }) => {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (locale: string) => {
    if (locale !== currentLocale) {
      router.replace(pathname, { locale });
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setActive(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative max-w-fit cursor-pointer">
      <button
        onClick={() => setActive((prev) => !prev)}
        className="flex items-center gap-1 text-[16px] text-white focus:outline-none cursor-pointer"
      >
        <span className="[@media(max-width:1024px)]:text-sm">{currentLocale.toUpperCase()}</span>
        <motion.span animate={{ rotate: active ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <FaChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#16372D80] rounded-[10px] w-[70px] p-3 shadow-2xl flex flex-col gap-2 z-50 [@media(max-width:950px)]:bg-white"
          >
            {langs.map((el) => (
              <button
                key={el}
                onClick={() => {
                  handleChange(el);
                  setActive(false);
                }}
                className={`text-center cursor-pointer ${
                  el === currentLocale
                    ? 'text-white font-semibold [@media(max-width:950px)]:text-gray-900'
                    : 'text-gray-900'
                }`}
              >
                {el.toUpperCase()}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
