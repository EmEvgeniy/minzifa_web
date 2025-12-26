'use client';
import Accordion from '@/components/UI/Accordion';
import { Checkbox } from '@/components/UI/Form';
import { useFilterStore } from '@/store';
import { useTranslations } from 'next-intl';

function FilterSeasons() {
  const t = useTranslations('allTours');
  const { seasons, setSeasons } = useFilterStore();

  const seasonData = t.raw('seasons') as { title: string; value: string }[];

  return (
    <Accordion title={t('filterSeasonTitle')}>
      <div className="flex flex-col gap-2.5">
        {seasonData?.map((el) => (
          <Checkbox
            key={el.value}
            label={el.title}
            checked={seasons.includes(el.value)}
            onChange={() => setSeasons(el.value)}
          />
        ))}
      </div>
    </Accordion>
  );
}

export default FilterSeasons;
