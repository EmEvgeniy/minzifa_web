'use client';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { useNavStore } from './store';
import { useGetQuery } from '@/api/get.api';
import Link from 'next/link';
import { DestinationProps } from './_types';
import Image from 'next/image';
import { useLocale } from 'next-intl';

export const NavWrapper = ({ children }: { children: React.ReactNode }) => {
  const index = useNavStore((state) => state.index);
  const setActiveIndex = useNavStore((state) => state.setIndex);
  const locale = useLocale();
  const { data, isSuccess } = useGetQuery<DestinationProps[]>({
    key: ['destinations_top'],
    page: '',
    perPage: '',
    url: 'destinations',
    searchItem: '',
    additionalParam: '&show_in_menu=1',
  });

  return (
    <div
      onMouseEnter={() => index !== null && setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
      className="relative"
    >
      {children}
      <AnimatePresence>
        {index !== null && data?.length && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onMouseEnter={() => index !== null && setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute left-0 w-full top-full min-h-[100px] bg-white p-[10px] rounded-[10px] shadow-2xl mt-5 z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={index}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="flex flex-col gap-5 py-2"
            >
              {isSuccess &&
                data.slice(0, 5).map((el: DestinationProps) => (
                  <Link
                    href={`/${locale}/destination/${el.slug}`}
                    key={el.id}
                    className="flex items-center justify-start px-2 w-full gap-3 hover:bg-gray-300 rounded-2xl py-2 "
                  >
                    {el.icon?.file && (
                      <Image
                        src={el.icon?.file || ''}
                        alt={el.icon?.alt_text || 'img'}
                        width={43}
                        height={43}
                      />
                    )}
                    <span className="text-xl">{el.name}</span>
                  </Link>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
