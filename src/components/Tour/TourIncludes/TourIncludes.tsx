'use client';

import {
  CustomAccordion,
  CustomAccordionDetails,
  CustomAccordionSummary,
} from '@/components/UI/CustomAccordion/CustomAccordion';
import { Include } from '../_types';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import AccomodationIcon from '../../../assets/icons/includes_icons/Accomodation.svg';
import MealsIcon from '../../../assets/icons/includes_icons/Meals.svg';
import TrasfersIcon from '../../../assets/icons/includes_icons/Car.svg';
import TicketIcon from '../../../assets/icons/includes_icons/Ticket.svg';
import GuideIcon from '../../../assets/icons/includes_icons/Guide.svg';
import AdditionalIcon from '../../../assets/icons/includes_icons/Add_ring_light.svg';

import ExcludeIcon from '../../../assets/icons/includes_icons/exclude.svg';
import Image from 'next/image';

const icons: { [key: string]: string } = {
  accommodation: AccomodationIcon,
  meals: MealsIcon,
  transfer: TrasfersIcon,
  tickets: TicketIcon,
  guide: GuideIcon,
  additional_service: AdditionalIcon,
  visa: ExcludeIcon,
  airway_tickets: TicketIcon,
  'off-plan meals': MealsIcon,
  insurance: '',
  personal_expenses: '',
  exclude: ExcludeIcon,
};

export const TourIncludes = ({ includes }: { includes: Include[] | undefined }) => {
  const t = useTranslations('Tour');

  const [includeAccordionIndexes, setIncludeAccordionIndexes] = useState<number[] | undefined>([]);
  const [excludeAccordionIndexes, setExcludeAccordionIndexes] = useState<number[] | undefined>([]);

  const includeItems = includes?.filter((item) => item.type === 'include');
  const excludeItems = includes?.filter((item) => item.type === 'exclude');

  useEffect(() => {
    setIncludeAccordionIndexes(Array.from({ length: includeItems?.length || 0 }, (_, i) => i));
    setExcludeAccordionIndexes(Array.from({ length: excludeItems?.length || 0 }, (_, i) => i));
  }, [includes, includeItems?.length, excludeItems?.length]);

  if (!includes) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 col-start-1  ">
      <h2 className="text-4xl font-semibold text-black max-[920px]:text-[30px] max-[550px]:text-[24px]">
        {t('includes.title')}
      </h2>
      {[includeItems, excludeItems].map((item, index) => (
        <div className="bg-white rounded-2xl" key={index}>
          <h2 className="text-2xl font-semibold text-black p-5 max-[920px]:text-[30px] max-[550px]:text-[20px]">
            {index === 0 ? t('includes.include') : t('includes.exclude')}
          </h2>
          <CustomAccordion
            expandedIndexes={index === 0 ? includeAccordionIndexes : excludeAccordionIndexes}
            onExpandedIndexesChange={
              index === 0 ? setIncludeAccordionIndexes : setExcludeAccordionIndexes
            }
          >
            {item?.map((include) => (
              <div key={include.id}>
                <CustomAccordionSummary className="rounded-none">
                  <div className="flex flex-row gap-3 items-center text-base font-semibold">
                    <Image
                      width={28}
                      height={28}
                      alt={include.service}
                      src={index === 0 ? icons[include.category] : icons.exclude}
                    />
                    {t(`includes.categories.${include.category}`)}
                  </div>
                </CustomAccordionSummary>
                <CustomAccordionDetails>
                  <div className="pl-10 text-base">{include.service}</div>
                </CustomAccordionDetails>
              </div>
            ))}
          </CustomAccordion>
        </div>
      ))}
      <div className="bg-[#E2FFF4] p-5 rounded-2xl flex flex-row gap-2.5 items-center text-lg max-[920px]:text-[12px] max-[550px]:p-2.5 max-[550px]:text-[12px]">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.9909 24.3666C20.3303 24.3666 24.7374 19.9595 24.7374 14.6296C24.7374 9.29966 20.3209 4.89258 14.9815 4.89258C9.65158 4.89258 5.25391 9.29966 5.25391 14.6296C5.25391 19.9595 9.66099 24.3666 14.9909 24.3666ZM14.9909 22.4268C10.6686 22.4268 7.21261 18.9519 7.21261 14.6296C7.21261 10.3073 10.6686 6.84187 14.9815 6.84187C19.3039 6.84187 22.7787 10.3073 22.7881 14.6296C22.7975 18.9519 19.3133 22.4268 14.9909 22.4268ZM14.9815 16.1928C15.4994 16.1928 15.8008 15.9009 15.8102 15.3547L15.9515 10.8252C15.9703 10.2696 15.5559 9.86468 14.9721 9.86468C14.3883 9.86468 13.9833 10.2602 14.0022 10.8158L14.134 15.3547C14.1528 15.8915 14.4542 16.1928 14.9815 16.1928ZM14.9815 19.3192C15.5936 19.3192 16.0927 18.8766 16.0927 18.2739C16.0927 17.6807 15.603 17.2381 14.9815 17.2381C14.3694 17.2381 13.8703 17.6807 13.8703 18.2739C13.8703 18.8672 14.3788 19.3192 14.9815 19.3192Z"
            fill="#111111"
          />
        </svg>
        <span>{t('includes.hint')}</span>
      </div>
    </div>
  );
};
