'use client';

import { FaChevronDown } from 'react-icons/fa6';
import { usePathname, useRouter } from 'next/navigation';
import Button from '../Button/Button';
import { Dropdown, DropdownDetails, DropdownItem, DropdownSummary } from '../Dropdown/Dropdown';

export const LangBtn = () => {
  const pathname = usePathname();
  const router = useRouter();
  const localeOptions = ['en', 'ru'] as const;
  const currentLocale = pathname?.slice(1, 3) ?? 'en';

  const handleChange = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;

    return segments.join('/');
  };

  return (
    <Dropdown className="w-auto">
      <DropdownSummary>
        {({ isOpen }) => (
          <Button color="link" className="text-white text-base font-medium capitalize">
            <span className="[@media(max-width:1024px)]:text-sm">{currentLocale}</span>
            <span
              className="transition-transform duration-300"
              style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
            >
              <FaChevronDown size={14} />
            </span>
          </Button>
        )}
      </DropdownSummary>
      <DropdownDetails className="top-full left-1/2 -translate-x-1/2 mt-2 bg-white text-foreground rounded-[10px] w-[70px] p-3 shadow-2xl flex flex-col gap-2 z-50 [@media(max-width:950px)]:bg-white border-none">
        {localeOptions.map((locale) => (
          <DropdownItem
            key={locale}
            onClick={() => {
              const newLocalePath = handleChange(locale);
              router.replace(newLocalePath);
            }}
            className={`text-center cursor-pointer px-0 py-0 hover:bg-transparent ${
              locale === currentLocale
                ? 'text-foreground/80 font-semibold [@media(max-width:950px)]:text-gray-900'
                : 'text-foreground'
            }`}
          >
            {locale.toUpperCase()}
          </DropdownItem>
        ))}
      </DropdownDetails>
    </Dropdown>
  );
};
