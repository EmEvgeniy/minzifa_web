'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { circle1, circle3, circle4, circle5 } from '@/assets/img';
import { eco_icon3, eco_icon4, eco_icon5, economy_icon } from '@/assets/icons';
import { cn } from '@/utils/utils';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { StaticImageData } from 'next/image';

interface CircleItem {
  key: 'env' | 'cult' | 'animal' | 'economy';
  label: string;
  description: string;
  img: StaticImageData;
  icon: StaticImageData;
}

export default function EnvironmentCircle() {
  const t = useTranslations('eco');
  const blocks = t.raw('block');

  const items: CircleItem[] = [
    {
      key: 'env',
      label: blocks[0].title,
      description: blocks[0].text,
      img: circle1,
      icon: eco_icon3,
    },
    {
      key: 'animal',
      label: blocks[1].title,
      description: blocks[1].text,
      img: circle3,
      icon: eco_icon5,
    },
    {
      key: 'cult',
      label: blocks[2].title,
      description: blocks[2].text,
      img: circle4,
      icon: eco_icon4,
    },
    {
      key: 'economy',
      label: blocks[3].title,
      description: blocks[3].text,
      img: circle5,
      icon: economy_icon,
    },
  ];

  const [activeItem, setActiveItem] = useState<CircleItem>(items[0]);

  return (
    <section className="my-[70px] relative container h-[550px] max-[768px]:hidden">
      <div className="relative flex items-center justify-center bg-[#16372D] w-full h-full rounded-2xl shadow-2xl overflow-hidden z-[11]">

        <div className='relative w-[450px] h-[450px] rounded-full overflow-hidden border-2 border-[#27A430] flex items-center justify-center'>
          {/* Центральный круг */}
          <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden border-2 border-[#27A430] flex items-center justify-center">
            <ImageWithFallback
              src={activeItem.img}
              alt={activeItem.label}
              width={1000}
              height={1000}
              className="opacity-90 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#16372D]/50 rounded-full" />
            <div className="absolute text-center text-white font-bold">
              {activeItem.description}
            </div>
          </div>
        </div>

        <div className='absolute inset-0'>
          {/* Пункты вокруг круга */}
          {items.map((item) => {
            return (
              <div
                key={item.key}
                onClick={() => setActiveItem(item)}
                className={cn(
                  `absolute cursor-pointer transition-all duration-300`,
                  'text-center flex items-center justify-center gap-3',
                  (item.key === 'env' || item.key == 'animal') ? 'flex-row' : 'flex-row-reverse',

                  item.key === 'env' && 'left-[80px] top-[150px]',
                  item.key == 'cult' && 'left-[83px] bottom-[143px]',
                  item.key === 'animal' && 'right-[83px] top-[153px]',
                  item.key == 'economy' && 'right-[83px] bottom-[143px]',
                )}
              >
                <div
                  className={cn(
                    'px-2.5 py-5 rounded-xl text-sm w-[280px] text-left font-medium border transition-colors flex items-center gap-3',
                    activeItem.key === item.key
                      ? 'bg-[#27A430] text-white border-[#27A430]'
                      : 'bg-[#CFDFD9] text-[#16372D] border-[#27A430]/20'
                  )}
                >
                  <ImageWithFallback
                    src={item.icon}
                    alt={item.label}
                    width={100}
                    height={100}
                    className="w-6 h-6 object-contain"
                  />
                  {item.label}
                </div>
                {/* точка */}
                <div
                  className={cn(
                    'w-6 h-6 rounded-full border-2 border-[#27A430] transition-colors',
                    activeItem.key === item.key ? 'bg-[#27A430]' : 'bg-[#16372D]'
                  )}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
