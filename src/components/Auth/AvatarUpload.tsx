'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { FaCamera, FaTimes, FaSpinner } from 'react-icons/fa';
import { ITourist } from '@/store';
import ImageWithFallback from '../UI/ImageWithFallback/ImageWithFallback';

interface AvatarUploadProps {
    user: ITourist;
    onUpload: (file: File) => Promise<void>;
    onDelete?: () => Promise<void>;
    isUploading?: boolean;
    error?: string;
    className?: string;
}

export const AvatarUpload = ({
    user,
    onUpload,
    onDelete,
    isUploading = false,
    error,
    className = ''
}: AvatarUploadProps) => {
    const t = useTranslations();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                return;
            }

            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                return;
            }

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);

            // Upload file
            onUpload(file);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onDelete?.();
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`flex flex-col items-center space-y-6 ${className}`}>
            <div className="relative group">
                <div className="relative transition-transform duration-300 hover:scale-105">
                    {preview || user?.avatar?.file ? (
                        <ImageWithFallback
                            src={preview || (user?.avatar?.file as string)}
                            alt="Avatar preview"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            width={128}
                            height={128}
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center text-gray-400">
                            <FaCamera className="text-4xl opacity-50" />
                        </div>
                    )}

                    {isUploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <FaSpinner className="text-white text-3xl animate-spin" />
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={handleClick}
                    disabled={isUploading}
                    className="absolute bottom-1 right-1 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white"
                >
                    <FaCamera className="text-sm" />
                </button>

                {(user?.avatar?.file || preview) && !isUploading && (
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 border-2 border-white opacity-0 group-hover:opacity-100"
                    >
                        <FaTimes className="text-xs" />
                    </button>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />

            <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">
                    {t('profile.avatarUploadHint')}
                </p>
                <p className="text-xs text-gray-500">
                    {t('profile.avatarUploadFormats')}
                </p>
            </div>

            {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
            )}
        </div>
    );
};