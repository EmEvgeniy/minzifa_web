'use client';

import { useState, useEffect, useRef } from 'react';
import { FiBold, FiItalic, FiLink, FiCheck, FiX } from 'react-icons/fi';

interface InlineFormattingProps {
    isActive: boolean;
}

export const InlineFormatting = ({ isActive }: InlineFormattingProps) => {
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const savedRangeRef = useRef<Range | null>(null);

    // Reset state when not active
    useEffect(() => {
        if (!isActive) {
            setShowLinkInput(false);
            setLinkUrl('');
            savedRangeRef.current = null;
        }
    }, [isActive]);

    // Focus input when shown
    useEffect(() => {
        if (showLinkInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showLinkInput]);

    if (!isActive) return null;

    const saveSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            savedRangeRef.current = selection.getRangeAt(0);
        }
    };

    const restoreSelection = () => {
        if (savedRangeRef.current) {
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(savedRangeRef.current);
            }
        }
    };

    const handleFormat = (command: string, value?: string) => {
        document.execCommand(command, false, value);
    };

    const handleLinkSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (linkUrl) {
            restoreSelection();
            handleFormat('createLink', linkUrl);
            setShowLinkInput(false);
            setLinkUrl('');
            savedRangeRef.current = null;
        }
    };

    const cancelLink = () => {
        // Restore selection even on cancel so user is back in text
        restoreSelection();
        setShowLinkInput(false);
        setLinkUrl('');
        savedRangeRef.current = null;
    };

    return (
        <div className="absolute -top-12 left-0 flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-lg shadow-xl animate-fade-in z-[120]">
            {!showLinkInput ? (
                <>
                    <button
                        type="button"
                        onMouseDown={(e) => { e.preventDefault(); handleFormat('bold'); }}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors"
                        title="Bold (Ctrl+B)"
                    >
                        <FiBold className="w-3.5 h-3.5" />
                    </button>
                    <button
                        type="button"
                        onMouseDown={(e) => { e.preventDefault(); handleFormat('italic'); }}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors"
                        title="Italic (Ctrl+I)"
                    >
                        <FiItalic className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-[1px] h-4 bg-slate-200 mx-0.5" />
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            saveSelection();
                            setShowLinkInput(true);
                        }}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors"
                        title="Add Link (Ctrl+K)"
                    >
                        <FiLink className="w-3.5 h-3.5" />
                    </button>
                </>
            ) : (
                <div className="flex items-center gap-1 p-0.5">
                    <input
                        ref={inputRef}
                        type="text"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-40 px-2 py-1 text-xs border border-slate-300 rounded outline-none focus:border-purple-500"
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') cancelLink();
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleLinkSubmit(e);
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={handleLinkSubmit}
                        className="p-1 rounded hover:bg-emerald-50 text-emerald-600 transition-colors"
                    >
                        <FiCheck className="w-3.5 h-3.5" />
                    </button>
                    <button
                        type="button"
                        onClick={cancelLink}
                        className="p-1 rounded hover:bg-red-50 text-red-500 transition-colors"
                    >
                        <FiX className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}
        </div>
    );
};
