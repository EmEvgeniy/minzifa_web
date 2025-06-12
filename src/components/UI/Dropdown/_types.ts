import { ReactNode } from "react";

export interface DropdownContextType {
    isOpen: boolean;
    toggle: (value?: boolean) => void;
}

export interface DropdownSummaryProps {
    className?: string;
    children: ReactNode | ((context: DropdownContextType) => ReactNode);
}

export interface DropdownDetailsProps {
    className?: string;
    children: ReactNode | ((context: DropdownContextType) => ReactNode);
}
