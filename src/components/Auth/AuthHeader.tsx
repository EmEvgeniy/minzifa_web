'use client';

import { useAuthStore } from '@/store';
import { useLocale, useTranslations } from 'next-intl';
import Button from '../UI/Button/Button';
import { Dropdown, DropdownDetails, DropdownSummary } from '../UI/Dropdown/Dropdown';
import { useSnackStore } from '@/store/useSnackStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import UserAvatar from './UserAvatar';

const menu = [
  {
    title: 'auth.nav.dashboard',
    href: 'dashboard',
  },
  {
    title: 'auth.nav.profile',
    href: 'profile',
  },
  {
    title: 'auth.nav.orders',
    href: 'orders',
  },
];

export default function AuthHeader() {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();

  const { isAuthenticated, user, logout, setAuthPopup } = useAuthStore();
  const { setMessage } = useSnackStore();

  const handleLogin = () => setAuthPopup(true);

  const handleLogout = async () => {
    await logout(() => {
      setMessage(t('auth.logout.success'));
      router.push(`/${locale}/`);
    });
  };

  return !isAuthenticated ? (
    <Button color="link" onClick={handleLogin} className="p-0">
      <Image src="/profile.svg" alt="Profile" width={42} height={42} />
    </Button>
  ) : (
    <Dropdown className="w-auto">
      <DropdownSummary>
        <Button color="link" className="p-0">
          <UserAvatar src={user?.avatar?.file as string} name={user?.name as string} />
        </Button>
      </DropdownSummary>
      <DropdownDetails position='right'>
        {menu.map((item) => (
          <Button key={item.title} to={`/${locale}/${item.href}`} color="link">
            {t(item.title)}
          </Button>
        ))}
        <Button color="link" onClick={handleLogout} className="w-full">
          {t('auth.nav.logout')}
        </Button>
      </DropdownDetails>
    </Dropdown>
  );
}
