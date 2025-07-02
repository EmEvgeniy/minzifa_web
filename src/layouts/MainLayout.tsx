'use client';
import { Footer } from '@/components/Footer';
import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { useLayoutStore } from './layoutStote';
import { Popup } from '@/components';
import { useLocale } from 'next-intl';
import { CreateYourTripForm } from '@/components/UI/CreateYourTripForm/CreateYourTripForm';
import { ConsultationQuiz } from '@/components/UI/ConsultationQuiz/ConsultationQuiz';

type MainLayoutType = {
  children: ReactNode;
};

export const MainLayout: FC<MainLayoutType> = ({ children }) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const { open, setOpen, setOneOpen, oneOpened } = useLayoutStore((state) => state);
  const locale = useLocale();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className="flex-1">{children}</main>
      <Popup
        open={open}
        handleClose={() => setOpen(false)}
        content={
          <>
            {locale === 'en' ? (
              <CreateYourTripForm popupClose={() => setOpen(false)} />
            ) : (
              <ConsultationQuiz popupClose={() => setOpen(false)} />
            )}
          </>
        }
        maxWidth="md"
      />
      <Footer ref={footerRef} />
    </>
  );
};
