import Desctop from './Desctop';
import { Mobile } from './Mobile';
import { DefaultComponentsProps } from '@/types';

export default async function TopNav({ locale }: DefaultComponentsProps) {
  return (
    <div className="w-full">
      <Desctop locale={locale} />
      <Mobile />
    </div>
  );
}
