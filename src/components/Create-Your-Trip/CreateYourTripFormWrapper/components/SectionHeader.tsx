import { memo } from 'react';

interface SectionHeaderProps {
    icon: React.ElementType;
    title: string;
}

export const SectionHeader = memo(({ icon: Icon, title }: SectionHeaderProps) => (
    <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-[#27A430] to-[#1f8a26] rounded-xl flex items-center justify-center shadow-md">
            <Icon className="text-white" size={18} />
        </div>
        <h3 className="text-xl font-bold text-[#16372D]">{title}</h3>
    </div>
));

SectionHeader.displayName = 'SectionHeader';
