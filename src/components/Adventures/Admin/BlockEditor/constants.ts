import {
  FiType,
  FiAlignLeft,
  FiImage,
  FiMessageSquare,
  FiInfo,
  FiGrid,
  FiCamera,
  FiMap,
  FiList,
  FiCode,
  FiMinus,
} from 'react-icons/fi';
import { BlockType } from './types';

export const EDITOR_BLOCKS = [
  { type: 'heading' as BlockType, icon: FiType, label: 'Heading', color: 'purple' },
  { type: 'paragraph' as BlockType, icon: FiAlignLeft, label: 'Text', color: 'slate' },
  { type: 'image' as BlockType, icon: FiImage, label: 'Image', color: 'blue' },
  { type: 'quote' as BlockType, icon: FiMessageSquare, label: 'Quote', color: 'emerald' },
  { type: 'info' as BlockType, icon: FiInfo, label: 'Info', color: 'amber' },
  { type: 'slider' as BlockType, icon: FiGrid, label: 'Slider', color: 'pink' },
  { type: 'gallery' as BlockType, icon: FiCamera, label: 'Gallery', color: 'indigo' },
  { type: 'tours' as BlockType, icon: FiMap, label: 'Tours', color: 'teal' },
  { type: 'list' as BlockType, icon: FiList, label: 'List', color: 'orange' },
  { type: 'code' as BlockType, icon: FiCode, label: 'Code', color: 'rose' },
  { type: 'separator' as BlockType, icon: FiMinus, label: 'Line', color: 'slate' },
];

export const getColorClasses = (color: string) => {
  const colors: Record<string, string> = {
    purple: 'hover:bg-purple-50 hover:text-purple-600 border-transparent hover:border-purple-200',
    slate: 'hover:bg-slate-50 hover:text-slate-600 border-transparent hover:border-slate-200',
    blue: 'hover:bg-blue-50 hover:text-blue-600 border-transparent hover:border-blue-200',
    emerald:
      'hover:bg-emerald-50 hover:text-emerald-600 border-transparent hover:border-emerald-200',
    amber: 'hover:bg-amber-50 hover:text-amber-600 border-transparent hover:border-amber-200',
    pink: 'hover:bg-pink-50 hover:text-pink-600 border-transparent hover:border-pink-200',
    indigo: 'hover:bg-indigo-50 hover:text-indigo-600 border-transparent hover:border-indigo-200',
    teal: 'hover:bg-teal-50 hover:text-teal-600 border-transparent hover:border-teal-200',
    orange: 'hover:bg-orange-50 hover:text-orange-600 border-transparent hover:border-orange-200',
    rose: 'hover:bg-rose-50 hover:text-rose-600 border-transparent hover:border-rose-200',
    cyan: 'hover:bg-cyan-50 hover:text-cyan-600 border-transparent hover:border-cyan-200',
    red: 'hover:bg-red-50 hover:text-red-600 border-transparent hover:border-red-200',
  };
  return colors[color] || colors.slate;
};
