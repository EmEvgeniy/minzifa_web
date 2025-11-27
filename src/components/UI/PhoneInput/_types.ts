import { FieldError } from 'react-hook-form';
import { PhoneInputProps } from 'react-phone-input-2';

export interface PhoneInputCompProp extends PhoneInputProps {
  label?: string;
  error?: FieldError;
  helperText?: string;
  fullWidth?: boolean;
  wrapperClassName?: string;
}
