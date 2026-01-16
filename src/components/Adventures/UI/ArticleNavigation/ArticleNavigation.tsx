'use client';

import { useEffect, useState } from 'react';

interface Section {
    id: string;
    title: string;
}

interface ArticleNavigationProps {
    sections: Section[];
    className?: string;
}

export default function ArticleNavigation({ sections, className = '' }: ArticleNavigationProps) {
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const handleScroll = () => {
            const sectionElements = sections.map((section) => ({
                id: section.id,
                element: document.getElementById(section.id),
            }));

            for (const { id, element } of sectionElements) {
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    if (sections.length === 0) return null;

    return (
        <nav className={`${className}`}>
            <h4 className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-4">
                In this article
            </h4>
            <ul className="space-y-2">
                {sections.map((section) => (
                    <li key={section.id}>
                        <button
                            onClick={() => scrollToSection(section.id)}
                            className={`text-left text-sm transition-colors cursor-pointer ${activeSection === section.id
                                    ? 'text-foreground font-medium'
                                    : 'text-text-secondary hover:text-text'
                                }`}
                        >
                            {section.title}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
