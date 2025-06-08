'use client';
import React, { FC } from 'react';
import { NavMenuType } from './_types';
import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa6';
import { useNavStore } from './store';
import { useLocale } from 'next-intl';

export const Nav: FC<NavMenuType> = ({ menu }) => {
  const activeIndex = useNavStore((state) => state.index);
  const setActiveIndex = useNavStore((state) => state.setIndex);
  const currentLocale = useLocale();

  return (
    <nav className="text-white list-none flex items-center w-full justify-end gap-5">
      {menu.map((el, i) => (
        <li
          key={i}
          onMouseOver={() => (i == 1 ? setActiveIndex(i) : null)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <Link
            href={`/${currentLocale}/${el.link}`}
            locale={currentLocale}
            className="flex items-center justify-center gap-2 hover:text-green-500 transition-all"
          >
            <span className=" text-nowrap text-[18px]">{el.title}</span>
            {el.inner && (
              <FaChevronDown
                className={`transition-transform duration-200 ${
                  activeIndex === i ? 'rotate-180' : ''
                }`}
                size={12}
              />
            )}
          </Link>
        </li>
      ))}
    </nav>
  );
};
