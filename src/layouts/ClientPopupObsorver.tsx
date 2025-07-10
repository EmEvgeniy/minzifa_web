'use client';

import { useEffect, useRef } from 'react';

import { useSelectedLayoutSegments, usePathname } from 'next/navigation';
import { CreateYourTripForm } from '@/components/UI/CreateYourTripForm/CreateYourTripForm';
import { ConsultationQuiz } from '@/components/UI/ConsultationQuiz/ConsultationQuiz';
import { Popup } from '@/components';
import { useLayoutStore } from './layoutStote';
import { DefaultComponentsProps } from '@/types';

const STORAGE_KEY = 'minzifa_popup_shown_paths';

export default function ClientPopupObserver({ locale }: DefaultComponentsProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const { open, setOpen } = useLayoutStore((s) => s);

  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();

  const wasShown = () => {
    if (typeof window === 'undefined') return false;

    const shownPaths = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return shownPaths.includes(pathname);
  };

  const markAsShown = () => {
    const shownPaths = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!shownPaths.includes(pathname)) {
      shownPaths.push(pathname);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shownPaths));
    }
  };

  const tryShowPopup = () => {
    if (!wasShown()) {
      setOpen(true);
      markAsShown();
    }
  };

  // Таймер на 15 секунд
  useEffect(() => {
    const timer = setTimeout(() => {
      tryShowPopup();
    }, 15000);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Обсервер на футер
  useEffect(() => {
    if (wasShown()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryShowPopup();
        }
      },
      { threshold: 0.4 },
    );

    const target = footerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [pathname]);

  if (segments?.includes('(tour)')) return null;

  return (
    <>
      <div ref={footerRef} />
      <Popup
        open={open}
        handleClose={() => setOpen(false)}
        content={
          locale === 'en' ? (
            <CreateYourTripForm locale={locale} popupClose={() => setOpen(false)} />
          ) : (
            <ConsultationQuiz popupClose={() => setOpen(false)} />
          )
        }
        maxWidth="md"
      />
    </>
  );
}
