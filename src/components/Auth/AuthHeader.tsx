'use client';

import { useAuthStore } from "@/store";
import { useLocale, useTranslations } from "next-intl";
import Button from "../UI/Button/Button";
import { RiUserLine } from "react-icons/ri";
import { Dropdown, DropdownDetails, DropdownSummary } from "../UI/Dropdown/Dropdown";
import { useSnackStore } from "@/store/useSnackStore";
import { getCsrfToken } from "@/api/get.api";
import { usePostMutation } from "@/api";

const menu = [
    {
        title: 'auth.nav.dashboard',
        href: '/dashboard',
    },
    {
        title: 'auth.nav.profile',
        href: '/profile',
    },
    {
        title: 'auth.nav.orders',
        href: '/orders',
    },
    {
        title: 'auth.nav.chats',
        href: '/chats',
    },
    {
        title: 'auth.nav.logout',
        href: '/logout',
    },
]

export default function AuthHeader() {
    const locale = useLocale();
    const t = useTranslations();

    const { user, setUser, setIsAuthenticated } = useAuthStore();
    const { setMessage, setError } = useSnackStore();

    const { mutate } = usePostMutation(
        ['auth.logout'],
        async () => {
            setUser(null);
            setIsAuthenticated(false);
            setMessage(t('auth.logout.success'));
        },
        (error) => {
            console.error(error);
            setError(t('auth.logout.error'));
        },
    )

    const logout = async () => {
        await getCsrfToken();
        await mutate({
            obj: {},
            endpoint: 'auth/logout'
        });
    };

    return (
        <Dropdown>
            <DropdownSummary>
                <Button
                    className={"flex items-center gap-2 bg-[#16372D] text-white px-5 py-2.5 rounded-lg hover:bg-[#0f2921] transition-colors"}
                >
                    <RiUserLine size={20} />
                    {user?.name}
                </Button>
            </DropdownSummary>
            <DropdownDetails >
                {menu.map((item) => (
                    <Button
                        key={item.title}
                        to={`/${locale}/${item.href}`}
                        color="link"
                    >
                        {t(item.title)}
                    </Button>
                ))}
            </DropdownDetails>
        </Dropdown>
    )
}
