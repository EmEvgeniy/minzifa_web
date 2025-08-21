'use client';

import { useEffect, useRef } from 'react';
import { ConsultationQuiz } from '@/components/UI/ConsultationQuiz/ConsultationQuiz';
import { Popup } from '@/components';
import { useLayoutStore } from './layoutStore';
import { DefaultComponentsProps } from '@/types';
import EnForm from '@/components/UI/CreateYourTripForm/EnForm';
import { useParams, usePathname } from 'next/navigation';

export default function ClientPopupObserver({ locale }: DefaultComponentsProps) {
  const footerRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const params = useParams();
  
  const isThankYouPage = pathname === `/${locale}/thank-you`;
  const isBookingPage = pathname === `/${locale}/booking/${params?.tour}`;

  const { open, setOpen, shownByTimer, shownByScroll, markShownByTimer, markShownByScroll } =
    useLayoutStore((s) => s);

  // Таймер: один раз за сессию
  useEffect(() => {
    if (shownByTimer) return;

    const timer = setTimeout(() => {
      setOpen(true);
      markShownByTimer();
    }, 15000);

    return () => clearTimeout(timer);
  }, [shownByTimer, setOpen, markShownByTimer]);

  // Скролл до футера: один раз за сессию
  useEffect(() => {
    if (shownByScroll) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true);
          markShownByScroll();
        }
      },
      { threshold: 0.4 },
    );

    const target = footerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [shownByScroll, setOpen, markShownByScroll]);

  return (!isThankYouPage && !isBookingPage) && (
    <>
      <div ref={footerRef} />
      <Popup
        open={open}
        locale={locale}
        handleClose={() => setOpen(false)}
        content={
          locale === 'en' ? (
            <EnForm popupClose={() => setOpen(false)} />
          ) : (
            <ConsultationQuiz popupClose={() => setOpen(false)} />
          )
        }
        maxWidth="md"
      />
    </>
  );
}
