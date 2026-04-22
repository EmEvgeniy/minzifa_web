'use client';

import { useAuthStore } from "@/store";
import { useLocale, useTranslations } from "next-intl";
import Button from "../UI/Button/Button";
import { RiUserLine } from "react-icons/ri";
import { Dropdown, DropdownDetails, DropdownSummary } from "../UI/Dropdown/Dropdown";
import { useSnackStore } from "@/store/useSnackStore";
import { useRouter } from "next/navigation";

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
]

export default function AuthHeader() {
    const locale = useLocale();
    const t = useTranslations();
    const router = useRouter();

    const { user, logout } = useAuthStore();
    const { setMessage } = useSnackStore();

    const handleLogout = async () => {
        await logout(() => {
            setMessage(t('auth.logout.success'));
            router.push(`/${locale}/`);
        });
    };
    return (
        <Dropdown>
            <DropdownSummary>
                <Button
                    className={"flex items-center text-sm truncate gap-2 bg-[#16372D] text-white px-5 py-2.5 rounded-lg hover:bg-[#0f2921] transition-colors"}
                >
                    <RiUserLine size={20} />
                    {user?.name}
                </Button>
            </DropdownSummary>
            <DropdownDetails>
                {menu.map((item) => (
                    <Button
                        key={item.title}
                        to={`/${locale}/${item.href}`}
                        color="link"
                    >
                        {t(item.title)}
                    </Button>
                ))}
                <Button
                    color="link"
                    onClick={handleLogout}
                    className="w-full"
                >
                    {t('auth.nav.logout')}
                </Button>
            </DropdownDetails>
        </Dropdown>
    )
}
