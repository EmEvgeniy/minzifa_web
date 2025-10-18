'use client';

import { useFilterStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Dropdown } from '@/components/UI/Dropdown/Dropdown';

export default function TourViewBtn({ className }: { className?: string }) {
  const t = useTranslations('all_tours');

  const menu = t.raw('sort') as { title: string; value: string | undefined }[];

  const { sort, setSort, buildFilterQuery } = useFilterStore((state) => state);
  const router = useRouter();

  const handleSelect = (value: string | undefined) => {
    setSort(value as string);
    router.replace(`?${buildFilterQuery().toString()}`, { scroll: false });
  };

  return (
    <Dropdown
      options={menu}
      value={sort}
      placeholder={menu.find((el) => el.value === sort)?.title || menu[0].title}
      onChange={(value) => handleSelect(value as string)}
      className={className}
      detailsClassName="min-w-[200px] max-w-[400px] right-0 left-auto"
      labelKey="title"
      valueKey="value"
    />
  );
}
