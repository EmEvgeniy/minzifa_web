'use client';

import { CodeBlock as CodeBlockType } from '@/components/Adventures/Admin/BlockEditor/types';

interface CodeBlockProps {
    data: CodeBlockType['data'];
    onChange: (data: CodeBlockType['data']) => void;
    isActive?: boolean;
}

export const CodeBlock = ({ data, onChange, isActive }: CodeBlockProps) => {
    return (
        <div className="space-y-3">
            {/* Language Selector - Show only when active */}
            {isActive && (
                <div className="flex items-center gap-2 bg-white/50 p-2 rounded-lg border border-slate-100 animate-fade-in">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Language:</span>
                    <input
                        type="text"
                        value={data.language || ''}
                        onChange={(e) => onChange({ ...data, language: e.target.value })}
                        placeholder="javascript"
                        className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-900 text-[10px] font-mono focus:outline-none focus:ring-1 focus:ring-purple-500 shadow-sm"
                    />
                </div>
            )}

            {/* Code Editor */}
            <div className={`relative transition-all duration-300 ${isActive ? 'mt-0' : 'opacity-90'}`}>
                <div className="absolute top-3 right-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    {data.language || 'text'}
                </div>
                <textarea
                    value={data.code}
                    onChange={(e) => onChange({ ...data, code: e.target.value })}
                    placeholder="Enter code..."
                    rows={isActive ? 12 : Math.max(3, data.code.split('\n').length)}
                    readOnly={!isActive}
                    className={`w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-900 text-emerald-400 font-mono text-sm leading-relaxed outline-none transition-all ${isActive ? 'ring-2 ring-purple-500/30' : 'cursor-default'}`}
                />
            </div>
        </div>
    );
};
