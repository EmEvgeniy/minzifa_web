import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import Button from '@/components/UI/Button/Button';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import VerticalRewards from '../../../../public/VerticalAwardsBlack.svg';
import HorizontalRewards from '../../../../public/HorizontalAwardsBlack.svg';
import { cn } from '@/utils';

const iconPaths = ['/home/guide.svg', '/home/earth.svg', '/home/car.svg', '/home/safety.svg'];

export default async function WhyUs({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const features = [
    {
      title: t('whyUs.features.0.title'),
      description: t('whyUs.features.0.description'),
      icon: 0,
    },
    {
      title: t('whyUs.features.1.title'),
      description: t('whyUs.features.1.description'),
      icon: 1,
    },
    {
      title: t('whyUs.features.2.title'),
      description: t('whyUs.features.2.description'),
      icon: 2,
    },
    {
      title: t('whyUs.features.3.title'),
      description: t('whyUs.features.3.description'),
      icon: 3,
    },
  ];

  return (
    <section className="container p-0 md:px-2.5 mb-[70px] md:mb-[112px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-foreground/8 px-2.5 py-12 md:px-[32px] md:py-[72px] md:rounded-5xl">
        {/* Left side */}
        <div className="flex flex-col items-start gap-6">
          <h2 className="font-title font-bold text-[24px] md:text-[32px] text-foreground leading-100">
            {t('whyUs.title')}
          </h2>

          <p className="text-base md:text-[20px] text-foreground leading-[130%]">
            {t('whyUs.subtitle')}
          </p>

          {/* TravelChoice badges */}
          <ImageWithFallback
            src={VerticalRewards}
            alt="TravelChoice award"
            width={1920}
            height={1080}
            quality={100}
            className="self-center block md:hidden"
          />

          <ImageWithFallback
            src={HorizontalRewards}
            alt="TravelChoice award"
            width={1920}
            height={1080}
            quality={100}
            className="max-w-[600px] self-start hidden md:block"
          />

          <Button
            href="/about"
            color="bordered"
            className="hidden md:block px-6 py-3 min-w-[162px] text-base font-semibold rounded-5xl leading-100 tracking-zero"
          >
            {t('whyUs.aboutButton')}
          </Button>
        </div>

        <hr className="block md:hidden border-foreground/12" />

        {/* Right side - Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-row-reverse gap-4 md:flex-col md:gap-3">
              <Image
                src={iconPaths[feature.icon]}
                alt={feature.title}
                width={82}
                height={82}
                className="object-contain w-[82px] h-[82px]"
              />
              <div className="flex flex-col gap-2">
                <h3
                  className={cn(
                    'font-semibold text-[20px] italic text-foreground leading-100',
                    'md:text-[26px]',
                  )}
                >
                  {feature.title}
                </h3>
                <p
                  className={cn(
                    'text-sm font-normal text-content leading-100 tracking-zero',
                    'md:text-[18px] md:font-medium',
                  )}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button
          href="/about"
          color="bordered"
          className="w-full block md:hidden py-3 px-6 text-sm font-semibold leading-100 tracking-zero"
        >
          {t('whyUs.aboutButton')}
        </Button>
      </div>
    </section>
  );
}
