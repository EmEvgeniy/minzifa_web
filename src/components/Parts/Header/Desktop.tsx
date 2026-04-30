'use client';

import { LangBtn } from '../../UI';
import { NavWrapper } from './NavWrapper';
import { Nav } from './Nav';
import { useTranslations } from 'next-intl';
import { NavItemType } from './_types';
import Logo from '../../UI/Logo/Logo';
import Button from '@/components/UI/Button/Button';
import AuthHeader from '@/components/Auth/AuthHeader';
import { usePlanYourTripPopupStore } from '@/store/usePlanYourTripPopup';

export default function Desktop({ locale }: { locale: string }) {
  const t = useTranslations();
  const navItems = t.raw('navigation.nav') as NavItemType[];

  const { setPlanYourTripPopup } = usePlanYourTripPopupStore();

  const handleOpen = () => setPlanYourTripPopup(true);

  return (
    <header className="w-full sticky top-0 hidden bg-foreground/80 backdrop-blur-2xl z-50 md:block">
      <div className="container p-2.5 flex items-center justify-between">
        <NavWrapper>
          <Nav menu={navItems} locale={locale} />
        </NavWrapper>

        <Logo locale={locale} alt={'Minzifa Travel'} width={222} height={34} />

        <div className="flex flex-row items-center justify-end w-full">
          <Button
            className="text-sm font-semibold leading-100 text-white uppercase"
            color="link"
            onClick={handleOpen}
          >
            {t('common.plan_trip')}
          </Button>
          <LangBtn />
          <AuthHeader />
        </div>
      </div>
    </header>
  );
}
