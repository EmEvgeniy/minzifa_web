import { LangBtn } from '../../UI';
import { MobileHeader } from './MobileHeader';
import Logo from '../../UI/Logo/Logo';
import AuthHeader from '@/components/Auth/AuthHeader';

export default function Mobile({ locale }: { locale: string }) {
  return (
    <header className="w-full sticky top-0 bg-foreground/80 backdrop-blur-2xl z-50 block lg:hidden">
      <div className="container p-2.5 flex items-center justify-between w-full">
        <MobileHeader />
        <Logo locale={locale} alt={'Minzifa Travel'} className="max-h-[30px] flex-1" />
        <LangBtn />
        <AuthHeader />
      </div>
    </header>
  );
}
