import type { MetadataRoute } from 'next'

const SITENAME = "https://minzifatravel.com";
const LOCALES: ("en" | "ru")[] = ['en', 'ru'];

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: SITENAME,
            lastModified: new Date(),
            alternates: {
                languages: {
                    en: `${SITENAME}/${LOCALES[0]}`,
                    ru: `${SITENAME}/${LOCALES[1]}`,
                },
            },
        },
    ]
}