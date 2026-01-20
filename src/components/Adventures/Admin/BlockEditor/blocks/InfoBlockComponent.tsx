'use client';

import { InfoBlock as InfoBlockType } from '@/components/Adventures/Admin/BlockEditor/types';
import { FiInfo } from 'react-icons/fi';

interface InfoBlockComponentProps {
    data: InfoBlockType['data'];
    onChange: (data: InfoBlockType['data']) => void;
    isActive?: boolean;
}

export const InfoBlockComponent = ({ data, onChange, isActive }: InfoBlockComponentProps) => {
    return (
        <div className="space-y-4">
            {/* Form Fields - Show only when active */}
            {isActive && (
                <div className="relative z-20 space-y-3 bg-white/50 p-4 rounded-xl border border-emerald-100 animate-fade-in shadow-sm">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => onChange({ ...data, title: e.target.value })}
                            placeholder="Info block title"
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                            Content
                        </label>
                        <textarea
                            value={data.content}
                            onChange={(e) => onChange({ ...data, content: e.target.value })}
                            placeholder="Info block content..."
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                        />
                    </div>
                </div>
            )}

            {/* Preview Area - Matches Site Style 1v1 */}
            <div className={`relative z-10 transition-all duration-300 ${isActive ? 'mt-4 opacity-80' : 'mt-0 opacity-100'}`}>
                {data.title || data.content ? (
                    <div className="bg-white p-8 rounded-[2rem] my-4 shadow-sm border border-slate-100">
                        {data.title && (
                            <h4 className="font-bold text-lg mb-2 text-[#1a1a1a]">
                                {data.title}
                            </h4>
                        )}
                        {data.content && (
                            <div className="text-base text-slate-700 leading-relaxed font-light">
                                {data.content}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="py-20 text-center bg-white/40 rounded-3xl border-2 border-dashed border-slate-200">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm text-slate-300 mb-3 grayscale">
                            <FiInfo className="w-7 h-7" />
                        </div>
                        <p className="text-sm text-slate-400 italic">Example info block preview</p>
                    </div>
                )}
            </div>
        </div>
    );
};
