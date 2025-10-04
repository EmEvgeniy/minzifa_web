import Desktop from './Desktop';
import Mobile from './Mobile';
import { DefaultComponentsProps } from '@/types';

export default async function TopNav({ locale }: DefaultComponentsProps) {
  return (
    <div className="w-full">
      <Desktop locale={locale} />
      <Mobile locale={locale} />
    </div>
  );
}
