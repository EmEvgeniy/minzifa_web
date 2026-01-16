'use client';

import { FaXTwitter, FaLinkedinIn, FaFacebookF, FaPinterestP, FaLink } from 'react-icons/fa6';
import { useState, useEffect } from 'react';

interface SocialShareProps {
    url?: string;
    title?: string;
    vertical?: boolean;
    className?: string;
}

export default function SocialShare({
    url,
    title = '',
    vertical = true,
    className = ''
}: SocialShareProps) {
    const [currentUrl, setCurrentUrl] = useState(url || '');

    useEffect(() => {
        if (!url) {
            setCurrentUrl(window.location.href);
        }
    }, [url]);

    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: 'X',
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            icon: <FaXTwitter className="w-5 h-5" />,
        },
        {
            name: 'LinkedIn',
            href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
            icon: <FaLinkedinIn className="w-5 h-5" />,
        },
        {
            name: 'Facebook',
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            icon: <FaFacebookF className="w-5 h-5" />,
        },
        {
            name: 'Pinterest',
            href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
            icon: <FaPinterestP className="w-5 h-5" />,
        },
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            alert('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const buttonClass = "w-11 h-11 rounded-full bg-[#2D3A31] flex items-center justify-center text-white hover:bg-[#2D3A31]/90 transition-colors shadow-sm";

    return (
        <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} gap-4 ${className}`}>
            {shareLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass}
                    aria-label={`Share on ${link.name}`}
                >
                    {link.icon}
                </a>
            ))}
            <button
                onClick={copyToClipboard}
                className={buttonClass}
                aria-label="Copy link"
            >
                <FaLink className="w-5 h-5" />
            </button>
        </div>
    );
}
