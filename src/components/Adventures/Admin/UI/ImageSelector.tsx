'use client';

import { useState, useRef, useCallback } from 'react';
import { FiUpload, FiLink, FiX, FiCheckCircle, FiImage } from 'react-icons/fi';
import { useMediaUpload } from '@/api/adventures/media';
import { toast } from 'react-toastify';

interface ImageSelectorProps {
    value?: string;
    onChange: (value: string) => void;
    label?: string;
    description?: string;
}

export const ImageSelector = ({ value, onChange, label = "Image", description }: ImageSelectorProps) => {
    const [mode, setMode] = useState<'upload' | 'url'>(value && value.startsWith('http') && !value.includes('blob:') ? 'url' : 'upload');
    const [urlInput, setUrlInput] = useState(value && !value.includes('blob:') ? value : '');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const mediaUpload = useMediaUpload();

    const handleUpload = useCallback(async (files: File[]) => {
        if (files.length === 0) return;

        try {
            const response = await mediaUpload.mutateAsync(files);
            // API returns { success: true, file: { url: "/uploads/..." } } or { data: [...] }
            let uploadedUrl = '';

            if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                // Old format: { data: [{ url: "..." }] }
                uploadedUrl = response.data[0].url;
            } else if ((response as any).file?.url) {
                // New format: { file: { url: "/uploads/..." } }
                const relativeUrl = (response as any).file.url;
                // Build full URL from relative path
                const baseUrl = process.env.NEXT_PUBLIC_ARTICLES_API_URL || 'https://articles.minzifatravel.com';
                uploadedUrl = relativeUrl.startsWith('http') ? relativeUrl : `${baseUrl}${relativeUrl}`;
            }

            if (uploadedUrl) {
                onChange(uploadedUrl);
                setUrlInput(uploadedUrl);
                toast.success('Image uploaded successfully!');
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error: any) {
            console.error('Upload error:', error);
            const msg = error?.response?.data?.message || 'Failed to upload image';
            toast.error(msg);
        }
    }, [mediaUpload, onChange]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        handleUpload(files);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            setMode('upload');
            handleUpload(files);
        }
    };

    const handleUrlSubmit = () => {
        if (urlInput.trim()) {
            onChange(urlInput.trim());
            toast.success('URL updated!');
        }
    };

    const clearImage = () => {
        onChange('');
        setUrlInput('');
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
                        {label}
                    </label>
                    {description && (
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 ml-1">{description}</p>
                    )}
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    <button
                        type="button"
                        onClick={() => setMode('upload')}
                        className={`p-1.5 rounded-md transition-all ${mode === 'upload' ? 'bg-white dark:bg-slate-700 shadow-sm text-[#3ca542]' : 'text-slate-400 hover:text-slate-600'}`}
                        title="Upload from computer"
                    >
                        <FiUpload className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('url')}
                        className={`p-1.5 rounded-md transition-all ${mode === 'url' ? 'bg-white dark:bg-slate-700 shadow-sm text-[#3ca542]' : 'text-slate-400 hover:text-slate-600'}`}
                        title="Add from URL"
                    >
                        <FiLink className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div
                className={`relative group overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed aspect-video flex items-center justify-center transition-all ${isDragging
                    ? 'border-[#3ca542] bg-[#3ca542]/5 scale-[0.99]'
                    : 'border-slate-200 dark:border-slate-700 hover:border-[#3ca542]/50'
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {value ? (
                    <div className="relative w-full h-full">
                        <img
                            src={value}
                            alt="Preview"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=Invalid+Image+URL';
                            }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => mode === 'upload' ? fileInputRef.current?.click() : setMode('url')}
                                className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/40 transition-all font-bold text-sm"
                            >
                                Change
                            </button>
                            <button
                                type="button"
                                onClick={clearImage}
                                className="p-3 bg-red-500/20 backdrop-blur-md rounded-xl text-red-200 hover:bg-red-500/40 transition-all"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-6 space-y-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto transition-colors ${isDragging ? 'bg-[#3ca542] text-white' : 'bg-slate-100 dark:bg-slate-700/50 text-slate-400'
                            }`}>
                            <FiImage className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                                {isDragging ? 'Drop to upload!' : 'No image selected'}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                                {isDragging ? 'Release the file now' : 'Select upload or enter URL'}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => mode === 'upload' ? fileInputRef.current?.click() : setMode('url')}
                            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all"
                        >
                            {mode === 'upload' ? 'Choose File' : 'Enter URL'}
                        </button>
                    </div>
                )}

                {mediaUpload.isPending && (
                    <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-10 transition-all">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-10 h-10 border-4 border-[#3ca542]/20 border-t-[#3ca542] rounded-full animate-spin" />
                            <span className="text-xs font-bold text-[#3ca542] uppercase tracking-widest">Uploading...</span>
                        </div>
                    </div>
                )}
            </div>

            {mode === 'url' && (
                <div className="flex gap-2">
                    <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3ca542]/40 text-sm transition-all"
                    />
                    <button
                        type="button"
                        onClick={handleUrlSubmit}
                        className="px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-xl hover:bg-slate-800 dark:hover:bg-slate-600 transition-all"
                    >
                        <FiCheckCircle className="w-5 h-5" />
                    </button>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};
