'use client';

import { FiGlobe } from 'react-icons/fi';

interface Language {
    code: string;
    label: string;
}

const AVAILABLE_LANGUAGES: Language[] = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' }
];

interface LangSelectorProps {
    value: string;
    onChange: (code: string) => void;
    label?: string;
    className?: string;
}

export const LangSelector = ({ value, onChange, label = "Language", className = "" }: LangSelectorProps) => {
    return (
        <div className={`space-y-2 ${className}`}>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
                {label}
            </label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiGlobe className="w-4 h-4 text-slate-400 group-focus-within:text-[#3ca542] transition-colors" />
                </div>
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3ca542]/40 transition-all appearance-none cursor-pointer font-medium"
                >
                    {AVAILABLE_LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                            {lang.label} ({lang.code.toUpperCase()})
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};
