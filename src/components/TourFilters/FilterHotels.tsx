'use client';

import Accordion from '@/components/UI/Accordion';
import { useFilterStore } from '@/store';
import { Checkbox } from '../UI/Form';
import { useTranslations } from 'next-intl';

function FilterHotels() {
  const t = useTranslations('all_tours');
  const { hotels, setHotels } = useFilterStore();

  const hotelData = t.raw('hotels') as { title: string; value: string }[];

  return (
    <Accordion title={t('filter_accomodation_title')}>
      <div className="flex flex-col gap-2.5">
        {hotelData.map((el) => (
          <Checkbox
            key={el.value}
            label={el.title}
            checked={hotels.includes(el.value)}
            onChange={() => setHotels(el.value)}
          />
        ))}
      </div>
    </Accordion>
  );
}

export default FilterHotels;
