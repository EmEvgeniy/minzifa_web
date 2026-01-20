'use client';

import React, { useRef, useEffect } from 'react';

interface EditableTextProps {
    value: string;
    onChange: (value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
    onPaste?: (e: React.ClipboardEvent<HTMLElement>) => void;
    className?: string;
    placeholder?: string;
    tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
}

/**
 * A safe wrapper for contentEditable that prevents cursor jumping
 * by only updating the DOM when the external value truly changes.
 */
export const EditableText = ({
    value,
    onChange,
    onKeyDown,
    onPaste,
    className = '',
    placeholder = '',
    tagName: Tag = 'div'
}: EditableTextProps) => {
    const elementRef = useRef<HTMLElement>(null);

    // Update DOM only if it differs from the value prop
    // This prevents cursor reset/jumping
    useEffect(() => {
        if (elementRef.current && elementRef.current.innerHTML !== value) {
            elementRef.current.innerHTML = value;
        }
    }, [value, Tag]);

    const handleInput = (e: React.FormEvent<HTMLElement>) => {
        const newValue = e.currentTarget.innerHTML;
        if (newValue !== value) {
            onChange(newValue);
        }
    };

    const handlePasteInternal = (e: React.ClipboardEvent<HTMLElement>) => {
        if (onPaste) {
            onPaste(e);
        } else {
            // Default simple cleaning if no custom onPaste is provided
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain');
            document.execCommand('insertText', false, text);
        }
    };

    return (
        <Tag
            ref={elementRef as any}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            onKeyDown={onKeyDown}
            onPaste={handlePasteInternal}
            className={`outline-none transition-all ${className} ${!value || value === '<br>' ? 'empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400' : ''}`}
            data-placeholder={placeholder}
        />
    );
};
