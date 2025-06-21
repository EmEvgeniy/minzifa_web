import { ReactNode } from "react";

export interface DropdownOption {
    label: string;
    value: string | number;
}

export interface DropdownProps {
    children?: ReactNode;
    className?: string;
    value?: string | number;
    onChange?: (value: string | number) => void;
    options?: DropdownOption[];
    placeholder?: string;
}

export interface DropdownContextType {
    isOpen: boolean;
    toggle: (value?: boolean) => void;
    value?: string | number;
    onChange?: (value: string | number) => void;
}

export interface DropdownSummaryProps {
    className?: string;
    children: ReactNode | ((context: DropdownContextType) => ReactNode);
}

export interface DropdownDetailsProps {
    className?: string;
    children: ReactNode | ((context: DropdownContextType) => ReactNode);
}
