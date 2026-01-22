'use client';

import { useMediaUpload } from '@/api/adventures/media';
import { ImageBlock as ImageBlockType } from '@/components/Adventures/Admin/BlockEditor/types';
import { MediaUploadResponse } from '@/types/adventures';
import { useRef } from 'react';
import { FiLoader, FiUpload } from 'react-icons/fi';

const baseUrl = process.env.NEXT_PUBLIC_ARTICLES_API_URL || 'https://articles.minzifatravel.com';

interface ImageBlockProps {
    data: ImageBlockType['data'];
    onChange: (data: ImageBlockType['data']) => void;
    isActive?: boolean;
}

export const ImageBlock = ({ data, onChange, isActive }: ImageBlockProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadMutation = useMediaUpload();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        uploadMutation.mutate(Array.from(files), {
            onSuccess: (response: MediaUploadResponse) => {
                if (response.success) {
                    const relativeUrl = response.file?.url;
                    if (!relativeUrl) return;
                    const uploadedUrl = relativeUrl.startsWith('http') ? relativeUrl : `${baseUrl}${relativeUrl}`;
                    onChange({
                        ...data,
                        src: uploadedUrl,
                        alt: data.alt || ''
                    });
                }
            }
        });
    };

    return (
        <div className="space-y-4">
            {/* Form Fields - Show only when active */}
            {isActive && (
                <div className="relative z-20 space-y-3 bg-white/50 p-4 rounded-xl border border-purple-100 animate-fade-in shadow-sm">
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                                Image URL
                            </label>
                            <input
                                type="text"
                                value={data.src}
                                onChange={(e) => onChange({ ...data, src: e.target.value })}
                                placeholder="/images/example.jpg"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div className="flex items-end">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploadMutation.isPending}
                                className="p-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-purple-600 hover:border-purple-200 transition-colors disabled:opacity-50"
                                title="Upload image"
                            >
                                {uploadMutation.isPending ? (
                                    <FiLoader className="w-5 h-5 animate-spin" />
                                ) : (
                                    <FiUpload className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                                Alt Text
                            </label>
                            <input
                                type="text"
                                value={data.alt}
                                onChange={(e) => onChange({ ...data, alt: e.target.value })}
                                placeholder="Image description"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                                Caption
                            </label>
                            <input
                                type="text"
                                value={data.caption || ''}
                                onChange={(e) => onChange({ ...data, caption: e.target.value })}
                                placeholder="Image caption"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Area */}
            <div className={`relative z-10 transition-all duration-300 ${isActive ? 'mt-4 opacity-80 scale-[0.99]' : 'mt-0 opacity-100 scale-100'}`}>
                {data.src ? (
                    <div className="group relative">
                        <div className="relative w-full aspect-video md:aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 shadow-md">
                            <img
                                src={data.src}
                                alt={data.alt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                        {data.caption && (
                            <p className="text-sm text-slate-500 mt-4 text-center italic font-light tracking-wide">
                                — {data.caption}
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="py-20 text-center bg-white/30 rounded-2xl border-2 border-dashed border-slate-200">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm text-slate-300 mb-3">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-sm text-slate-400 italic">No image URL provided</p>
                    </div>
                )}
            </div>
        </div>
    );
};
