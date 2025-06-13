import { ReactNode } from "react";

export interface CustomAccordionProps {
    children: ReactNode;
    defaultExpandedIndex?: number;
    expandedIndexes?: number[];
    onExpandedIndexesChange?: (indexes: number[]) => void;
    className?: string;
}

export interface CustomAccordionSummaryProps {
    children: ReactNode;
    expandIcon?: ReactNode;
    'aria-controls'?: string;
    id?: string;
    className?: string;
}

export interface CustomAccordionDetailsProps {
    children: ReactNode;
    className?: string;
}

export interface CustomAccordionContextType {
    expanded: boolean;
    toggleExpanded: () => void;
}