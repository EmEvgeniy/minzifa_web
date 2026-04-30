'use client';

import { useTranslations } from 'next-intl';
import Button from '@/components/UI/Button/Button';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';

import Image from '../../../../public/home/mountain.jpg';
import { cn } from '@/utils';
import { useAuthStore } from '@/store';

export default function NewsletterCTA() {
  const t = useTranslations('home.newsletterCTA');

  const { setAuthPopup } = useAuthStore();

  const handleSubscribe = () => {
    setAuthPopup(true);
    
  };

  // TODO: Добавить логику промокодов

  return (
    <section className="container px-2.5 mb-[70px] md:mb-[112px]">
      <div className="p-[32px] [@media(max-width:768px)]:py-[40px] bg-[#022B1B14] rounded-2xl md:rounded-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text and Form */}
          <div className={cn('order-2 flex flex-col items-start gap-4', 'md:order-1 md:gap-8')}>
            <h2 className="font-title text-[42px] font-extrabold [@media(max-width:768px)]:text-[24px] text-[#16372D] leading-[130%] max-w-[550px]">
              {t('title')}
            </h2>

            <p
              className={cn(
                'text-base text-foreground leading-[130%] tracking-normal',
                'md:text-[20px]',
              )}
            >
              {t('description')}
            </p>

            <Button
              type="submit"
              color="primary"
              className="w-full md:w-auto"
              onClick={handleSubscribe}
            >
              {t('button')}
            </Button>
          </div>

          {/* Right side - Image */}
          <ImageWithFallback
            src={Image}
            alt="Mountain landscape"
            className="order-1 md:order-2 max-h-[230px] lg:max-w-[656px] lg:max-h-[436px] rounded-2xl object-contain"
          />
        </div>
      </div>
    </section>
  );
}
