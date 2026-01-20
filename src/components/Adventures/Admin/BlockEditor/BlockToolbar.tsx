'use client';

import { BlockType } from './types';
import { FiMaximize, FiMinimize, FiCode } from 'react-icons/fi';
import { EDITOR_BLOCKS, getColorClasses } from './constants';

interface BlockToolbarProps {
    onAddBlock: (type: BlockType) => void;
    isFullscreen: boolean;
    onToggleFullscreen: () => void;
    isSourceMode?: boolean;
    onToggleSourceMode?: () => void;
}

export const BlockToolbar = ({ onAddBlock, isFullscreen, onToggleFullscreen, isSourceMode, onToggleSourceMode }: BlockToolbarProps) => {
    return (
        <div className="flex flex-col gap-3 py-2" onMouseDown={(e) => e.preventDefault()}>
            <div className='flex flex-wrap gap-3 justify-between items-center'>
                <div className="flex flex-wrap gap-1.5">
                    {EDITOR_BLOCKS.map(({ type, icon: Icon, label, color }) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => onAddBlock(type)}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 transition-all duration-200 border text-[11px] font-medium ${getColorClasses(color)}`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{label}</span>
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onToggleSourceMode}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all font-medium text-xs whitespace-nowrap ${isSourceMode
                            ? 'bg-purple-100 text-purple-700 border-purple-200'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                            }`}
                    >
                        <FiCode className="w-4 h-4" />
                        <span>{isSourceMode ? 'Visual' : 'Source'}</span>
                    </button>
                    <button
                        type="button"
                        onClick={onToggleFullscreen}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all font-medium text-xs whitespace-nowrap"
                    >
                        {isFullscreen ? (
                            <>
                                <FiMinimize className="w-4 h-4" />
                                <span>Minimize</span>
                            </>
                        ) : (
                            <>
                                <FiMaximize className="w-4 h-4" />
                                <span>Full Screen</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

        </div>
    );
};
