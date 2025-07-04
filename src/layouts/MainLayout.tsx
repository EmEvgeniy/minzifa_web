'use client';

import React, { useEffect, useRef } from 'react';
import { Footer } from '@/components/Footer';
import { TopNav, SocialMedia, Popup } from '@/components';
import { useLayoutStore } from './layoutStote';
import { useLocale } from 'next-intl';
import { useSelectedLayoutSegments } from 'next/navigation';
import { CreateYourTripForm } from '@/components/UI/CreateYourTripForm/CreateYourTripForm';
import { ConsultationQuiz } from '@/components/UI/ConsultationQuiz/ConsultationQuiz';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const footerRef = useRef<HTMLDivElement>(null);
  const { open, setOpen, setOneOpen, oneOpened } = useLayoutStore((state) => state);
  const locale = useLocale();
  const segments = useSelectedLayoutSegments();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!oneOpened) {
        setOpen(true);
        setOneOpen(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [oneOpened, setOneOpen, setOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true);
        }
      },
      { threshold: 0.4 },
    );

    const target = footerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <div className="flex flex-col h-full min-h-[100vh] w-full relative font-text">
      <div className="hidden md:flex md:fixed md:right-0 md:z-50 md:bg-[rgba(22,55,45,0.7)] md:backdrop-blur-[6px] md:top-[150px] md:p-5 md:rounded-tl-[16px] md:rounded-bl-[16px] max-[1024px]:p-2.5">
        <SocialMedia direction="vertical" gap={20} />
      </div>

      <TopNav />
      <main className="flex-1">{children}</main>

      {!segments?.includes('(tour)') && (
        <Popup
          open={open}
          handleClose={() => setOpen(false)}
          content={
            locale === 'en' ? (
              <CreateYourTripForm popupClose={() => setOpen(false)} />
            ) : (
              <ConsultationQuiz popupClose={() => setOpen(false)} />
            )
          }
          maxWidth="md"
        />
      )}

      <Footer ref={footerRef} />
    </div>
  );
}
