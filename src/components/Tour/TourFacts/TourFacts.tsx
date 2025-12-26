'use client';

import { Facts } from '../_types';
import IconCalendar from '@/assets/icons/booking/calendar.svg';
import IconUser from '@/assets/icons/booking/user.svg';
import IconLocation from '@/assets/icons/booking/location.svg';
import AccomodationIcon from '@/assets/icons/booking/accomodation.svg';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { useTranslations } from 'next-intl';

export default function TourFacts({ facts, tour_type }: { facts: Facts; tour_type: string }) {
  const t = useTranslations('tourDetail');

  const factsContent: {
    icon: string;
    title: string;
    content: string;
  }[] = [
      {
        icon: IconCalendar,
        title: t('facts.duration'),
        content: t('facts.days', { days: facts.content.duration }),
      },
      {
        icon: IconUser,
        title: tour_type === 'group' ? t('facts.group_size') : t('facts.private_size'),
        content: facts.content.group_size,
      },
      {
        icon: AccomodationIcon,
        title: t('facts.hotels'),
        content: facts.content.hotels,
      },
      {
        icon: IconLocation,
        title: t('facts.transport'),
        content: facts.content.transport,
      },
    ];

  if (!facts || !facts.title) return null;

  return (
    <div className="flex flex-col items-start justify-start md:col-start-1">
      {facts?.title && <h2 className="text-2xl font-semibold mb-4">{facts?.title}</h2>}
      <div className="grid grid-cols-4 gap-4 w-full max-[1150px]:grid-cols-3 max-[920px]:grid-cols-2">
        {factsContent.map((el, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-[0_0_4px_0.25] p-2.5 w-full h-full flex flex-col gap-1"
          >
            <div className="bg-[#CFDFD9] p-1.5 rounded-[8px] self-start mb-2 w-[34px] h-[34px] flex items-center justify-center">
              <ImageWithFallback
                src={el.icon}
                alt="facts_img"
                width={24}
                height={24}
                loading="lazy"
                className="h-auto w-auto"
              />
            </div>
            <p className="text-lg font-semibold">{el.title}</p>
            <p className="text-sm text-[#9b9b9b]">{el.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
