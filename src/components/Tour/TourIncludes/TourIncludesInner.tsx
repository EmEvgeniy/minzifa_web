'use client';
import {
  CustomAccordion,
  CustomAccordionDetails,
  CustomAccordionSummary,
} from '@/components/UI/CustomAccordion/CustomAccordion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Include } from '../_types';
import AccomodationIcon from '@/assets/icons/includes_icons/Accomodation.svg';
import MealsIcon from '@/assets/icons/includes_icons/Meals.svg';
import TrasfersIcon from '@/assets/icons/includes_icons/Car.svg';
import TicketIcon from '@/assets/icons/includes_icons/Ticket.svg';
import GuideIcon from '@/assets/icons/includes_icons/Guide.svg';
import AdditionalIcon from '@/assets/icons/includes_icons/Add_ring_light.svg';
import ExcludeIcon from '@/assets/icons/includes_icons/exclude.svg';

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

function TourIncludesInner({
  includes,
  pl,
  pl2,
  pl3,
}: {
  includes: Include[] | undefined;
  pl: string;
  pl2: string;
  pl3: {
    accommodation: string;
    meals: string;
    transfer: string;
    tickets: string;
    guide: string;
    additional_service: string;
    airway_tickets: string;
    'off-plan meals': string;
    visa: string;
    insurance: string;
    personal_expenses: string;
  };
}) {
  const [includeAccordionIndexes, setIncludeAccordionIndexes] = useState<number[] | undefined>([]);
  const [excludeAccordionIndexes, setExcludeAccordionIndexes] = useState<number[] | undefined>([]);

  const includeItems = includes?.filter((item) => item.type === 'include');
  const excludeItems = includes?.filter((item) => item.type === 'exclude');

  useEffect(() => {
    setIncludeAccordionIndexes(Array.from({ length: includeItems?.length || 0 }, (_, i) => i));
    setExcludeAccordionIndexes(Array.from({ length: excludeItems?.length || 0 }, (_, i) => i));
  }, [includes, includeItems?.length, excludeItems?.length]);

  return (
    <>
      {[includeItems, excludeItems].map((items, index) => {
        if (!items || items.length === 0) return null;
        return (
          <div className="bg-white rounded-2xl" key={index}>
            <h2 className="text-2xl font-semibold text-black p-5 max-[920px]:text-[30px] max-[550px]:text-[20px]">
              {index === 0 ? pl : pl2}
            </h2>
            <CustomAccordion
              expandedIndexes={index === 0 ? includeAccordionIndexes : excludeAccordionIndexes}
              onExpandedIndexesChange={
                index === 0 ? setIncludeAccordionIndexes : setExcludeAccordionIndexes
              }
            >
              {items?.map((include) => {
                return (
                  <div key={include.id}>
                    <CustomAccordionSummary className="rounded-none">
                      <div className="flex flex-row gap-3 items-center text-base font-semibold">
                        <Image
                          width={28}
                          height={28}
                          alt={include.category}
                          src={index === 0 ? icons[include.category] : icons.exclude}
                          loading="lazy"
                        />
                        {pl3[include.category as keyof typeof pl3]}
                      </div>
                    </CustomAccordionSummary>
                    <CustomAccordionDetails className="max-w-[600px]">
                      <ul className="pl-10 text-base list-disc list-inside">
                        {include.service.split('\r\n').map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </CustomAccordionDetails>
                  </div>
                );
              })}
            </CustomAccordion>
          </div>
        );
      })}
    </>
  );
}

export default TourIncludesInner;
