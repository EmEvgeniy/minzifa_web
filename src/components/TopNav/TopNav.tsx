'use client';

import { useLocale } from 'next-intl';
import Desktop from './Desktop';
import Mobile from './Mobile';

export default function TopNav() {
  const locale = useLocale();

  return (
    <div className="w-full">
      <Desktop locale={locale} />
      <Mobile locale={locale} />
    </div>
  );
}
