'use client';

import { useRef, useState } from 'react';
import { SliderBlock as SliderBlockType } from '@/components/Adventures/Admin/BlockEditor/types';
import { FiPlus, FiX, FiGrid, FiLoader, FiUpload } from 'react-icons/fi';
import { useMediaUpload } from '@/api/adventures/media';
import { MediaUploadResponse } from '@/types/adventures';

interface SliderBlockProps {
    data: SliderBlockType['data'];
    onChange: (data: SliderBlockType['data']) => void;
    isActive?: boolean;
}

const baseUrl = process.env.NEXT_PUBLIC_ARTICLES_API_URL || 'https://articles.minzifatravel.com';

export const SliderBlock = ({ data, onChange, isActive }: SliderBlockProps) => {
    const [newImage, setNewImage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadMutation = useMediaUpload();

    const addImage = () => {
        if (newImage.trim()) {
            onChange({ ...data, images: [...data.images, newImage] });
            setNewImage('');
        }
    };

    const removeImage = (index: number) => {
        onChange({ ...data, images: data.images.filter((_, i) => i !== index) });
    };

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
                        images: [...data.images, uploadedUrl]
                    });
                }
            }
        });
    };

    return (
        <div className="space-y-4">
            {/* Form Fields - Show only when active */}
            {isActive && (
                <div className="relative z-20 space-y-4 bg-white/50 p-4 rounded-xl border border-pink-100 animate-fade-in shadow-sm">
                    {/* Caption */}
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                            Caption
                        </label>
                        <input
                            type="text"
                            value={data.caption || ''}
                            onChange={(e) => onChange({ ...data, caption: e.target.value })}
                            placeholder="Slider caption"
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
                        />
                    </div>

                    {/* Add Image */}
                    <div className="flex gap-2">
                        <div className="flex-1 flex gap-2">
                            <input
                                type="text"
                                value={newImage}
                                onChange={(e) => setNewImage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addImage()}
                                placeholder="Add image URL..."
                                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={addImage}
                                className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                            >
                                <FiPlus className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                                multiple
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploadMutation.isPending}
                                className="p-3 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm font-medium"
                            >
                                {uploadMutation.isPending ? (
                                    <FiLoader className="w-4 h-4 animate-spin" />
                                ) : (
                                    <FiUpload className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Image List */}
                    {data.images.length > 0 && (
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-2 pt-2">
                            {data.images.map((img, index) => (
                                <div key={index} className="relative group/img aspect-square rounded-lg overflow-hidden border border-slate-200 bg-white">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                    >
                                        <FiX className="w-2 h-2" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Preview Area */}
            <div className={`relative z-10 transition-all duration-300 ${isActive ? 'mt-4 opacity-80 scale-[0.99]' : 'mt-0 opacity-100 scale-100'}`}>
                {data.images.length > 0 ? (
                    <div className="group relative">
                        <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-100 shadow-lg border border-slate-200">
                            {/* Simple Stacked Images Effect */}
                            <div className="absolute inset-0 flex">
                                {data.images.slice(0, 1).map((img, i) => (
                                    <img key={i} src={img} alt="" className="w-full h-full object-cover" />
                                ))}
                            </div>

                            {/* Overlay Indicators */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                {data.images.slice(0, 5).map((_, i) => (
                                    <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === 0 ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} />
                                ))}
                                {data.images.length > 5 && <div className="text-[8px] text-white/60 font-bold ml-1">+{data.images.length - 5}</div>}
                            </div>

                            {/* Navigation Arrows (Visual Placeholder) */}
                            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </div>
                            </div>
                        </div>
                        {data.caption && (
                            <p className="text-sm text-slate-500 mt-4 text-center italic font-light tracking-wide">
                                — {data.caption}
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="py-20 text-center bg-white/30 rounded-2xl border-2 border-dashed border-slate-200 transition-all">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm text-pink-300 mb-3 grayscale">
                            <FiGrid className="w-7 h-7" />
                        </div>
                        <p className="text-sm text-slate-400 italic">No images in slider</p>
                    </div>
                )}
            </div>
        </div>
    );
};
