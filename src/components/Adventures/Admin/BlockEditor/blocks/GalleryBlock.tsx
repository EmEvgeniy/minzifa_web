'use client';

import { useState } from 'react';
import { GalleryBlock as GalleryBlockType } from '@/components/Adventures/Admin/BlockEditor/types';
import { FiPlus, FiX, FiCamera, FiUpload, FiLoader } from 'react-icons/fi';
import { useRef } from 'react';
import { useMediaUpload } from '@/api/adventures/media';
import { MediaUploadResponse } from '@/types/adventures';

const baseUrl = process.env.NEXT_PUBLIC_ARTICLES_API_URL || 'https://articles.minzifatravel.com';

interface GalleryBlockProps {
    data: GalleryBlockType['data'];
    onChange: (data: GalleryBlockType['data']) => void;
    isActive?: boolean;
}

export const GalleryBlock = ({ data, onChange, isActive }: GalleryBlockProps) => {
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
                <div className="relative z-20 space-y-4 bg-white/50 p-4 rounded-xl border border-indigo-100 animate-fade-in shadow-sm">
                    {/* Caption */}
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                            Caption
                        </label>
                        <input
                            type="text"
                            value={data.caption || ''}
                            onChange={(e) => onChange({ ...data, caption: e.target.value })}
                            placeholder="Gallery caption"
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
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
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {data.images.map((img, i) => (
                                <div key={i} className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-slate-100 shadow-sm transition-transform hover:scale-[1.02] cursor-zoom-in">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        {data.caption && (
                            <p className="text-sm text-slate-500 text-center italic font-light tracking-wide">
                                — {data.caption}
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="py-20 text-center bg-white/30 rounded-2xl border-2 border-dashed border-slate-200 transition-all">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm text-indigo-300 mb-3 grayscale">
                            <FiCamera className="w-7 h-7" />
                        </div>
                        <p className="text-sm text-slate-400 italic">No images in gallery</p>
                    </div>
                )}
            </div>
        </div>
    );
};
