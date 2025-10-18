import { FieldError } from 'react-hook-form';

export interface DropdownFieldProps<T extends Record<string, unknown>> {
  label?: string;
  error?: FieldError;
  helperText?: string;
  placeholder?: string;
  options?: T[];
  value?: string | number;
  onChange?: (value: string | number | undefined) => void;
  labelKey?: keyof T & string;
  valueKey?: keyof T & string;
  getLabel?: (opt: T) => string;
  getValue?: (opt: T) => string | number;
  fullWidth?: boolean;
  renderSummary?: (selectedLabel: string | React.ReactNode, isOpen: boolean) => React.ReactNode;
}
