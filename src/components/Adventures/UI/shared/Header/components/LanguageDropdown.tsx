import { usePathname, useRouter, useParams } from 'next/navigation';
import Dropdown from './Dropdown';

export default function LanguageDropdown() {
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();
    const currentLocale = (params?.locale as string) || 'en';

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'de', label: 'Deutsch' },
    ];

    const handleLanguageChange = (newLocale: string) => {
        if (!pathname) return;

        // Split pathname segments
        const segments = pathname.split('/');
        // Assuming structure is /[locale]/... so locale is at index 1 (starts with /)
        if (segments.length > 1) {
            segments[1] = newLocale;
        } else {
            // Fallback if at root? usually /[locale] is root
            segments.splice(1, 0, newLocale);
        }

        const newPath = segments.join('/');
        router.push(newPath);
    };

    const currentLangCode = currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1);

    return (
        <Dropdown
            trigger={
                <span className="flex items-center gap-1.5 cursor-pointer text-sm">
                    <span>{currentLangCode}</span>
                </span>
            }
            align="right"
        >
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors cursor-pointer ${currentLocale === lang.code ? 'text-foreground font-medium' : 'text-text'
                        }`}
                >
                    {lang.label}
                </button>
            ))}
        </Dropdown>
    );
}
