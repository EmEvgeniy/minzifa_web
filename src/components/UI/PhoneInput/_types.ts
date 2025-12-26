import { PhoneInputProps } from 'react-phone-input-2';

export interface PhoneInputCompProp extends PhoneInputProps {
  label?: string;
  error?: { message?: string };
  helperText?: string;
  fullWidth?: boolean;
  wrapperClassName?: string;
}
