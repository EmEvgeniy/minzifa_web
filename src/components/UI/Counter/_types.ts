export type CounterProps = {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    label?: string;
    className?: string;
};