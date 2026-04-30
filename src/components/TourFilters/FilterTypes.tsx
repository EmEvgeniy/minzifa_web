'use client';

import Accordion from '@/components/UI/Accordion';
import { useFilterStore } from '@/store';
import { Checkbox } from '../UI/Form';
import { useTranslations } from 'next-intl';
import { TourType } from '../Tours/MainSection/_types';

function FilterTypes({ initTourTypes }: { initTourTypes?: TourType[] }) {
  const t = useTranslations('allTours');
  const { tourTypes, setTourTypes } = useFilterStore();

  return (
    <Accordion title={t('filterTourTypeTitle')}>
      <div className="flex flex-col gap-2.5 max-h-[300px] overflow-y-auto">
        {initTourTypes &&
          initTourTypes?.map((el) => (
            <Checkbox
              key={el.id}
              label={el.name}
              checked={tourTypes.includes(el.name)}
              onChange={() => setTourTypes(el.name)}
              withBadge
              badge={(el.tours_count ?? 0).toString()}
            />
          ))}
      </div>
    </Accordion>
  );
}

export default FilterTypes;
