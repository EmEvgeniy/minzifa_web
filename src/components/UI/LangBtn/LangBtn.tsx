'use client';
import React, { useEffect, useRef, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa6';
import { usePathname, useRouter } from 'next/navigation';

export const LangBtn = () => {
  const pathname = usePathname();
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleChange = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;

    return segments.join('/');
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
        <span className="[@media(max-width:1024px)]:text-sm">
          {pathname?.slice(1, 3).toUpperCase()}
        </span>
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
            {['en', 'ru'].map((el) => (
              <button
                key={el}
                onClick={() => {
                  setActive(false);
                  const newLocalePath = handleChange(el);
                  router.replace(newLocalePath);
                }}
                className={`text-center cursor-pointer ${
                  el === pathname?.slice(1, 3)
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
