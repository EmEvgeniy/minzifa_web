'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { CreateYourTripForm } from '@/components/UI/CreateYourTripForm/CreateYourTripForm';
import { ConsultationQuiz } from '@/components/UI/ConsultationQuiz/ConsultationQuiz';
import { Popup } from '@/components';
import { useLayoutStore } from './layoutStote';
import { DefaultComponentsProps } from '@/types';

export default function ClientPopupObserver({ locale }: DefaultComponentsProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const { open, setOpen, markAsShown, wasShown } = useLayoutStore((s) => s);

  // Показываем по таймеру, если ещё не было
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
      markAsShown(pathname);
    }, 15000);

    return () => clearTimeout(timer);
  }, [pathname, wasShown, markAsShown, setOpen]);

  // Показываем при достижении футера, если ещё не было
  useEffect(() => {
    if (wasShown(pathname)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasShown(pathname)) {
          setOpen(true);
          markAsShown(pathname);
        }
      },
      { threshold: 0.4 },
    );

    const target = footerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [pathname, wasShown, markAsShown, setOpen]);

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
