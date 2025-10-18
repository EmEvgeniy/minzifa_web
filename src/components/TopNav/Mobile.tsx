import { LangBtn } from '../UI';
import { MobileHeader } from './MobileHeader';
import Logo from '../UI/Logo/Logo';

export default function Mobile({ locale }: { locale: string }) {
  return (
    <header className="bg-[#16372D] fixed top-0 w-full hidden [@media(max-width:1024px)]:flex py-2 container  items-center justify-between z-50">
      <Logo locale={locale} className="w-[140]" />
      <div className="flex items-center justify-end gap-1">
        <LangBtn />
        <MobileHeader />
      </div>
    </header>
  );
}
