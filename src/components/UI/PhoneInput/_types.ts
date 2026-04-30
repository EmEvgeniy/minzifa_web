import { PhoneInputProps } from 'react-phone-input-2';

export interface PhoneInputCompProp extends PhoneInputProps {
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  wrapperClassName?: string;
}
