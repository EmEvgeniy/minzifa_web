'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import { DestinationCard } from '../Destinations/_types';

export default function HeroSearch({
  data,
  locale,
  pl,
}: {
  data: DestinationCard[];
  locale: string;
  pl: string;
}) {
  const t = useTranslations('common');
  const [value, setValue] = useState<string>('');

  const filtered = useMemo(() => {
    if (!value || !data) return [];
    return data.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
  }, [value, data]);

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="bg-white max-w-[320px] px-[15px] py-[11px] w-full flex items-center justify-between gap-1 rounded-[16px] mt-[1px] [@media(max-width:1024px)]:py-[5px] [@media(max-width:1024px)]:max-w-full ">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={pl}
          className="text-[#16372DCC] w-full focus:outline-none text-base [@media(max-width:1024px)]:text-[14px]"
        />
        <Link
          href={`/${locale}/tours`}
          className="bg-[#27A430] p-[9.8px] rounded-[16px] hover:bg-[#208B28] cursor-pointer transition-all active:scale-110 [@media(max-width:1024px)]:p-[10px] [@media(max-width:1024px)]:rounded-[12px]"
        >
          <RiSearch2Line className="w-[28px] h-[28px] [@media(max-width:1024px)]:w-[20px] [@media(max-width:1024px)]:h-[20px]" />
        </Link>
        {value && filtered.length > 0 && (
          <div className="bg-white p-5 rounded-[15px] absolute top-[110%] left-1/2 -translate-x-1/2 max-w-[320px] w-full text-black z-50 shadow-md max-[1024px]:max-w-full max-h-[300px] overflow-y-scroll ">
            {filtered.map((item, i) => (
              <Link
                key={i}
                href={`/${locale}/tours?destination=${encodeURIComponent(item.name)}`}
                className="block hover:underline hover:text-[#27A430] text-[16px] truncate"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
        {value && filtered.length === 0 && (
          <div className="bg-white p-5 rounded-[15px] absolute top-[110%] left-1/2 -translate-x-1/2 max-w-[320px] w-full text-black z-50 shadow-md max-[1024px]:max-w-full">
            <p className="text-sm text-gray-500">
              {t('nothingFound')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
