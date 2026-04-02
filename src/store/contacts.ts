import { SocialMediaIcon } from "@/components/UI/SocialMedia/_types";
import { FaYandex } from "react-icons/fa";
import {
    FaInstagram,
    FaFacebookF,
    FaPinterest,
    FaWhatsapp,
    FaTelegram,
    FaEnvelope,
    FaYoutube,
    FaLinkedin,
    FaReddit,
    FaVk,
    FaOdnoklassniki, FaXTwitter,
} from 'react-icons/fa6';

type ContactProps = {
    email: {
        [key: string]: {
            name: string;
            url: string;
        };
    };
    phone: {
        [key: string]: {
            name: string;
            url: string;
        };
    };
    address: {
        [key: string]: string;
    };
    social_media: SocialMediaIcon[];
}

export const contacts: ContactProps = {
    email: {
        en: {
            name: 'booking@minzifatravel.com',
            url: 'mailto:booking@minzifatravel.com',
        },
        ru: {
            name: 'booking@minzifatravel.com',
            url: 'mailto:booking@minzifatravel.com',
        }
    },
    phone: {
        en: {
            name: '+998 93 654 16 53',
            url: 'tel:+998936541653',
        },
        ru: {
            name: '+7 931 107 38 01',
            url: 'tel:+79311073801',
        },
    },
    address: {
        en: '53, Eshoni Pir Str., Bukhara, Uzbekistan',
        ru: 'Узбекистан, г. Бухара, ул. Эшони Пир, д. 53',
    },
    social_media: [
        {
            name: 'Facebook',
            url: {
                en: 'https://www.facebook.com/MinzifaTravel',
                ru: 'https://www.facebook.com/uniqueuzb',
            },
            Icon: FaFacebookF,
        },
        {
            name: 'Instagram',
            url: {
                en: 'https://www.instagram.com/minzifatravelcom/',
                ru: 'https://www.instagram.com/minzifa_travel',
            },
            Icon: FaInstagram,
        },
        {
            name: 'Pinterest',
            url: {
                en: 'https://www.pinterest.com/minzifa_travel',
                ru: 'https://www.pinterest.com/minzifa_travel',
            },
            Icon: FaPinterest,
        },
        {
            name: 'Telegram',
            url: {
                en: '',
                ru: 'https://t.me/minzifatravel_chanel',
            },
            Icon: FaTelegram,
        },
        {
            name: 'WhatsApp',
            url: {
                en: 'https://wa.me/998912444720',
                ru: 'https://wa.me/998912444721',
            },
            Icon: FaWhatsapp,
        },
        {
            name: 'Mail',
            url: {
                en: 'mailto:booking@minzifatravel.com',
                ru: 'mailto:booking@minzifatravel.com',
            },
            Icon: FaEnvelope,
        },
        {
            name: 'Youtube',
            url: {
                en: 'https://www.youtube.com/@minzifatravel-en',
                ru: 'https://www.youtube.com/@minzifatravel-ru',
            },
            Icon: FaYoutube,
        },
        {
            name: 'Reddit',
            url: {
                en: 'https://www.reddit.com/user/MinzifaTravelCom/',
                ru: '',
            },
            Icon: FaReddit,
        },
        {
            name: 'LinkedIn',
            url: {
                en: 'https://uz.linkedin.com/company/minzifatravel',
                ru: '',
            },
            Icon: FaLinkedin,
        },
        {
            name: 'X',
            url: {
                en: 'https://x.com/MinzifaTravel',
                ru: 'https://x.com/MinzifaTravelRu',
            },
            Icon: FaXTwitter,
        },
        {
            name: 'VK',
            url: {
                en: '',
                ru: 'https://vk.com/minzifa_travel',
            },
            Icon: FaVk,
        },
        {
            name: 'OK',
            url: {
                en: '',
                ru: 'https://ok.ru/minzifatravel1',
            },
            Icon: FaOdnoklassniki,
        },
        {
            name: 'Dzen',
            url: {
                en: '',
                ru: 'https://dzen.ru/minzifatravel',
            },
            Icon: FaYandex,
        }
    ]
}