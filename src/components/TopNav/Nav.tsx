'use client';

import { NavItemType } from './_types';
import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa6';
import { useNavStore } from './store';

export const Nav = ({ menu, locale }: { menu: NavItemType[]; locale: string }) => {
  const activeIndex = useNavStore((state) => state.index);
  const setActiveIndex = useNavStore((state) => state.setIndex);

  return (
    <nav className="text-white list-none flex items-center w-full justify-end gap-5">
      {menu.map((el, i) => (
        <li
          key={i}
          onMouseOver={() => (i == 1 ? setActiveIndex(i) : null)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <Link
            href={`/${locale}/${el.link}`}
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
