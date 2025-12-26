'use client';

import Accordion from '@/components/UI/Accordion';
import { useFilterStore } from '@/store';
import { Checkbox } from '../UI/Form';
import { useTranslations } from 'next-intl';

function FilterType() {
  const t = useTranslations('allTours');
  const { tourType, setTourType } = useFilterStore();

  const tourTypeData = t.raw('types') as { title: string; value: string }[];

  return (
    <Accordion title={t('filterTypeTitle')}>
      <div className="flex flex-col gap-2.5">
        {tourTypeData.map((el) => (
          <Checkbox
            key={el.value}
            label={el.title}
            checked={tourType.includes(el.value)}
            onChange={() => setTourType(el.value)}
          />
        ))}
      </div>
    </Accordion>
  );
}

export default FilterType;
