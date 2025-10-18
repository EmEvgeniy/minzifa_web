'use client';

import { useMemo, useState } from 'react';
import useDebouncedValue from '@/hooks/useDebouncedValue';
import { FaSearch } from 'react-icons/fa';
import { useFilterStore } from '@/store';
import Accordion from '@/components/UI/Accordion';
import { Checkbox, Input } from '../UI/Form';
import { useTranslations } from 'next-intl';
import { DestinationCard } from '../Home/Destinations/_types';

function FilterDestinations({ initDestinations }: { initDestinations?: DestinationCard[] }) {
  const t = useTranslations('all_tours');

  const { destinations, setDestinations } = useFilterStore();
  const [searchDestination, setSearchDestination] = useState('');

  const filteredDestinations = useMemo(() => {
    return Array.isArray(initDestinations)
      ? initDestinations.filter(
          (el) =>
            el.name.toLowerCase().includes(searchDestination.toLowerCase()) && el.tours_count > 0,
        )
      : [];
  }, [initDestinations, searchDestination]);

  const debouncedDestinations = useDebouncedValue(filteredDestinations, 300);

  return (
    <Accordion title={t('filter_destination_title')}>
      <div className="w-full space-y-4">
        <Input
          startIcon={<FaSearch className="w-4 h-4 text-gray-400" />}
          value={searchDestination}
          onChange={(e) => setSearchDestination(e.target.value)}
          placeholder={t('find_destination')}
          fullWidth
        />

        <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[300px]">
          {debouncedDestinations?.map((el) => (
            <Checkbox
              key={el.id}
              label={el.name}
              withBadge
              badge={el.tours_count.toString()}
              checked={destinations.includes(el?.name)}
              onChange={() => setDestinations(el?.name)}
            />
          ))}
        </div>
      </div>
    </Accordion>
  );
}

export default FilterDestinations;
